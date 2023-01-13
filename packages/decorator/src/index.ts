import { constructDecorator, CLASS, FIELD } from "./utils";
import get from "lodash/get";

const META_FIELD = Symbol("VMO_META_FIELD");

export const Vmo = constructDecorator(
  ({ targetType, target, ctor, propName, args }) => {
    if (targetType === CLASS) {
      return class Vmo extends target {
        constructor(...args) {
          super(...args);
          const data = args[0] || {};
          const metaFields: any = Array.from(ctor[META_FIELD]?.entries() || []);
          metaFields.map(([propName, inputName]) => {
            if (typeof inputName === "function") {
              try {
                this[propName] = inputName.call(this, data, {
                  instance: this,
                  target,
                  ctor,
                });
              } catch (e) {
                console.error(e);
              }
            } else if (typeof inputName === "string") {
              this[propName] = get(data, inputName);
            }
          });
          this.load?.();
        }
      };
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
