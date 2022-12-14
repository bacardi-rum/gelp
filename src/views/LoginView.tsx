import React, { useState } from 'react'
import {
  FontSizes,
  Icon,
  IRenderFunction,
  ITextFieldProps, ITextFieldStyles,
  Stack,
  PrimaryButton,
  TextField, NeutralColors, IChoiceGroupOption, ChoiceGroup, getTheme, Depths, MotionAnimations, MotionDurations
} from '@fluentui/react'

const theme = getTheme()
const LoginView: React.FC = () => {
  const [isSendDisabled, setIsSendDisabled] = useState(false)

  const renderSuffix: IRenderFunction<ITextFieldProps> = (props) => {
    const handleClick = () => {
      setIsSendDisabled(true)
      setTimeout(() => {
        setIsSendDisabled(false)
      }, 60000)
    }
    return (
      <PrimaryButton styles={{ root: { margin: 0 } }} onClick={handleClick} disabled={isSendDisabled}>
        {isSendDisabled ? '一分钟后重试' : '发送验证码'}
      </PrimaryButton>
    )
  }

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
        padding: '30px 50px',
        backgroundColor: 'white',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        boxShadow: Depths.depth4,
        animation: MotionAnimations.slideUpIn,
        animationDuration: MotionDurations.duration4
      }}>
        <Stack.Item style={{ margin: '10px 0 15px' }}>
          <Icon iconName="CodeEdit" styles={{ root: { fontSize: FontSizes.size68 } }}/>
          <strong style={{
            fontSize: FontSizes.size42,
            color: NeutralColors.gray180
          }}>GELP</strong>
        </Stack.Item>
        <Stack.Item>
          <form action="" method="POST">
            <TextField label="手机号" required name="phone" onRenderSuffix={renderSuffix}
                       styles={{ suffix: { padding: 0 }, ...textFieldStyle }} pattern="\d{11}"/>
            <TextField label="验证码" required name="captcha" styles={textFieldStyle} pattern="\d{6}"/>
            <ChoiceGroup label="我是" options={options} defaultSelectedKey="student" name="identity"/>
            <PrimaryButton type="submit" style={{ margin: '20px auto' }}>登录</PrimaryButton>
          </form>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default LoginView
