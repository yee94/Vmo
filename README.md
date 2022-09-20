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

# 使用

```tsx
import { Vmo } from "@vmojs/decorator";

@Vmo()
export class PageParams {
  constructor(data: any) {}

  @Vmo()
  type?: string;

  // subType2 => subType
  @Vmo("subType2")
  subType?: string;

  @Vmo(({ type, subType }) => `${type}_${subType}`)
  finalType?: string;
}

new PageParams({ type: "Type1", subType2: "SubType" });

/**
 * =>
 *
 * PageParams {
 *    type: "Type1",
 *    subType: "SubType",
 *    finalType: "Type1_SubType"
 * }
 *
 * */
```
