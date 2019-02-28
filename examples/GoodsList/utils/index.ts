/**
 * Created by yee.wang on 2019-02-28
 **/
import Vmo from "../../../src/Core/Vmo";

export function wait(time = 0) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}

export function mapValue(arr: any, instance: any) {
  if (arr instanceof Array) {
    return arr.map(data => new instance(data));
  }
  return null;
}

export function Field(target, name) {
  const descr: any = {
    enumerable: true,
    configurable: true,
    writable: true
  };

  return descr;
}
