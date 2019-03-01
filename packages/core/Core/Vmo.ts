/**
 * Created by yee.wang on 2019-02-28
 **/

import { IDriver } from "../Interface/IDriver";

export abstract class Vmo {
  /**
   * 数据存储驱动器
   */
  protected static driver: IDriver;

  /**
   * 用于转换数据到Model
   * @param data
   */
  protected load(data: any): this {
    Object.keys(data).forEach(key => {
      if (this["__proto__"].hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });

    return this;
  }

  constructor(data?: any) {
    if (data !== undefined) {
      this.load(data);
    }
  }

  public toJs(): any {
    const keys = Object.keys(this);
    const object: any = {};
    keys.forEach(key => {
      if (!/^(function|undefined)$/.test(typeof this[key])) {
        object[key] = this[key];
      }
    });
    return object;
  }
}
