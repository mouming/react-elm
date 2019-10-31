import React from 'react'
import echarts from 'echarts/lib/echarts'

import './Visitor.scss'

// 引入扇形图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class Visitor extends React.Component {
  render() {
    return (
      <div className="visitor">
        <div
          className="echart-pie"
          ref="echartPie"
          style={{ width: 664, height: 450 }}
        >
          {/* 用于挂载柱状图 */}
        </div>
      </div>
    )
  }
  componentDidMount() {
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
            { value: 1324, name: '北京' },
            { value: 1243, name: '上海' },
            { value: 6534, name: '深圳' },
            { value: 2412, name: '杭州' },
            { value: 12355, name: '其他' }
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
  }
}
export default Visitor
