/**
 * Created by yee.wang on 2019-02-28
 **/

export const menu_data = [
  {
    id: 5,
    parent_id: 0,
    name: "灯饰",
    children: [
      {
        id: 46,
        parent_id: 5,
        name: "吊灯",
        children: [
          {
            id: 1129,
            parent_id: 46,
            name: "中式吊灯",
            level: 3
          },
          {
            id: 1130,
            parent_id: 46,
            name: "水晶吊灯",
            level: 3
          }
        ],
        level: 2
      }
    ],
    level: 1
  }
];

export const goods_data = {
  items: [
    {
      id: 38281,
      model_bn: "",
      cat_id: 468,
      aliasname: "718 北欧 ",
      uid: 0,
      user_id: 6881,
      size: { x: 46, y: 23.5 }
    },
    {
      id: 61222,
      model_bn: "",
      cat_id: 18,
      aliasname: "  ",
      uid: 0,
      user_id: 6881,
      size: { x: 94.9, y: 86.9 }
    }
  ],
  allRows: 3610,
  aggr: [
    {
      key: "styles",
      name: "风格",
      values: [
        { name: "现代简约", value: "1" },
        { name: "中式现代", value: "3" },
        { name: "欧式豪华", value: "4" },
        { name: "美式田园", value: "5" },
        { name: "地中海", value: "6" },
        { name: "东南亚", value: "7" },
        { name: "潮流混搭", value: "8" },
        { name: "美式经典", value: "10" },
        { name: "其他", value: "11" },
        { name: "日式", value: "12" },
        { name: "北欧极简", value: "14" },
        { name: "中式古典", value: "18" },
        { name: "港式简洁", value: "19" },
        { name: "法式经典", value: "20" }
      ]
    }
  ]
};
