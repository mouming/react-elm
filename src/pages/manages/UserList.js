import React from 'react'
import { Table } from 'antd'

class UserList extends React.Component {
  constructor() {
    super()
    this.state = {
      userListInfo: [
        {
          key: 1,
          createDate: '2019-2-12',
          username: '张三',
          createAddress: '深圳'
        },
        {
          key: 2,
          createDate: '2019-2-12',
          username: '张三',
          createAddress: '深圳'
        }
      ]
    }
    this.columns = [
      {
        title: () => <strong>#</strong>,
        dataIndex: 'key',
        align: 'center'
      },
      {
        title: () => <strong>注册日期</strong>,
        dataIndex: 'createDate'
      },
      {
        title: () => <strong>用户姓名</strong>,
        dataIndex: 'username'
      },
      {
        title: () => <strong>注册地址</strong>,
        dataIndex: 'createAddress'
      }
    ]
  }
  render() {
    return (
      <div className="admin-list" style={{ margin: 20 }}>
        <Table
          columns={this.columns}
          dataSource={this.state.userListInfo}
          pagination={{
            defaultCurrent: 1,
            total: 100,
            pageSize: 10,
            size: 'normal',
            style: { float: 'left' },
            showTotal: total => `共${total}条`
          }}
        />
      </div>
    )
  }
}
export default UserList
