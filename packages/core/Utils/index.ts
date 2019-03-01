/**
 * Created by yee.wang on 2019-03-01
 **/

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
