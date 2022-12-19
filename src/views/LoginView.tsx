import React, { FormEvent, useCallback, useState } from 'react'
import {
  ChoiceGroup,
  Depths,
  FontSizes,
  getTheme,
  IChoiceGroupOption,
  Icon,
  ITextFieldStyles,
  MessageBar,
  MessageBarType,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  PrimaryButton,
  Stack,
  TextField
} from '@fluentui/react'
import { loggedIn, login, register } from '@redux/slices/userSlice'
import { useAppDispatch } from '@hooks'
import { useNavigate } from 'react-router-dom'
import { getCoursesByUserId } from '@redux/slices/courseSlice'
import { getLogsByUserId } from '@redux/slices/logSlice'
import { getSchedulesByUserId } from '@redux/slices/scheduleSlice'
import { getAssignmentsByUserId } from '@redux/slices/assignmentSlice'
import Message from '@components/Message'

const theme = getTheme()
const LoginView: React.FC = () => {
  const [state, setState] = useState<'login' | 'register'>('login')
  const [selectedKey, setSelectedKey] = useState<0 | 1>(0)
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isMessageBarShow, setIsMessageBarShow] = useState(false)
  const [messageBarType, setMessageBarType] = useState<MessageBarType>(MessageBarType.error)
  const [messageBarContent, setMessageBarContent] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const textFieldStyle: Partial<ITextFieldStyles> = {
    root: {
      minWidth: '300px',
      marginBottom: '8px'
    }
  }

  const options: IChoiceGroupOption[] = [
    { key: 'student', text: '学生', iconProps: { iconName: 'Education' }, value: 0 },
    { key: 'teacher', text: '教师', iconProps: { iconName: 'Highlight' }, value: 1 }
  ]

  const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (state === 'register') {
      dispatch(register({
        name, nickname, password, identity: selectedKey
      })).then(({ payload }) => {
        Message.show(payload.ok ? MessageBarType.success : MessageBarType.error, payload.ok ? '注册成功，请登录。' : payload.error)
          .then(() => {
            if (payload.ok) {
              setState('login')
              setName('')
            }
          })
      })
    }
    if (state === 'login') {
      dispatch(login({
        nickname, password, identity: selectedKey
      })).then(({ payload }) => {
        Message.show(payload.ok ? MessageBarType.success : MessageBarType.error, payload.ok ? '登录成功。' : payload.error, 1000)
          .then(() => {
            if (payload.ok) {
              const data = payload.data
              dispatch(loggedIn({
                token: data.token,
                expire: data.expire,
                ...data.user
              }))
              dispatch(getCoursesByUserId(data.user._id))
              dispatch(getSchedulesByUserId(data.user._id))
              dispatch(getLogsByUserId(data.user._id))
              dispatch(getAssignmentsByUserId(data._id))
              navigate('/dashboard')
            }
          })
      })
    }
  }, [dispatch, name, nickname, password, selectedKey])

  return (
    <section style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: NeutralColors.gray20
    }}>
      <Stack style={{
        position: 'relative',
        padding: '30px 50px',
        backgroundColor: 'white',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        boxShadow: Depths.depth4,
        animation: MotionAnimations.slideUpIn,
        animationDuration: MotionDurations.duration4
      }}>
        {isMessageBarShow && (
          <MessageBar messageBarType={messageBarType}
            styles={{
              root: {
                position: 'absolute',
                top: 10,
                left: 10,
                right: 10,
                width: 'unset',
                animation: MotionAnimations.slideDownIn
              }
            }}
            onDismiss={() => setIsMessageBarShow(false)}>{messageBarContent}</MessageBar>
        )}
        <Stack.Item style={{ margin: '10px 0 15px' }}>
          <Icon iconName="CodeEdit" styles={{ root: { fontSize: FontSizes.size68 } }} />
          <strong style={{
            fontSize: FontSizes.size42,
            color: NeutralColors.gray180
          }}>GELP</strong>
        </Stack.Item>
        <Stack.Item>
          <form onSubmit={handleSubmit}>
            <TextField
              label="用户名"
              required
              name="nickname"
              styles={{ suffix: { padding: 0 }, ...textFieldStyle }}
              pattern="\w{6,16}"
              value={nickname}
              onChange={(event, newValue) => setNickname(newValue as string)}
            />
            {state === 'register' && (
              <TextField
                label="姓名"
                required
                name="name"
                styles={{ suffix: { padding: 0 }, ...textFieldStyle }}
                value={name}
                onChange={(event, newValue) => setName(newValue as string)}
              />
            )}
            <TextField
              label="密码"
              required
              canRevealPassword
              type="password"
              name="password"
              styles={textFieldStyle}
              pattern="(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$"
              value={password}
              onChange={(event, newValue) => setPassword(newValue as string)}
            />
            <ChoiceGroup
              label="我是"
              options={options}
              name="identity"
              selectedKey={selectedKey === 0 ? 'student' : 'teacher'}
              onChange={(ev, options) => setSelectedKey(options?.value as 0 | 1)}
            />
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              {state === 'login' ? (
                <span>还没有账号？
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setState('register')}>
                    去注册
                  </span>
                </span>
              ) : (
                <span>已经有账号？
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setState('login')}>
                    去登录
                  </span>
                </span>
              )}
            </div>

            <PrimaryButton
              type="submit"
              style={{ margin: '20px auto' }}
              text={state === 'login' ? '登录' : '注册'}
            />
          </form>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default LoginView
