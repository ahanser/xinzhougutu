let areaApi = "http://192.168.5.88:9080";
let tableApi = "http://192.168.5.61:9080";
const url = {
  getareaName: `${areaApi}/api/inputCatalogData/searchDistinctXZQHMCByCondition?`, //获取行政区划名称
  getfileId: `${areaApi}/api/inputCatalogData/getFileCountByDataId`,
  getareaPoint: `${areaApi}/api/inputCatalogData/searchFirstInputCatalogByCondition?`, //绘制多边形的数据请求
  getareaPointinfo: `${areaApi}/api/inputCatalogData/searchAllFileByCondition?`, //点击多边形弹出数据请求
  getfilenum: `${areaApi}/api/inputCatalogData/getFileCountByCondition?`, //获取查询满足条件的文件数量
  getarea: `${areaApi}/api/inputCatalogData/searchDistinctXZQHMC`,
  getMapResult: `${areaApi}/api/inputCatalogData/searchAllFileByDataId?`, //底图图层成果表格
  searchResult: `${areaApi}/api/inputCatalogData/detailedInquiry?catalogName=`, //顶部搜索框
  //系统设置
  getsettree: `${areaApi}/api/cglayer/findAll`, //获取成果展示页面左侧树形结构数据
  addsetfrom: `${areaApi}/api/cglayer/insertLayer`, //成果展示添加节点数据
  deletesetfrom: `${areaApi}/api/cglayer/deleteLayer?id=`, //成果展示删除节点数据
  updatesetfrom: `${areaApi}/api/cglayer/updateCGLayer`, //成果展示更新节点数据

  deleteTable: `${tableApi}/api/sys/cart/delete/`, //删除成果车表格数据
  addresult: `${tableApi}/api/sys/cart/add/`, //加入成果车
  getsettlelist: `${tableApi}/api/sys/order/get_order_cart_product`, //获取结算页面
  getorder: `${tableApi}/api/sys/cart/select_order/`, //获取订单信息
  postformdata: `${tableApi}/api/sys/shipping/save`, //发送订单表格
  postshipid: `${tableApi}/api/sys/order/create/`, //发送商品id
  getorderList: `${tableApi}/api/sys/order/list`, //订单页面加载列表
  getservedist: `${tableApi}/api/sys/open/service/category`, //服务管理页面获取资源目录
  getdistresouce: `${tableApi}/api/sys/open/service/query_like`, //服务管理页面获取下方卡片信息资源
}
export default url;
