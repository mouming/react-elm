import React, { Component } from 'react'
import { Layout, Breadcrumb, Avatar, Menu, Icon } from 'antd'
import { Route } from 'react-router-dom'

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

import './index.scss'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class Manage extends Component {
  handleClick = e => {
    console.log('click ', e)
  }
  render() {
    return (
      <Layout className="manage">
        <Sider className="sider-bar">
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['0']}
            defaultOpenKeys={[]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="0">
              <Icon type="appstore" theme="filled" />
              首页
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="file" />
                  <span>数据管理</span>
                </span>
              }
            >
              <Menu.Item key="1">用户列表</Menu.Item>
              <Menu.Item key="2">商家列表</Menu.Item>
              <Menu.Item key="3">食品列表</Menu.Item>
              <Menu.Item key="4">订单列表</Menu.Item>
              <Menu.Item key="5">管理员列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="plus" />
                  <span>添加数据</span>
                </span>
              }
            >
              <Menu.Item key="6">添加商铺</Menu.Item>
              <Menu.Item key="7">添加商品</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="pie-chart" theme="filled" />
                  <span>图表</span>
                </span>
              }
            >
              <Menu.Item key="8">用户分布</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="edit" theme="filled" />
                  <span>编辑</span>
                </span>
              }
            >
              <Menu.Item key="9">文本编辑</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="setting" />
                  <span>设置</span>
                </span>
              }
            >
              <Menu.Item key="10">管理员设置</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="exclamation-circle" theme="filled" />
                  <span>说明</span>
                </span>
              }
            >
              <Menu.Item key="11">说明</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header-container">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="#/manage">Application Center</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
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
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default Manage
