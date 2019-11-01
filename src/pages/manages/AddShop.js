import React from 'react'
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  Button,
  Cascader,
  Select,
  Switch,
  InputNumber,
  TimePicker,
  Upload,
  Modal,
  Table
} from 'antd'

const { Option } = Select

class AddShop extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      visible: false,
      activities: [
        {
          id: 1,
          caption: '减',
          name: '满减活动',
          content: '满十减三'
        },
        {
          id: 2,
          caption: '送',
          name: '满减活动',
          content: '满十减三'
        }
      ]
    }
  }
  // 满减活动列表项
  columns = [
    {
      title: '活动标题',
      dataIndex: 'caption'
    },
    {
      title: '活动名称',
      dataIndex: 'name'
    },
    {
      title: '活动详情',
      dataIndex: 'content'
    },
    {
      title: '操作',
      render: () => <Button type="danger">删除</Button>
    }
  ]
  onChange(checked) {
    console.log(`开关的状态${checked}`)
  }
  normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  handleChange = e => {
    console.log('选择框' + e)
    this.setState({
      visible: true
    })
  }
  handleOk = e => {
    console.log('ok' + e)
    this.setState({
      visible: false
    })
  }
  render() {
    const categoryOptions = [
      {
        value: 'yiguoliaoli',
        label: '异国料理',
        children: [
          {
            value: 'rihanliaoli',
            label: '日韩料理'
          },
          {
            value: 'xican',
            label: '西餐'
          }
        ]
      },
      {
        value: 'kuaicanbiandang',
        label: '快餐便当',
        children: [
          {
            value: 'jiancan',
            label: '简餐'
          },
          {
            value: 'gaijiaofan',
            label: '盖浇饭'
          }
        ]
      }
    ]

    const { getFieldDecorator } = this.props.form
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
      <div className="add-shop" style={{ marginTop: 30 }}>
        <Row>
          <Col span={12} offset={4}>
            <Form {...formItemLayout} colon={false}>
              <Form.Item label="店铺名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入店铺名称'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="详细地址">
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: '请输入详细地址'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col sm={{ span: 18, offset: 6 }} xs={{ span: 18 }}>
                  <p>
                    当前城市：<span>深圳</span>
                  </p>
                </Col>
              </Row>
              <Form.Item label="联系电话">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '请输入联系电话'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="店铺简介">
                <Input />
              </Form.Item>
              <Form.Item label="店铺标语">
                <Input />
              </Form.Item>
              <Form.Item label="店铺分类" wrapperCol={{ span: 9 }}>
                {getFieldDecorator('category', {
                  initialValue: ['kuaicanbiandang', 'gaijiaofan'],
                  rules: [
                    {
                      type: 'array',
                      required: true,
                      message: '请输入店铺分类'
                    }
                  ]
                })(<Cascader options={categoryOptions} />)}
              </Form.Item>
              <Form.Item label="店铺标语">
                <span>品牌保证</span>
                <Switch defaultChecked onChange={this.onChange} />
                <span>蜂鸟专送</span>
                <Switch defaultChecked onChange={this.onChange} />
                <span>新开店铺</span>
                <Switch defaultChecked onChange={this.onChange} />
              </Form.Item>
              <Form.Item
                wrapperCol={{ sm: { span: 18, offset: 6 }, xs: { span: 24 } }}
              >
                <span>外卖保</span>
                <Switch defaultChecked onChange={this.onChange} />
                <span>准时达</span>
                <Switch defaultChecked onChange={this.onChange} />
                <span>开发票</span>
                <Switch defaultChecked onChange={this.onChange} />
              </Form.Item>
              <Form.Item label="配送费">
                <InputNumber
                  min={0}
                  max={20}
                  defaultValue={5}
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item label="起送价">
                <InputNumber
                  min={0}
                  max={50}
                  defaultValue={20}
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item label="营业时间">
                <TimePicker
                  minuteStep={15}
                  format="HH:mm"
                  placeholder="起始时间"
                  hideDisabledOptions
                  disabledHours={() => [0, 1, 2, 3, 4, 5]}
                />
                <span> </span>
                <TimePicker
                  minuteStep={15}
                  format="HH:mm"
                  placeholder="结束时间"
                  hideDisabledOptions
                  disabledHours={() => [0, 1, 2, 3, 4, 5]}
                />
              </Form.Item>
              <Form.Item label="上传店铺头像">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile
                })(
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture-card"
                    className="logo-uploader"
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
                )}
              </Form.Item>
              <Form.Item label="上传营业执照">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile
                })(
                  <Upload
                    name="business_license"
                    action="/upload.do"
                    listType="picture-card"
                    className="logo-uploader"
                    showUploadList={false}
                  >
                    {this.imageUrl ? (
                      <img
                        src={this.imageUrl}
                        alt="logo"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <Icon type="plus" />
                    )}
                  </Upload>
                )}
              </Form.Item>
              <Form.Item label="上传餐饮服务许可证">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile
                })(
                  <Upload
                    name="catering_service"
                    action="/upload.do"
                    listType="picture-card"
                    className="logo-uploader"
                    showUploadList={false}
                  >
                    {this.imageUrl ? (
                      <img
                        src={this.imageUrl}
                        alt="logo"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <Icon type="plus" />
                    )}
                  </Upload>
                )}
              </Form.Item>
              <Form.Item label="满减活动" wrapperCol={{ span: 9 }}>
                <Select defaultValue="lucy" onChange={this.handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Form>
            {/* 满减活动显示框 */}
            <Form.Item>
              <Table
                columns={this.columns}
                dataSource={this.state.activities}
                rowKey="id"
                pagination={false}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary">立即创建</Button>
            </Form.Item>
          </Col>
        </Row>
        {/* 增加满减活动提示框 */}
        <Modal title="提示" visible={this.state.visible} onOk={this.handleOk}>
          <p>请输入活动详情</p>
          <Input />
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'add' })(AddShop)
