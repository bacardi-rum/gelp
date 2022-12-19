import { MessageBar, MessageBarType, MotionAnimations } from '@fluentui/react'
import ReactDOM from 'react-dom/client'

type Props = {
  type: MessageBarType,
  msg: string
}

class Message {
  private static _messageBar = (props: Props) => {
    return (
      <MessageBar messageBarType={props.type} styles={{
        root: {
          animation: MotionAnimations.slideDownIn
        },
        content: {
          justifyContent: 'center'
        },
        text: {
          flexGrow: 0
        }
      }}>{props.msg}</MessageBar>
    )
  }

  private static _container = (function () {
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '0'
    container.style.right = '0'
    container.style.top = '55px'
    return container
  })()

  private static _root = ReactDOM.createRoot(Message._container)

  private static _body = document.querySelector('html > body') as HTMLBodyElement

  public static show(type: MessageBarType, msg: string, duration = 1500) {
    Message._body.appendChild(Message._container)
    Message._root.render(Message._messageBar({
      type,
      msg
    }))
    return new Promise(resolve => {
      setTimeout(() => {
        Message._body.removeChild(Message._container)
        resolve(true)
      }, duration)
    })
  }
}

export default Message