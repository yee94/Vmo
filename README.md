# Vmo

[![Using TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-0072C4.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/npm/l/generator-bxd-oss.svg)](#License)

# 简介

Vmo 是一个用于前端的数据模型。解决前端接口访问混乱，服务端数据请求方式不统一，数据返回结果不一致的微型框架。

Vmo 主要用于处理数据请求，数据模型管理。可配合当前主流前端框架进行数据模型管理 Vue,React,Angular。

能够有效处理以下问题：

- 接口请求混乱，`axios.get...`随处可见。
- 数据管理混乱，请求到的数据结果用完即丢、拿到的数据直接放进`Store`。
- 数据可靠性弱，不能保证请求数据是否稳定，字段是否多、是否少。
- `Action`方法混乱，`Action`中及存在同步对`Store`的修改，又存在异步请求修改`Store`。
- 代码提示弱，请求到的数据无法使用`TypeScript`进行代码提示，只能定义 `any` 类型。
- 无效字段增多，人员变动，字段含义信息逐步丢失，新业务定义新字段。
- 项目迁移繁重，项目重构时，对字段不理解，重构过程功能点、数据丢失。

# Vmo 特性

Vmo 只提供一个基类，提倡的主要是对数据模型的封装设计。你可以像以下方式封装数据模型

```typescript
import { Vmo, Field } from "@vmojs/base";

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

  /**
   * 将数据适配\转换为模型字段
   * @param data
   */
  protected load(data: any): this {
    data.filters = data.values;
    return super.load(data);
  }
}
```

在数据模型的基础上，`Vmo` 利用**驱动器**派生子类，赋予数据模型数据获取及存储的能力，你可以像这样实现一个完整的数据模型获取。

`AxiosVmo` 是基于 `Vmo` 实现的一个使用`Axios`作为 数据获取、存储的 `Driver` ，你同样可以封装自己的`Driver` ，通过相同接口，实现多态方法，来做到在不同介质上存储和获取数据。比如`IndexDB`,`LocalStorage`。

```typescript
import { AxiosVmo } from "@vmojs/axios";
import { Field, mapValue } from "@vmojs/base";
import { USER_URL } from "../constants/Urls";
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
   * 返回GoodsModel 集合
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
    const result = await this.driver.get(this.requestUrl, query);
    return result;
  }

  /**
   * 将请求的数据适配转换为Model
   * @param data
   */
  protected load(data: any): this {
    data.catId = data.cat_id;
    data.aliasName = data.aliasname;
    data.userId = data.user_id;

    return super.load(data);
  }
}
```

# Mobx

同样的`Vmo`还可以配合 `Mobx`使用，真正完成数据模型与数据响应结合使用。

```typescript
import { Vmo, Field } from "@vmojs/base";
import { observable } from "mobx";

interface IFilterValue {
  name: string;
  value: string;
}
export default class FilterModel extends Vmo {
  @Field
  @observable
  public key: string;
  @Field
  @observable
  public name: string;
  @Field
  @observable
  public filters: IFilterValue[];

  /**
   * 将数据适配\转换为模型字段
   * @param data
   */
  protected load(data: any): this {
    data.filters = data.values;
    return super.load(data);
  }
}
```
