/**
 * Created by yee.wang on 2019-02-28
 **/
import AxiosVmo from "../../../src/Core/AxiosVmo";
import { Field } from "../utils";

interface IFilterValue {
  name: string;
  value: string;
}
export default class FilterModel extends AxiosVmo {
  @Field
  key: string;
  @Field
  name: string;
  @Field
  filters: IFilterValue[];

  protected load(data: any): this {
    data.filters = data.values;
    return super.load(data);
  }
}
