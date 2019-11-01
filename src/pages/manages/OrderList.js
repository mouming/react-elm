import React from 'react'
import { Table, Form, Row, Col, Icon } from 'antd'

class OrderList extends React.Component {
  constructor() {
    super()
    this.state = {
      orderListInfo: [
        {
          id: 1,
          order: '13434',
          totalPrice: '34',
          status: '支付超时'
        },
        {
          id: 2,
          order: '13434',
          totalPrice: '34',
          status: '支付超时'
        }
      ]
    }
    this.columns = [
      {
        title: () => <strong>订单</strong>,
        dataIndex: 'order',
        align: 'center'
      },
      {
        title: () => <strong>总价格</strong>,
        dataIndex: 'totalPrice',
        align: 'center'
      },
      {
        title: () => <strong>订单状态</strong>,
        dataIndex: 'status',
        align: 'center'
      }
    ]
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
            total: 100,
            pageSize: 10,
            size: 'normal',
            style: { float: 'left' },
            showTotal: total => `共${total}条`
          }}
          expandedRowRender={recode => {
            return (
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="用户名">123</Form.Item>
                    <Form.Item label="收货地址">123</Form.Item>
                    <Form.Item label="店铺地址">123</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="店铺名称">123</Form.Item>
                    <Form.Item label="店铺ID">123</Form.Item>
                  </Col>
                </Row>
              </Form>
            )
          }}
        />
      </div>
    )
  }
}
export default OrderList
