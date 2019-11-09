import React from 'react'
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  message,
  Modal,
  Input,
  Select,
  Upload
} from 'antd'
const { Option } = Select

class FoodList extends React.Component {
  constructor() {
    super()
    this.state = {
      foodListInfo: [
        {
          id: 1,
          foodName: '牛奶',
          description: '营养',
          rating: '4.7'
        },
        {
          id: 2,
          foodName: '牛奶',
          description: '营养',
          rating: '4.7'
        }
      ],
      visible: false,
      editFoodData: {
        imageUrl: '',
        specfoodInfo: [
          {
            key: 1,
            specification: '默认',
            packFee: 23,
            price: 20
          },
          {
            key: 2,
            specification: '默认',
            packFee: 2,
            price: 25
          }
        ]
      }
    }
    this.columns = [
      {
        title: () => <strong>食品名称</strong>,
        dataIndex: 'foodName',
        align: 'center'
      },
      {
        title: () => <strong>食品介绍</strong>,
        dataIndex: 'description',
        align: 'center'
      },
      {
        title: () => <strong>评分</strong>,
        dataIndex: 'rating',
        align: 'center'
      },
      {
        title: () => <strong>操作</strong>,
        render: (text, recode, index) => {
          return (
            <div>
              <Button
                type="default"
                size="small"
                style={{ marginRight: 20 }}
                onClick={this.showEdit.bind(this, text, index)}
              >
                编辑
              </Button>
              <Button type="danger" size="small" onClick={this.handleDelete}>
                删除
              </Button>
            </div>
          )
        },

        align: 'center'
      }
    ]
    this.specfoods = [
      {
        title: '规格',
        dataIndex: 'specification'
      },
      {
        title: '包装费',
        dataIndex: 'packFee',
        align: 'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        align: 'center'
      },
      {
        title: '操作',
        render: () => <Button type="danger">删除</Button>,
        align: 'center'
      }
    ]
  }
  handleDelete() {
    message.error('权限不足')
  }
  showEdit(text, index) {
    console.log(text, index)
    this.setState({
      visible: true
    })
  }
  changeCategory(e) {
    console.log(e)
  }
  handleOk = () => {
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    return (
      <div className="admin-list" style={{ margin: 20 }}>
        <Table
          columns={this.columns}
          dataSource={this.state.foodListInfo}
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
                    <Form.Item label="食品名称2">13</Form.Item>
                    <Form.Item label="食品ID">123</Form.Item>
                    <Form.Item label="食品介绍">123</Form.Item>
                    <Form.Item label="食品评分">123</Form.Item>
                    <Form.Item label="月销量">123</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="餐馆名称">123</Form.Item>
                    <Form.Item label="餐馆ID">123</Form.Item>
                    <Form.Item label="餐馆地址">123</Form.Item>
                    <Form.Item label="食品分类">123</Form.Item>
                  </Col>
                </Row>
              </Form>
            )
          }}
        />
        {/* 编辑食品信息框 */}
        <Modal
          title="修改食品信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确认"
          width="50%"
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} colon={false}>
            <Form.Item label="食品名称">
              <Input />
            </Form.Item>
            <Form.Item label="食品介绍">
              <Input />
            </Form.Item>
            <Form.Item label="食品分类" wrapperCol={{ span: 9 }}>
              <Select defaultValue="chi" onChange={this.changeCategory}>
                <Option value="chi">吃</Option>
                <Option value="he">喝</Option>
              </Select>
            </Form.Item>
            <Form.Item label="食品图片">
              <Upload
                name="foodPic"
                action="/upload.do"
                listType="picture-card"
                className="food-pic"
                showUploadList={false}
              >
                <img
                  src={this.state.editFoodData.imageUrl}
                  alt="食品图片"
                  style={{ width: '100%' }}
                />
              </Upload>
            </Form.Item>
            <Table
              columns={this.specfoods}
              dataSource={this.state.editFoodData.specfoodInfo}
              pagination={false}
              style={{ marginBottom: 20 }}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}
export default FoodList
