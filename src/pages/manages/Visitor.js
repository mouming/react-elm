import React from 'react'
import echarts from 'echarts/lib/echarts'
import { Result } from 'antd'

import './Visitor.scss'
import { getUserCity } from '../../api/getData'

// 引入扇形图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class Visitor extends React.Component {
  constructor() {
    super()
    this.state = {
      showPie: true
    }
  }

  render() {
    return (
      <div className="visitor">
        {this.state.showPie ? (
          <div
            className="echart-pie"
            ref="echartPie"
            style={{ width: 664, height: 450 }}
          >
            {/* 用于挂载柱状图 */}
          </div>
        ) : (
          <Result
            status="error"
            title="获取信息失败"
            subTitle="请刷新重新获取信息"
          ></Result>
        )}
      </div>
    )
  }
  componentDidMount() {
    //获取用户分布信息
    getUserCity().then(res => {
      if (res.data.status === 1) {
        let userCityData = res.data.user_city
        //实例化柱状图
        let myChart = echarts.init(this.refs.echartPie)
        myChart.setOption({
          title: {
            text: '用户分布',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['北京', '上海', '深圳', '杭州', '其他']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: userCityData.beijing, name: '北京' },
                { value: userCityData.shanghai, name: '上海' },
                { value: userCityData.shenzhen, name: '深圳' },
                { value: userCityData.hangzhou, name: '杭州' },
                { value: userCityData.qita, name: '其他' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      } else {
        this.setState({
          showError: true
        })
      }
    })
  }
}
export default Visitor
