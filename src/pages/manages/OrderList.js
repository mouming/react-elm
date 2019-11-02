import React from 'react'
import { Table, Form, Row, Col } from 'antd'

//引入当前组件需要的api请求方法
import {
  orderList,
  allOrderCount,
  getAddress,
  userInfo,
  getShopInfo
} from '../../api/getData'

class OrderList extends React.Component {
  constructor() {
    super()
    this.state = {
      orderListInfo: [],
      total: 0,
      expandData: {}
    }
    this.columns = [
      {
        title: () => <strong>订单</strong>,
        dataIndex: 'id',
        align: 'center'
      },
      {
        title: () => <strong>总价格</strong>,
        dataIndex: 'basket.packing_fee.price',
        align: 'center'
      },
      {
        title: () => <strong>订单状态</strong>,
        dataIndex: 'status_bar.title',
        align: 'center'
      }
    ]
  }
  openExpand = async (expand, recode) => {
    if (!expand) return
    let addressData = await getAddress(recode.address_id)
    let shopAddressData = await getShopInfo(recode.restaurant_id)
    let userInfoData = await userInfo(recode.user_id)
    let newList = this.state.orderListInfo.map(item => {
      if (item.id === recode.id) {
        item.address = addressData.data.address
        item.shopAddress = shopAddressData.data.address
        item.username = userInfoData.data.username
      }
      return item
    })
    this.setState({
      orderListInfo: newList
    })
  }
  toSwitch = pagination => {
    orderList({ limit: 10, offset: (pagination.current - 1) * 10 }).then(
      response => {
        this.setState({
          orderListInfo: response.data
        })
      }
    )
  }
  render() {
    return (
      <div className="admin-list" style={{ margin: 20 }}>
        <Table
          columns={this.columns}
          dataSource={this.state.orderListInfo}
          rowKey="id"
          pagination={{
            defaultCurrent: 1,
            total: this.state.total,
            pageSize: 10,
            size: 'normal',
            style: { float: 'left' },
            showTotal: total => `共${total}条`
          }}
          onChange={this.toSwitch}
          onExpand={this.openExpand}
          expandedRowRender={recode => {
            return (
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="用户名">{recode.username}</Form.Item>
                    <Form.Item label="收货地址">{recode.address}</Form.Item>
                    <Form.Item label="店铺地址">{recode.shopAddress}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="店铺名称">
                      {recode.restaurant_name}
                    </Form.Item>
                    <Form.Item label="店铺ID">{recode.restaurant_id}</Form.Item>
                  </Col>
                </Row>
              </Form>
            )
          }}
        />
      </div>
    )
  }
  componentDidMount() {
    let total = 0
    allOrderCount().then(res => {
      if (res.data.status === 1) {
        total = res.data.count
        orderList({ limit: 10 }).then(response => {
          this.setState({
            total,
            orderListInfo: response.data
          })
        })
      }
    })
  }
}
export default OrderList
