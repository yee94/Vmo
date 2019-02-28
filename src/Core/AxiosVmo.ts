/**
 * Created by yee.wang on 2019-02-28
 **/
import AxiosDriver, { IAxiosDriver } from "../Driver/AxiosDriver";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import Vmo from "./Vmo";

export default abstract class AxiosVmo extends Vmo {
  protected static driver: IAxiosDriver = AxiosDriver;

  protected abstract builder(data: any): this;
}
