/**
 * Created by yee.wang on 2019-02-28
 **/

export function wait(time = 0) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}
