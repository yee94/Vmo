# @vmojs/decorator

[![Using TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-0072C4.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/npm/l/generator-bxd-oss.svg)](#License)

# Usage example

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
 * {
 *    type: "Type1",
 *    subType: "SubType",
 *    finalType: "Type1_SubType"
 * }
 * 
 * */
```
