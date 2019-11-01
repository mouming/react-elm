import React, { Component } from 'react'
import E from 'wangeditor'
import { Button } from 'antd'

import './Edit.scss'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: ''
    }
  }
  componentDidMount() {
    const elemMenu = this.refs.editMenu
    const elemBody = this.refs.editBody
    const editor = new E(elemMenu, elemBody)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      console.log(editor.txt.html())
      this.setState({
        // editorContent: editor.txt.text()
        editorContent: editor.txt.html()
      })
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
  }
  render() {
    return (
      <div className="edit">
        <div className="text-area">
          <div ref="editMenu" className="editMenu"></div>
          <div ref="editBody" className="editBody"></div>
        </div>
        <div className="submit-text">
          <Button type="primary">提交</Button>
        </div>
      </div>
    )
  }
}
export default Edit