import React from 'react'
import { Table } from 'antd'

import { getAdminList, allAdminCount } from '../../api/getData'

class AdminList extends React.Component {
  constructor() {
    super()
    this.state = {
      adminListInfo: [],
      total: 0
    }
    this.columns = [
      {
        title: () => <strong>姓名</strong>,
        dataIndex: 'user_name',
        align: 'center',
        ellipsis: true
      },
      {
        title: () => <strong>注册日期</strong>,
        dataIndex: 'create_time',
        align: 'center'
      },
      {
        title: () => <strong>地址</strong>,
        dataIndex: 'city',
        align: 'center'
      },
      {
        title: () => <strong>权限</strong>,
        dataIndex: 'admin',
        align: 'center'
      }
    ]
  }
  toSwitch = e => {
    getAdminList({ limit: 10, offset: (e.current - 1) * 10 }).then(res => {
      if (res.data.status === 1) {
        this.setState({
          adminListInfo: res.data.data
        })
      }
    })
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
    allAdminCount()
      .then(res => {
        if (res.data.status === 1) {
          // 获取管理员的数量
          total = res.data.count
          // 获取管理员列表数据
          return getAdminList({ limit: 10 })
        }
      })
      .then(res => {
        if (res.data.status === 1) {
          this.setState({
            total,
            adminListInfo: res.data.data
          })
        }
      })
  }
}
export default AdminList
