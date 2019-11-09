import React from 'react'

import { Table,Button,Form,Row,Col, Select,
  Upload, Modal, message,
  Input,} from 'antd';

import {getcity,getshopping } from '../../api/getData'
const { Option } = Select

class ShopList
extends React.Component {
  constructor() {
    super()

    this.state = {
      getshoppingdata :[],
      editFoodData: {
        imageUrl: '',
        visible: false,
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
      { title: '店铺名称', dataIndex: 'name', },
      { title: '店铺地址', dataIndex: 'address', ellipsis:true },
      { title: '店铺介绍', dataIndex: 'description',},
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, recode, index) => (<div>
          <Button size="small" onClick={this.showEdit.bind(this, text, index)}>编辑</Button>
          <Button size="small">添加食品</Button>
          <Button size="small" type="danger" onClick={this.handleDelete}>删除</Button>
        </div>)
      },
    ];
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
      <div>
        <Table
    columns={this.columns}
    pagination={{
      defaultCurrent: 1,
      pageSize: 10,
      size: 'normal',
      style: { float: 'left' },
      showTotal: total => `共${total}条`
    }}
    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
    dataSource={this.state.getshoppingdata}
    expandedRowRender={recode => {
      return (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          <Row>
            <Col span={12}>
              <Form.Item label="店铺名称">{recode.name}</Form.Item>
              <Form.Item label="店铺地址">{recode.address}</Form.Item>
              <Form.Item label="店铺介绍">{recode.description}</Form.Item>
              <Form.Item label=" 店铺 ID">{recode.id}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话">{recode.phone}</Form.Item>
              <Form.Item label=" 评分">{recode.rating}</Form.Item>
              <Form.Item label="销售量">{recode.recent_order_num}</Form.Item>
              <Form.Item label="分类">{recode.category}</Form.Item>
            </Col>
          </Row>
        </Form>
      )
    }}
  />,
  <Modal
          title="修改店铺信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确认"
          width="50%"
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} colon={false}>
            <Form.Item label="店铺名称">
              <Input />
            </Form.Item>
            <Form.Item label="详细地址">
              <Input />
            </Form.Item>
            <Form.Item label="店铺分类" wrapperCol={{ span: 9 }}>
              <Select defaultValue="chi" onChange={this.changeCategory}>
                <Option value="chi">吃</Option>
                <Option value="he">喝</Option>
              </Select>
            </Form.Item>
            <Form.Item label="商铺图片">
              <Upload
                name="foodPic"
                action="/upload.do"
                listType="picture-card"
                className="food-pic"
                showUploadList={false}
              >
                <img
                  src={this.state.editFoodData.imageUrl}
                  alt="店铺图片"
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
    );
  }
 
  componentDidMount() {
    getshopping ({offset: 10 }).then(res =>{
       this.setState(
         {
          getshoppingdata:res.data     
         }
       )
    })
    getcity('guess').then(res =>{

    })
    
  }
}

export default ShopList
