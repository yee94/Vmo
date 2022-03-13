import get from "lodash/get";
import isFunction from "lodash/isfunction";
import isUndefined from "lodash/isundefined";
import mapValues from "lodash/mapvalues";
import reduce from "lodash/reduce";
import set from "lodash/set";

import { IDescriptor, IInstance, IProto, IReducible } from "./interface";

export { get, set, mapValues, isUndefined, isFunction };

/**
 * Extracts prototype methods of instance.
 * @param {*} instance
 * @returns {Object}
 */
export function getPrototypeMethods(
  instance: IInstance
): PropertyDescriptorMap {
  // WORKAROUND: empty object fallback
  const proto: IProto =
    instance.prototype || instance.constructor.prototype || {};
  const propNames: IReducible = Object.getOwnPropertyNames(proto);
  const memo: PropertyDescriptorMap = {};

  return reduce(
    propNames,
    (memo: { [key: string]: any }, name: string) => {
      const desc: IDescriptor | void = Object.getOwnPropertyDescriptor(
        proto,
        name
      );

      if (
        desc &&
        isFunction(desc.value) &&
        desc.value !== instance.constructor &&
        desc.value !== instance
      ) {
        memo[name] = desc;
      }
      return memo;
    },
    memo
  );
}
