import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, message } from 'antd'

//获取页面所需的请求方法
import { login } from '../../api/getData'
import './index.scss'

class NormalLoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 防抖 ，启动状态
        this.setState({
          loading: true
        })
        // 发送登录请求
        login({ user_name: values.username, password: values.password }).then(
          res => {
            //防抖 ， 关闭状态
            this.setState({
              loading: false
            })
            if (res.data.status === 1) {
              //将状态信息存入状态库
              this.props.toLogin(values)
              // 将信息存入本地存储
              window.sessionStorage.setItem('userInfo', JSON.stringify(values))
              //提示登录成功
              message.success(res.data.success)
              // 登录成功后跳转到首页
              this.props.history.replace('/manage')
            } else {
              message.error(res.data.message)
            }
          }
        )
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-page">
        <section>
          <div className="manage-tip">elm后台管理系统</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={this.state.loading}
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          <p>温馨提示</p>
          <p>未登录过的新用户，自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
        </section>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)

export default connect(
  null,
  dispatch => {
    return {
      toLogin(values) {
        dispatch({
          type: 'LOGIN_ADMIN',
          text: { username: values.username, password: values.password }
        })
      }
    }
  }
)(WrappedNormalLoginForm)
