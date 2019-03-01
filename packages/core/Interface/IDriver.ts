/**
 * Created by yee.wang on 2019-02-28
 **/

export interface IDriver {
  get: (...query: any) => any;
  set: (...query: any) => any;
}
