/**
 * Created by yee.wang on 2019-02-28
 **/
import { IAxiosDriver } from "../Driver/AxiosDriver";
import { Vmo } from "@vmojs/core";
export declare abstract class AxiosVmo extends Vmo {
    protected static driver: IAxiosDriver;
    protected static requestUrl: string;
    /**
     * 获取模型集合
     * @param options
     */
    static list(...options: any): Promise<AxiosVmo[]>;
    /**
     * 获取模型
     * @param options
     */
    static get(...options: any): Promise<AxiosVmo>;
    /**
     * 保存模型数据
     * @param data
     * @param options
     */
    static set(data: any, ...options: any): Promise<any>;
}
