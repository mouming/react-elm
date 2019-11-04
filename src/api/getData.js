import axios from '../config/reaxios'

// 登录
/**
 *登录请求
 * @param {Object} data
 * @param {String} data.user_name
 * @param {String} data.password
 *
 */
export const login = data => axios.post('/admin/login', data)

// 退出登录
export const singout = () => axios.get('/admin/singout')

//管理员信息
export const getAdminInfo = () => axios.get('/admin/info')

//当天api请求量
/**
 *
 * @param { String } date
 * 输入日期格式，例如：
 * 2019-11-02
 */
export const apiCount = date => axios.get('/statis/api/' + date + '/count')

//所有api请求量
export const allApiCount = () => axios.get('/statis/api/count')

//当天用户注册量
/**
 *
 * @param { String } date
 * 输入日期格式，例如：
 * 2019-11-02
 */
export const userCount = date => axios.get('/statis/user/' + date + '/count')

//全部用户注册量
export const allUserCount = () => axios.get('/v1/users/count')

//当天订单量
/**
 *
 * @param { String } date
 * 输入日期格式，例如：
 * 2019-11-02
 */
export const orderCount = date => axios.get('/statis/order/' + date + '/count')

//所有订单量
export const allOrderCount = () => axios.get('/bos/orders/count')

// 订单列表
/**
 *
 * @param {Object} data
 * 必传的两个属性
 * limit : number(获取数据数量，默认 20)
 * offset: number(跳过数据条数 默认 0)
 */
export const orderList = data =>
  axios.get(
    '/bos/orders?limit=' + (data.limit || 20) + '&offset=' + (data.offset || 0)
  )

//当天管理员注册量
/**
 *
 * @param { String } date
 * 输入日期格式，例如：
 * 2019-11-02
 */
export const adminCount = date => axios.get('/statis/admin/' + date + '/count')

//所有管理员注册量
export const allAdminCount = () => axios.get('/admin/count')

//管理员列表
/**
 * 获取管理员列表数据
 * @param {object} data
 * @param {Number} data.limit(必传)
 * @param {Number} data.offset(默认为0)
 *
 */
export const getAdminList = data =>
  axios.get('/admin/all?limit=' + data.limit + '&offset=' + (data.offset || 0))

//用户列表
/**
 *
 * @param {Object} data
 * 必传的两个属性
 * limit : number(获取数据数量，默认 20)
 * offset: number(跳过数据条数 默认 0)
 */
export const userList = data =>
  axios.get(
    '/v1/users/list?limit=' +
      (data.limit || 20) +
      '&offset=' +
      (data.offset || 0)
  )

// 获取用户信息
/**
 * 获取用户信息
 * @param {Number} user_id
 */
export const userInfo = user_id => axios.get('v1/user/' + user_id)

// 用户分布信息
export const getUserCity = () => axios.get('/v1/user/city/count')

// 获取地址信息
/**
 * 获取地址信息
 * @param {Number} id
 *
 */
export const getAddress = id => axios.get('/v1/addresse/' + id)

//餐馆详细信息
/**
 * 获取地址信息
 * @param {Number} id
 * id : 地址id
 */
export const getShopInfo = id => axios.get('/shopping/restaurant/' + id)

//  获取食品列表
/**
 * 获取食品列表数据
 * @param {Object} data
 * @param {Number} data.limit
 * @param {Number} data.offset
 */
export const getFoodList = data =>
  axios.get(
    '/shopping/v2/foods?limit=' + data.limit + '&offset=' + (data.offset || 0)
  )

// 食品总数
export const allFoodCount = () => axios.get('/shopping/v2/foods/count')

// 获取食品的分类信息
/**
 *
 * @param {Number} id
 * id: (食品的分类id)
 */
export const getFoodCategory = id => axios.get('/shopping/v2/menu/' + id)

// 获取店铺食品分类列表
/**
 *
 * @param {Number} id
 * id: (店铺的id)
 */
export const getFoodCategoryList = id =>
  axios.get('/shopping/v2/menu?restaurant_id=' + id)

// 更新食品
/**
 * 更新食品数据
 * @param {Object} data
 * post 请求
 */
export const updateFoodInfo = data =>
  axios.post('/shopping/v2/updatefood', data)
