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
  Upload,
  Spin
} from 'antd'

import {
  getFoodList,
  allFoodCount,
  getShopInfo,
  getFoodCategory,
  getFoodCategoryList,
  updateFoodInfo,
  getAdminInfo
} from '../../api/getData'

const { Option } = Select

class FoodList extends React.Component {
  constructor() {
    super()
    this.state = {
      foodListInfo: [],
      total: 0,
      visible: false,
      loading: false,
      editFoodData: {
        item_id: 0,
        name: '',
        description: '',
        image_path: '',
        restaurant_id: 0,
        category_id: 0,
        category: [],
        specfoods: []
      }
    }
    this.columns = [
      {
        title: () => <strong>食品名称</strong>,
        dataIndex: 'name',
        align: 'center',
        ellipsis: true
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
    // 编辑页面内的表格结构
    this.specfoods = [
      {
        title: '规格',
        dataIndex: 'specs_name'
      },
      {
        title: '包装费',
        dataIndex: 'packing_fee',
        align: 'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        align: 'center'
      },
      {
        title: '操作',
        render: () => (
          <Button
            type="danger"
            onClick={() => {
              this.setState({
                editFoodData: Object.assign({}, this.state.editFoodData, {
                  specfoods: []
                })
              })
            }}
          >
            删除
          </Button>
        ),
        align: 'center'
      }
    ]
  }
  // 从列表中删除食品
  handleDelete() {
    message.error('权限不足')
  }
  // 点击编辑按钮，获取分类数据，并显示编辑页面
  showEdit(text, index) {
    this.setState({
      loading: true
    })
    let {
      item_id,
      image_path,
      name,
      description,
      specfoods,
      category_id,
      restaurant_id
    } = text
    getFoodCategoryList(restaurant_id).then(res => {
      if (res.data instanceof Array) {
        this.setState({
          visible: true,
          loading: false,
          editFoodData: {
            item_id,
            name,
            description,
            image_path,
            restaurant_id,
            category_id,
            category: res.data.map(item => ({ name: item.name, id: item.id })),
            specfoods
          }
        })
      } else {
        this.setState({
          loading: false
        })
        message.error(res.data.message)
      }
    })
  }
  // 修改食品分类
  changeCategory = e => {
    let newFoodData = JSON.parse(JSON.stringify(this.state.editFoodData))
    newFoodData.category_id = e
    this.setState({
      editFoodData: newFoodData
    })
  }
  //修改食品名称
  changeFoodName = e => {
    let newFoodData = JSON.parse(JSON.stringify(this.state.editFoodData))
    newFoodData.name = e.target.value
    this.setState({
      editFoodData: newFoodData
    })
  }
  // 修改食品描述
  changeDescription = e => {
    let newFoodData = JSON.parse(JSON.stringify(this.state.editFoodData))
    newFoodData.description = e.target.value
    this.setState({
      editFoodData: newFoodData
    })
  }
  // 修改图片
  changeImage(e) {
    // 出现文件上传不成功问题，暂时还无法解决
  }
  // 提交修改
  handleOk = () => {
    let updateData = JSON.parse(JSON.stringify(this.state.editFoodData))
    delete updateData.category
    updateData.specfoods = updateData.specfoods.map(item => {
      return {
        specs: item.specs_name,
        packing_fee: item.packing_fee,
        price: item.price
      }
    })
    updateFoodInfo(updateData).then(res => {
      if (res.data.status === 1) {
        message.success(res.data.success)
      } else {
        message.error(res.data.message)
      }
      this.setState({
        visible: false
      })
    })
  }
  // 取消修改
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 点击列表加号
  handleExpand = async (expand, recode) => {
    if (!expand) return
    let foodCategory = await getFoodCategory(recode.category_id)
    let shopInfo = await getShopInfo(recode.restaurant_id)
    let newFoodList = this.state.foodListInfo.map(item => {
      if (item.key === recode.key) {
        item.restaurant_name = shopInfo.data.name
        item.restaurant_address = shopInfo.data.address
        item.category = foodCategory.data.name
      }
      return item
    })
    this.setState({
      foodListInfo: newFoodList
    })
  }
  // 换页
  toSwitch = e => {
    getFoodList({ limit: 10, offset: (e.current - 1) * 10 }).then(res => {
      if (res.data instanceof Array) {
        let foodListInfo = res.data.map((item, index) => {
          item.key = index
          return item
        })
        this.setState({
          foodListInfo
        })
      } else {
        message.error(res.data.message)
      }
    })
  }
  render() {
    return (
      <div className="admin-list" style={{ margin: 20 }}>
        {/* 点击编辑按钮会有一个加载中的动画效果 */}
        <div
          style={{
            width: window.screen.width,
            height: window.screen.height,
            background: '#000000a5',
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            display: this.state.loading ? 'block' : 'none'
          }}
        >
          <Spin
            size="large"
            style={{
              marginTop: window.screen.height / 2,
              transform: 'translateY(-50%)'
            }}
          />
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.foodListInfo}
          pagination={{
            defaultCurrent: 1,
            total: this.state.total,
            pageSize: 10,
            size: 'normal',
            style: { float: 'left' },
            showTotal: total => `共${total}条`
          }}
          onChange={this.toSwitch}
          onExpand={this.handleExpand}
          expandedRowRender={recode => {
            return (
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="食品名称">{recode.name}</Form.Item>
                    <Form.Item label="食品ID">{recode.item_id}</Form.Item>
                    <Form.Item label="食品介绍">{recode.description}</Form.Item>
                    <Form.Item label="食品评分">{recode.rating}</Form.Item>
                    <Form.Item label="月销量">{recode.month_sales}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="餐馆名称">
                      {recode.restaurant_name}
                    </Form.Item>
                    <Form.Item label="餐馆ID">{recode.restaurant_id}</Form.Item>
                    <Form.Item label="餐馆地址">
                      {recode.restaurant_address}
                    </Form.Item>
                    <Form.Item label="食品分类">{recode.category}</Form.Item>
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
              <Input
                value={this.state.editFoodData.name}
                onChange={this.changeFoodName}
              />
            </Form.Item>
            <Form.Item label="食品介绍">
              <Input
                value={this.state.editFoodData.description}
                onChange={this.changeDescription}
              />
            </Form.Item>
            <Form.Item label="食品分类" wrapperCol={{ span: 9 }}>
              <Select
                defaultValue={this.state.editFoodData.category_id}
                onChange={this.changeCategory}
              >
                {this.state.editFoodData.category.map(item => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label="食品图片">
              <Upload
                name="foodPic"
                action="https://elm.cangdu.org/v1/addimg/food"
                listType="picture-card"
                className="food-pic"
                showUploadList={false}
                onChange={this.changeImage}
              >
                <img
                  src={
                    '//elm.cangdu.org/img/' + this.state.editFoodData.image_path
                  }
                  alt="食品图片"
                  style={{ width: '100%' }}
                />
              </Upload>
            </Form.Item>
            <Table
              columns={this.specfoods}
              dataSource={this.state.editFoodData.specfoods}
              pagination={false}
              rowKey="food_id"
              style={{ marginBottom: 20 }}
            />
          </Form>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    let total = 0
    getAdminInfo()
    allFoodCount()
      .then(res => {
        if (res.data.status === 1) {
          total = res.data.count
          return getFoodList({ limit: 10 })
        }
      })
      .then(response => {
        if (response.data instanceof Array) {
          let foodListInfo = response.data.map((item, index) => {
            item.key = index
            return item
          })
          this.setState({
            total,
            foodListInfo
          })
        } else {
          message.error(response.data.message)
        }
      })
  }
}
export default FoodList
