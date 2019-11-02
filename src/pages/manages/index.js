import React, { Component } from 'react'
import { Layout, Breadcrumb, Avatar, Menu, Icon } from 'antd'
import { Route, NavLink } from 'react-router-dom'

import Home from './Home'
import Explanation from './Explanation'
import AdminInfo from './AdminInfo'
import Edit from './Edit'
import Visitor from './Visitor'
import AddShop from './AddShop'
import AddGood from './AddGood'
import AdminList from './AdminList'
import OrderList from './OrderList'
import UserList from './UserList'
import FoodList from './FoodList'
import ShopList from './ShopList'

import './index.scss'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class Manage extends Component {
  constructor() {
    super()
    this.state = {
      breadcrumb: [],
      clickKey: '',
      openKey: ''
    }
  }
  handleClick = e => {
    console.log(1)
    if (e.key === this.state.clickKey) return
    let breadcrumb = []
    if (e.keyPath.length === 1) {
      breadcrumb = ['首页']
    } else {
      let keyPath = e.keyPath.reverse()
      keyPath.unshift('首页')
      breadcrumb = keyPath
    }
    this.setState({
      breadcrumb,
      clickKey: e.key
    })
  }
  handleSubMenu = openKey => {
    let key = ''
    if (openKey.length) {
      key = openKey.pop()
    }
    this.setState({
      openKey: key
    })
  }
  render() {
    let { clickKey, openKey } = this.state
    return (
      <Layout className="manage">
        <Sider
          className="sider-bar"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[clickKey]}
            openKeys={[openKey]}
            mode="inline"
            theme="dark"
            onOpenChange={this.handleSubMenu}
          >
            <Menu.Item key="首页">
              <NavLink to="/manage">
                <Icon type="appstore" theme="filled" />
                首页
              </NavLink>
            </Menu.Item>
            <SubMenu
              key="数据管理"
              title={
                <span>
                  <Icon type="file" />
                  <span>数据管理</span>
                </span>
              }
            >
              <Menu.Item key="用户列表">
                <NavLink to="/manage/userList">用户列表</NavLink>
              </Menu.Item>
              <Menu.Item key="商家列表">
                <NavLink to="/manage/shopList">商家列表</NavLink>
              </Menu.Item>
              <Menu.Item key="食品列表">
                <NavLink to="/manage/foodList">食品列表</NavLink>
              </Menu.Item>
              <Menu.Item key="订单列表">
                <NavLink to="/manage/orderList">订单列表</NavLink>
              </Menu.Item>
              <Menu.Item key="管理员列表">
                <NavLink to="/manage/adminList">管理员列表</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="添加数据"
              title={
                <span>
                  <Icon type="plus" />
                  <span>添加数据</span>
                </span>
              }
            >
              <Menu.Item key="添加商铺">
                <NavLink to="/manage/addShop">添加商铺</NavLink>
              </Menu.Item>
              <Menu.Item key="添加商品">
                <NavLink to="/manage/addGood">添加商品</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="图表"
              title={
                <span>
                  <Icon type="pie-chart" theme="filled" />
                  <span>图表</span>
                </span>
              }
            >
              <Menu.Item key="用户分布">
                <NavLink to="/manage/visitor">用户分布</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="编辑"
              title={
                <span>
                  <Icon type="edit" theme="filled" />
                  <span>编辑</span>
                </span>
              }
            >
              <Menu.Item key="文本编辑">
                <NavLink to="/manage/edit">文本编辑</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="设置"
              title={
                <span>
                  <Icon type="setting" />
                  <span>设置</span>
                </span>
              }
            >
              <Menu.Item key="管理员设置">
                <NavLink to="/manage/adminSet">管理员设置</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="说明"
              title={
                <span>
                  <Icon type="exclamation-circle" theme="filled" />
                  <span>说明</span>
                </span>
              }
            >
              <Menu.Item key="说明">
                <NavLink to="/manage/explanation">说明</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className="header-container">
            <Breadcrumb className="breadcrumb">
              {this.state.breadcrumb.map((item, index) => {
                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
              })}
            </Breadcrumb>
            <div>
              <Avatar size="large" icon="user" className="avatar" />
            </div>
          </Header>
          <Content className="main-content">
            <Route path="/manage" exact component={Home}></Route>
            <Route
              path="/manage/explanation"
              exact
              component={Explanation}
            ></Route>
            <Route path="/manage/adminSet" exact component={AdminInfo}></Route>
            <Route path="/manage/edit" exact component={Edit}></Route>
            <Route path="/manage/visitor" exact component={Visitor}></Route>
            <Route path="/manage/addShop" exact component={AddShop}></Route>
            <Route path="/manage/addGood" exact component={AddGood}></Route>
            <Route path="/manage/adminList" exact component={AdminList}></Route>
            <Route path="/manage/orderList" exact component={OrderList}></Route>
            <Route path="/manage/userList" exact component={UserList}></Route>
            <Route path="/manage/foodList" exact component={FoodList}></Route>
            <Route path="/manage/shopList" exact component={ShopList}></Route>
          </Content>
        </Layout>
      </Layout>
    )
  }
  componentDidMount() {
    let keyName = this.props.location.pathname.split('/').pop()
    let newBreadcrumb = ['首页']
    let key = '首页'
    let openKey = ''
    if (keyName !== 'manage') {
      switch (keyName) {
        case 'userList':
          newBreadcrumb.push('数据管理', '用户列表')
          openKey = '数据管理'
          key = '用户列表'
          break
        case 'shopList':
          newBreadcrumb.push('数据管理', '商家列表')
          openKey = '数据管理'
          key = '商家列表'
          break
        case 'foodList':
          newBreadcrumb.push('数据管理', '食品列表')
          openKey = '数据管理'
          key = '食品列表'
          break
        case 'orderList':
          newBreadcrumb.push('数据管理', '订单列表')
          openKey = '数据管理'
          key = '订单列表'
          break
        case 'adminList':
          newBreadcrumb.push('数据管理', '管理员列表')
          openKey = '数据管理'
          key = '管理员列表'
          break
        case 'addShop':
          newBreadcrumb.push('添加数据', '添加商铺')
          openKey = '添加数据'
          key = '添加商铺'
          break
        case 'addGood':
          newBreadcrumb.push('添加数据', '添加商品')
          openKey = '添加数据'
          key = '添加商品'
          break
        case 'visitor':
          newBreadcrumb.push('图表', '用户分布')
          openKey = '图表'
          key = '用户分布'
          break
        case 'edit':
          newBreadcrumb.push('编辑', '文本编辑')
          openKey = '编辑'
          key = '文本编辑'
          break
        case 'adminSet':
          newBreadcrumb.push('设置', '管理员设置')
          openKey = '设置'
          key = '管理员设置'
          break
        case 'explanation':
          newBreadcrumb.push('说明', '说明')
          openKey = '说明'
          key = '说明'
          break
        default:
          break
      }
    }
    this.setState({
      breadcrumb: newBreadcrumb,
      clickKey: key,
      openKey
    })
  }
}
export default Manage
