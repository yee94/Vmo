import {
  IDecoratorContext,
  IDescriptor,
  IParamIndex,
  IPropName,
  ITarget,
  ITargetType,
} from './interface'
import { isFunction } from './utils'

export const METHOD = 'method'
export const CLASS = 'class'
export const FIELD = 'field'
export const PARAM = 'param'
export const TARGET_TYPES = { METHOD, CLASS, FIELD, PARAM }

type IResolver = {
  (
    target: ITarget,
    propName: IPropName,
    descriptor: IDescriptor | IParamIndex | void,
  ): IDecoratorContext | null
}

export const getDecoratorContext: IResolver = (...args) =>
  getParamDecoratorContext(...args) ||
  getMethodDecoratorContext(...args) ||
  getFieldDecoratorContext(...args) ||
  getClassDecoratorContext(...args)

export const getClassDecoratorContext: IResolver = (target) =>
  isFunction(target)
    ? {
        targetType: CLASS,
        target,
        ctor: target,
        proto: target.prototype,
      }
    : null

export const getMethodDecoratorContext: IResolver = (
  target,
  propName,
  descriptor,
) =>
  propName && typeof descriptor === 'object' && isFunction(descriptor.value)
    ? {
        targetType: METHOD,
        target: descriptor.value,
        ctor: target.constructor,
        proto: target,
        propName,
        descriptor,
      }
    : null

export const getParamDecoratorContext: IResolver = (
  target,
  propName,
  descriptor,
) =>
  typeof descriptor === 'number'
    ? {
        targetType: PARAM,
        target: target[propName],
        ctor: target.constructor,
        proto: target,
        propName,
        paramIndex: descriptor,
      }
    : null

export const getFieldDecoratorContext: IResolver = (
  target,
  propName,
  descriptor,
) =>
  propName
    ? {
        targetType: FIELD,
        ctor: target.constructor,
        proto: target,
        propName,
        target: descriptor
          ? // @ts-ignore
            descriptor.initializer
          : target,
      }
    : null

/**
 * Detects decorated target type.
 * @param {*} target
 * @param {string} [propName]
 * @param {Object} [descriptor]
 * @returns {*}
 */
export const getTargetType = (
  target: ITarget,
  propName: IPropName,
  descriptor: IDescriptor | IParamIndex | void,
): ITargetType | null =>
  getDecoratorContext(target, propName, descriptor)?.targetType || null
