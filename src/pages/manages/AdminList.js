import React from 'react'
import { Table } from 'antd'

class AdminList extends React.Component {
  constructor() {
    super()
    this.state = {
      adminListInfo: [
        {
          id: 1,
          name: '张三',
          createDate: '2019-2-12',
          address: '深圳',
          admin: '管理员'
        },
        {
          id: 2,
          name: '张三',
          createDate: '2019-2-12',
          address: '深圳',
          admin: '管理员'
        }
      ]
    }
    this.columns = [
      {
        title: () => <strong>姓名</strong>,
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: () => <strong>注册日期</strong>,
        dataIndex: 'createDate',
        align: 'center'
      },
      {
        title: () => <strong>地址</strong>,
        dataIndex: 'address',
        align: 'center'
      },
      {
        title: () => <strong>权限</strong>,
        dataIndex: 'admin',
        align: 'center'
      }
    ]
  }
  render() {
    return (
      <div className="admin-list" style={{ margin: 20 }}>
        <Table
          columns={this.columns}
          dataSource={this.state.adminListInfo}
          rowKey="id"
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
export default AdminList
