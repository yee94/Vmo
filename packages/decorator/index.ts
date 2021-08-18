import { constructDecorator, CLASS, FIELD } from "@qiwi/decorator-utils";

const META_FIELD = Symbol("VMO_META_FIELD");

export const Vmo = constructDecorator(
  ({ targetType, target, ctor, propName, args }) => {
    if (targetType === CLASS) {
      const metaFields: string[] = Array.from(
        ctor[META_FIELD]?.entries() || []
      );

      return class extends target {
        constructor(...args) {
          super(...args);
          const [data = {}] = args;

          metaFields.map(([inputName, propName]) => {
            if (inputName in data) {
              this[propName] = data[inputName];
            }
          });
        }
      };
    }
    if (targetType === FIELD) {
      if (!ctor[META_FIELD]) {
        ctor[META_FIELD] = new Map();
      }

      const [fieldName = propName] = args;

      ctor[META_FIELD].set(fieldName, propName);
    }

    return target;
  }
);