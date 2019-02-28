/**
 * Created by yee.wang on 2019-02-28
 **/
import AxiosVmo from "../../../src/Core/AxiosVmo";
import { MENU_URL } from "../constants/Urls";
import { menu_data } from "../mock";
import { Field, mapValue, wait } from "../utils";

export default class MenuModel extends AxiosVmo {
  protected static requestUrl: string = MENU_URL;

  @Field
  public id: number;
  @Field
  public parentId: number;
  @Field
  public level: number;
  @Field
  public name: string;
  @Field
  public children: MenuModel[];

  public static async get(): Promise<MenuModel> {
    await wait(); // 模拟异步请求
    return new MenuModel(menu_data[0]);
  }

  /**
   * 适配数据并转为数据Model
   * @param data
   */
  public load(data: any): this {
    data.parentId = data.parent_id;
    super.load(data);

    this.children = mapValue(data.children, MenuModel);

    return this;
  }
}
