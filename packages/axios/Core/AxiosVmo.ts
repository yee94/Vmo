/**
 * Created by yee.wang on 2019-02-28
 **/
import AxiosDriver, { IAxiosDriver } from "../Driver/AxiosDriver";
import { Vmo } from "@vmojs/base";

export abstract class AxiosVmo extends Vmo {
  protected static driver: IAxiosDriver = AxiosDriver;
  protected static requestUrl: string;

  /**
   * 获取模型集合
   * @param options
   */
  public static async list(...options: any): Promise<AxiosVmo[]> {
    return null;
  }

  /**
   * 获取模型
   * @param options
   */
  public static async get(...options: any): Promise<AxiosVmo> {
    return null;
  }

  /**
   * 保存模型数据
   * @param data
   * @param options
   */
  public static async set(data: any, ...options: any): Promise<any> {}
}
