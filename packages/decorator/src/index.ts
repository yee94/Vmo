import { constructDecorator, CLASS, FIELD } from "./utils";
import get from "lodash/get";

const META_FIELD = Symbol("VMO_META_FIELD");

export const Vmo = constructDecorator(
  ({ targetType, target, ctor, propName, args }) => {
    if (targetType === CLASS) {
      return new Proxy(target, {
        construct(target, argArray, newTarget) {
          const instance = Reflect.construct(target, argArray, newTarget);
          const metaFields: any = Array.from(ctor[META_FIELD]?.entries() || []);
          const data = argArray[0] || {};
          metaFields.map(([propName, inputName]) => {
            if (typeof inputName === "function") {
              try {
                instance[propName] = inputName.call(instance, data, {
                  instance: instance,
                  target,
                  ctor,
                });
              } catch (e) {
                console.error(e);
              }
            } else if (typeof inputName === "string") {
              instance[propName] = get(data, inputName);
            }
          });
          instance.load?.();

          return instance;
        },
      });
    }

    if (targetType === FIELD) {
      if (!ctor[META_FIELD]) {
        ctor[META_FIELD] = new Map();
      }

      const [fieldName = propName] = args;

      ctor[META_FIELD].set(propName, fieldName);
    }

    return target;
  }
);
