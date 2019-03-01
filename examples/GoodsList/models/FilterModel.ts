/**
 * Created by yee.wang on 2019-02-28
 **/
import { Field, Vmo } from "../../../bundle";

interface IFilterValue {
  name: string;
  value: string;
}
export default class FilterModel extends Vmo {
  @Field
  public key: string;
  @Field
  public name: string;
  @Field
  public filters: IFilterValue[];

  protected load(data: any): this {
    data.filters = data.values;
    return super.load(data);
  }
}
