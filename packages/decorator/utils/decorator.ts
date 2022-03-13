import {
  ICallable,
  IDecorator,
  IDecoratorArgs,
  IDecoratorHandlerContext,
  IDescriptor,
  IHandler,
  IParamIndex,
  IPropName,
  ITarget,
  ITargetType,
  ITargetTypes,
} from './interface'
import { CLASS, FIELD, getDecoratorContext, METHOD, PARAM } from './resolver'
import {
  getPrototypeMethods,
  isFunction,
  isUndefined,
  mapValues,
} from './utils'

/**
 * Constructs decorator by given function.
 * Holywar goes here: https://github.com/wycats/javascript-decorators/issues/23
 * @param {IHandler} handler
 * @param {ITargetTypes} [allowedTypes]
 * @returns {function(...[any])}
 */
export const constructDecorator = (
  handler: IHandler,
  allowedTypes?: ITargetTypes,
): IDecorator => {
  if (!isFunction(handler)) {
    throw new Error('Decorator handler must be a function')
  }

  return (...args: IDecoratorArgs): ICallable => (
    target: ITarget,
    propName: IPropName,
    descriptor: IDescriptor | IParamIndex,
  ): any => {
    const decoratorContext = getDecoratorContext(target, propName, descriptor)
    if (!decoratorContext) {
      return
    }

    const { targetType } = decoratorContext
    assertTargetType(targetType, allowedTypes)

    const handlerContext = { ...decoratorContext, args }
    const _handler = getSafeHandler(handler)

    return decorate(_handler, handlerContext, descriptor)
  }
}

type IDecoratorApplier = (
  handler: IHandler,
  context: IDecoratorHandlerContext,
  descriptor?: IDescriptor | IParamIndex,
) => any

const decorateParam: IDecoratorApplier = (handler, context) => handler(context)

const decorateField: IDecoratorApplier = (handler, context, descriptor) => {
  if (!descriptor) {
    handler(context)
  } else {
    // prettier-ignore
    // @ts-ignore
    descriptor.initializer = handler({ ...context, target: descriptor.initializer })
  }
}

const decorateMethod: IDecoratorApplier = (handler, context, descriptor) => {
  if (typeof descriptor === 'object') {
    descriptor.value = handler(context)
  }
}

const decorateClass: IDecoratorApplier = (handler, context) => {
  const { proto, target } = context

  Object.defineProperties(
    proto,
    mapValues(getPrototypeMethods(target), (desc: IDescriptor) => {
      desc.value = handler({
        ...context,
        descriptor: desc,
        targetType: METHOD,
        target: desc.value,
      })
      return desc
    }),
  )

  return handler(context)
}

const decorate: IDecoratorApplier = (handler, context, descriptor) => {
  const { targetType } = context

  switch (targetType) {
    case PARAM:
      decorateParam(handler, context)
      break

    case FIELD:
      decorateField(handler, context, descriptor)
      break

    case METHOD:
      decorateMethod(handler, context, descriptor)
      break

    case CLASS:
      return decorateClass(handler, context)
  }
}

export const assertTargetType = (
  targetType: ITargetType,
  allowedTypes?: ITargetTypes,
): void => {
  if (allowedTypes?.length) {
    // @ts-ignore
    const allowed: string[] = [].concat(allowedTypes) // eslint-disable-line

    if (!allowed.includes(targetType)) {
      throw new Error(
        `Decorator is compatible with ${allowed
          .map((v: ITargetType) => `'${v}'`) // eslint-disable-line sonarjs/no-nested-template-literals
          .join(', ')} only, but was applied to '${targetType}'`,
      )
    }
  }
}

const getSafeHandler = (handler: IHandler): IHandler => (context) => {
  const { targetType, target } = context
  const _target = handler(context)

  if (isUndefined(_target)) {
    return target
  }

  if ((targetType === CLASS || targetType === METHOD) && !isFunction(_target)) {
    return target
  }

  return _target
}

export const createDecorator = constructDecorator
