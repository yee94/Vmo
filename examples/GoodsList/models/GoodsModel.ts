/**
 * Created by yee.wang on 2019-02-28
 **/
import { AxiosVmo, Field, mapValue } from "../../../bundle";
import { USER_URL } from "../constants/Urls";
import { wait } from "../utils";
import { goods_data } from "../mock";
import FilterModel from "./FilterModel";

// 商品查询参数
interface IGoodsQuery {
  id: number;
  search?: string;
  filter?: any;
}

interface IGoodsCollection {
  goods: GoodsModel[];
  goodsRows: number;
  filters: FilterModel[];
}

export default class GoodsModel extends AxiosVmo {
  protected static requestUrl: string = USER_URL;

  @Field
  public id: number;
  @Field
  public catId: number;
  @Field
  public aliasName: string;
  @Field
  public uid: number;
  @Field
  public userId: number;
  @Field
  public size: { x: number; y: number };

  /**
   * 返回Goods 集合
   * @param query
   */
  public static async list(query: IGoodsQuery): Promise<GoodsModel[]> {
    const { items } = await this.fetch(query);
    return mapValue(items, GoodsModel);
  }

  /**
   * 返回GoodsModel 集合 及附属信息
   * @param query
   */
  public static async listWithDetail(
    query: IGoodsQuery
  ): Promise<IGoodsCollection> {
    const { items, allRows, aggr } = await this.fetch(query);
    const goods = mapValue(items, GoodsModel);
    const filters = mapValue(aggr, FilterModel);
    return { goods, goodsRows: allRows, filters };
  }

  public static async fetch(query: IGoodsQuery): Promise<any> {
    await wait(1000 * Math.random()); // 模拟异步请求
    return goods_data;
  }

  protected load(data: any): this {
    data.catId = data.cat_id;
    data.aliasName = data.aliasname;
    data.userId = data.user_id;

    return super.load(data);
  }
}
