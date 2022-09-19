import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default {
  // 是否启用日志 默认启用
  debug: process.env.NODE_ENV === 'development',
  // 客户端连接信息
  stompClient: undefined,
  // 初始化
  init (callBack) {
    if (!this.stompClient) {
    const socket = new SockJS(process.env.VUE_APP_API_WEBSOCKET_PATH)
    this.stompClient = Stomp.over(socket)
    this.stompClient.hasDebug = this.debug
    this.stompClient.connect({}, suce => {
        this.console('连接成功,信息如下 ↓')
        this.console(this.stompClient)
        if (callBack) {
        callBack()
        }
    }, err => {
        if (err) {
        this.console('连接失败,信息如下 ↓')
        this.console(err)
        }
    })
    } else {
    if (callBack) {
        callBack()
        }
    }
  },
  // 订阅
  sub (address, callBack) {
    if (!this.stompClient.connected) {
      this.console('没有连接,无法订阅')
      return
    }
    // 生成 id
    const timestamp = new Date().getTime() + address
    this.console('订阅成功 -> ' + address)
    this.stompClient.subscribe(address, message => {
      this.console(address + ' 订阅消息通知,信息如下 ↓')
      this.console(message)
      const data = message.body
      callBack(data)
    }, {
      id: timestamp
    })
  },
  unSub (address) {
    if (!this.stompClient.connected) {
      this.console('没有连接,无法取消订阅 -> ' + address)
      return
    }
    let id = ''
    for (const item in this.stompClient.subscriptions) {
      if (item.endsWith(address)) {
        id = item
        break
      }
    }
    this.stompClient.unsubscribe(id)
    this.console('取消订阅成功 -> id:' + id + ' address:' + address)
  },
  // 断开连接
  disconnect (callBack) {
    if (!this.stompClient.connected) {
      this.console('没有连接,无法断开连接')
      return
    }
    this.stompClient.disconnect(() => {
      console.log('断开成功')
      if (callBack) {
        callBack()
      }
    })
  },
  // 单位 秒
  reconnect (time) {
    setInterval(() => {
      if (!this.stompClient.connected) {
        this.console('重新连接中...')
        this.init()
      }
    }, time * 1000)
  },
  console (msg) {
    if (this.debug) {
      console.log(msg)
    }
  }
}
