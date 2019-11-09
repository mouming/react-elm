import React from 'react'
import './Home.scss'
import  {allAdminCount,adminCount,allOrderCount,orderCount,allUserCount,userCount,} from '../../api/getData'
class Home
extends React.Component {
  constructor() {
    super()
    this.state = {

      allAdminCountdata:0,
      adminCountdata:0,
      allOrderCountdata:0,
      orderCountdata:0,
      allUserCountdata:0,
      userCountdata:0
    }
  }
    render() {
  return (
   
    <div>
      <h1>数据统计</h1>
      <div className='home1'>
  <span className="today" >当日数据</span>
  <span>{this.state.userCountdata.count}新增用户</span>
      <span>{this.state.orderCountdata.count}新增订单</span>
      <span>{this.state.adminCountdata.count}新增管理员</span>
      </div>
      <div className='home2'>
      <span className="zong">总数据:</span>
      <span>{this.state.allUserCountdata.count}注册用户</span>
      <span>{this.state.allOrderCountdata.count}订单</span>
      <span>{this.state.allAdminCountdata.count}管理员</span>
      </div>
    </div>
  )
}

  componentDidMount() {
    var myDate = new Date();
    allAdminCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()').then(res =>{
      this.setState(
        {
          allAdminCountdata:res.data     
        }
      )
   })
    adminCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()').then(res =>{
      this.setState(
        {
          adminCountdata:res.data     
        }
      )
   })
    allOrderCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()') .then(res =>{
      this.setState(
        {
          allOrderCountdata:res.data     
        }
      )
   })
    orderCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()').then(res =>{
      this.setState(
        {
          orderCountdata:res.data     
        }
      )
   })
    allUserCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()').then(res =>{
      this.setState(
        {
          allUserCountdata:res.data     
        }
      )
   })
    userCount('myDate.getFullYear()'-'myDate.getMonth()'-'myDate.getDate()').then(res =>{
      this.setState(
        {
          userCountdata:res.data     
        }
      )
   })
  }
}
export default Home
