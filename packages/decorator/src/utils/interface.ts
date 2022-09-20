export declare type IFunction<A extends any[] = any[], R = any> = (
  ...args: A
) => R;
export declare type IFn<A extends any[] = any[], R = any> = IFunction<A, R>;
export declare type ICallable<A extends any[] = any[], R = any> = IFunction<
  A,
  R
>;
export declare type IUnaryFunction<A = any, R = any> = (a: A) => R;
export declare type IUnaryFn<A = any, R = any> = IUnaryFunction<A, R>;

export interface IMetadataProvider {
  defineMetadata(
    metadataKey: any,
    metadataValue: any,
    target: any,
    propertyKey?: string | symbol
  ): void;
  hasMetadata(
    metadataKey: any,
    target: any,
    propertyKey?: string | symbol
  ): boolean;
  getMetadata(
    metadataKey: any,
    target: any,
    propertyKey?: string | symbol
  ): any;
  getOwnMetadata(
    metadataKey: any,
    target: any,
    propertyKey?: string | symbol
  ): any;
}


export interface IDecorator {
  (...args: Array<any>): any
}

export type IParamIndex = number
export type IPropName = string
export type IPropValue = any
export type ITarget = any
export type ITargetType = string
export type ITargetTypes = ITargetType | Array<ITargetType>
export type IAnyType = any
export interface IReducible {
  hasOwnProperty(name: string): boolean
  [key: string]: IAnyType
}

export type IDescriptor = PropertyDescriptor

export interface IProto {
  [key: string]: IAnyType
}

export type IInstance = {
  constructor: IInstance
  prototype?: IProto
}

export type IDecoratorArgs = any[]

export type IDecoratorContext = {
  targetType: ITargetType
  target: ITarget
  proto: IProto
  ctor: ICallable
  propName?: IPropName
  paramIndex?: IParamIndex
  descriptor?: IDescriptor
}

export type IDecoratorHandlerContext = IDecoratorContext & {
  args: IDecoratorArgs
}

export type IHandler = (context: IDecoratorHandlerContext) => ITarget

export type IMapIterator = {
  (value: IAnyType, key: any, obj: IAnyType): IAnyType
}
export type IReduceIterator = {
  (result: IAnyType, value: IAnyType, key: string, obj: IAnyType): IAnyType
}
