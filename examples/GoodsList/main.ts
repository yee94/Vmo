/**
 * Created by yee.wang on 2019-02-28
 **/
import MenuModel from "./models/MenuModel";
import GoodsModel from "./models/GoodsModel";

(async () => {
  console.log("start run");

  const menuModel = await MenuModel.get();
  const goods = await GoodsModel.list({
    id: menuModel.children[0].id
  });
  const goodsDetail = await GoodsModel.listWithDetail({
    id: menuModel.children[0].id
  });

  document.body.append(JSON.stringify(goodsDetail));
  console.log(goods.map(goodsModel => goodsModel.toJs()), goodsDetail);
})();
