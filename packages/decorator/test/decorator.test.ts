import { Vmo } from "../src";

@Vmo()
export class PageParams {
  constructor(data: any) {}

  @Vmo()
  type?: string;

  // subType2 => subType
  @Vmo("subType2")
  subType?: string;

  @Vmo(({ type, subType2 }) => `${type}_${subType2}`)
  finalType?: string;
}

test("decorator", (t) => {
  const instance = new PageParams({ type: "Type1", subType2: "SubType" });
  expect(instance).toMatchInlineSnapshot(`
      Vmo {
        "finalType": "Type1_SubType",
        "subType": "SubType",
        "type": "Type1",
      }
    `);
});
