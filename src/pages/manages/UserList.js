import React from 'react'
import { Table } from 'antd'

// 获取组件所需api请求方法
import { userList, allUserCount } from '../../api/getData'

class UserList extends React.Component {
  constructor() {
    super()
    this.state = {
      userListInfo: [],
      total: 0
    }
    this.columns = [
      {
        title: () => <strong>#</strong>,
        dataIndex: 'key',
        align: 'center'
      },
      {
        title: () => <strong>注册日期</strong>,
        dataIndex: 'registe_time'
      },
      {
        title: () => <strong>用户姓名</strong>,
        dataIndex: 'username'
      },
      {
        title: () => <strong>注册地址</strong>,
        dataIndex: 'city'
      }
    ]
  }
  toSwitch = e => {
    userList({ limit: 10, offset: (e.current - 1) * 10 }).then(response => {
      let userListInfo = response.data.map((item, index) => {
        item.key = index + 1
        return item
      })
      this.setState({
        userListInfo
      })
    })
  }
  render() {

    return (
      <div className="admin-list" style={{ margin: 20 }}>
        <Table
          columns={this.columns}
          rowKey="id"
          dataSource={this.state.userListInfo}
          pagination={{
            defaultCurrent: 1,
            total: this.state.total,
            pageSize: 10,
            size: 'normal',
            style: { float: 'left' },
            showTotal: total => `共${total}条`
          }}
          onChange={this.toSwitch}
        />
      </div>
    )
  }
  componentDidMount() {
    let total = 0

    allUserCount().then(res => {
      if (res.data.status === 1) {
        total = res.data.count
        userList({ limit: 10 }).then(response => {
          // 对返回的数据数组添加key 属性
          let userListInfo = response.data.map((item, index) => {
            item.key = index + 1
            return item
          })
          this.setState({
            total,
            userListInfo
          })
        })
      }
    })
  }
}
export default UserList
