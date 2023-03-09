# Vmo

[![Using TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-0072C4.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/npm/l/generator-bxd-oss.svg)](#License)

English | [简体中文](./README_CN.md)

# Introduction

Vmo is a data model framework for front-end applications. It solves the problem of confusing interface access, inconsistent server data request methods, and inconsistent data return results in front-end development.

Vmo is primarily used for data request handling and data model management. It can be used with popular front-end frameworks such as Vue, React, and Angular for data model management.

It can effectively address the following issues:

- Confusing interface requests with axios.get... everywhere.
- Chaotic data management, where requested data is used and then discarded, or placed directly into the Store.
- Weak data reliability, where requested data cannot be guaranteed to be stable, and where fields may be missing or added.
- Confusing Action methods, where there are synchronous and asynchronous modifications to the Store.
- Weak code hinting, where requested data cannot be used for code hinting with TypeScript, and only "any" type can be defined.
- Increasing number of invalid fields, where as personnel changes, the meaning of fields gradually disappears, and new business defines new fields.
- Heavy project migration, where during project reconstruction, fields may not be understood, and functional points and data may be lost.

# Usage

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
