/**
 * Created by yee.wang on 2019-02-28
 **/
import { IDriver } from "../Interface/IDriver";
export declare abstract class Vmo {
    /**
     * 数据存储驱动器
     */
    protected static driver: IDriver;
    /**
     * 用于转换数据到Model
     * @param data
     */
    protected load(data: any): this;
    constructor(data?: any);
    toJs(): any;
}
