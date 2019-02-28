/**
 * Created by yee.wang on 2019-02-28
 **/

import { IDriver } from "../Interface/IDriver";

export default abstract class Vmo {
  protected static driver: IDriver;
  protected static requestUrl: string;

  /**
   * 用于转换数据到Model
   * @param data
   */
  protected abstract builder(data: any): this;
  protected adaptor = this.builder;

  constructor() {}

  /**
   * 获取模型集合
   * @param options
   */
  public static async list(...options: any): Promise<any> {}

  /**
   * 获取模型
   * @param options
   */
  public static async get(...options: any): Promise<any> {}

  /**
   * 保存模型数据
   * @param data
   * @param options
   */
  public static async set(data: any, ...options: any): Promise<any> {}
}
