import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Modal,
  Select,
  Button,
  Upload,
  Icon,
  Radio,
  InputNumber,
  Table
} from 'antd'

import './AddGood.scss'
const { Option } = Select

class AddGood extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      showAddCategory: false,
      imageUrl: '',
      specification: 1,
      specificationData: [
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
    this.columns = [
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

  handleOk = () => {
    this.setState({
      visible: false
    })
  }
  handleChange(e) {
    console.log(e)
  }
  handleChangeMultiple(value) {
    console.log(`selected ${value}`)
  }
  handleRadio = e => {
    console.log('radio:' + e.target.value)
    this.setState({
      specification: parseInt(e.target.value)
    })
  }
  packFee(e) {
    console.log('包装费' + e)
  }
  handlePrice(e) {
    console.log('价格' + e)
  }
  render() {
    const { showAddCategory, specification } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
    return (
      <div className="add-good" style={{ marginBottom: 20 }}>
        {/* 进入页面前判断是否是从食品列表的添加食品页过来的 */}
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="确认"
          cancelText="取消"
        >
          <p>添加食品需要选择一个商铺，现在就去选择商铺吗？</p>
        </Modal>
        <Row>
          <Col span={14} offset={4}>
            <header className="form-header">添加食品种类</header>
            <Form {...formItemLayout} colon={false} className="category-form">
              <Form.Item label="食品分类">
                <Select defaultValue="" onChange={this.handleChange}>
                  <Option value="">请选择</Option>
                  <Option value="chi">吃</Option>
                  <Option value="he">喝</Option>
                </Select>
              </Form.Item>
              {/* 下划线 */}
              <div className="borderline"></div>
              {showAddCategory && (
                <div className="add-category">
                  <Form.Item label="食品种类">
                    <Input />
                  </Form.Item>
                  <Form.Item label="种类描述">
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button type="primary">提交 </Button>
                  </Form.Item>
                </div>
              )}
              <Row className="add-category-btn">
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Button
                    type="link"
                    icon={showAddCategory ? 'caret-up' : 'caret-down'}
                  >
                    添加食品种类
                  </Button>
                </Col>
              </Row>
            </Form>
            <header className="form-header">添加食品</header>
            <Form {...formItemLayout} colon={false} className="category-form">
              <Form.Item label="食品名称">
                <Input />
              </Form.Item>
              <Form.Item label="食品活动">
                <Input />
              </Form.Item>
              <Form.Item label="食品详情">
                <Input />
              </Form.Item>
              <Form.Item label="上传食品图片">
                <Upload
                  name="foodPic"
                  action="/upload.do"
                  listType="picture-card"
                  className="food-pic"
                  showUploadList={false}
                >
                  {this.state.imageUrl ? (
                    <img
                      src={this.state.imageUrl}
                      alt="logo"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>
              </Form.Item>
              <Form.Item label="食品特点">
                <Select
                  mode="multiple"
                  style={{ width: '50%' }}
                  placeholder="请选择"
                  onChange={this.handleChangeMultiple}
                >
                  <Option key="1" value="good">
                    好吃
                  </Option>
                  <Option key="2" value="bad">
                    不好吃
                  </Option>
                  <Option key="3" value="verygood">
                    很好吃
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="食品规格">
                <Radio.Group onChange={this.handleRadio} value={specification}>
                  <Radio value={1}>单规格</Radio>
                  <Radio value={2}>多规格</Radio>
                </Radio.Group>
              </Form.Item>
              {/* 根据食品规格选项的选择来显示不同dom  */}
              {specification === 1 ? (
                <div className="specification-one">
                  <Form.Item label="包装费">
                    <InputNumber
                      min={0}
                      max={50}
                      defaultValue={0}
                      onChange={this.packFee}
                    />
                  </Form.Item>
                  <Form.Item label="价格">
                    <InputNumber
                      min={0}
                      defaultValue={20}
                      onChange={this.handlePrice}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div className="specification-two">
                  <Row>
                    <Col
                      span={24}
                      style={{ textAlign: 'center', paddingLeft: 30 }}
                    >
                      <Button type="primary" style={{ marginBottom: 10 }}>
                        添加规格
                      </Button>
                      <Table
                        columns={this.columns}
                        dataSource={this.state.specificationData}
                        pagination={false}
                        style={{ marginBottom: 20 }}
                      />
                    </Col>
                  </Row>
                </div>
              )}
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary">确认添加食品</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default AddGood
