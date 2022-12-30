import Message from '@components/Message'
import Uploader from '@components/Uploader'
import { medals } from '@config/medal'
import { FontWeights, NeutralColors, MotionAnimations, MotionDurations, Depths, PrimaryButton, DefaultButton, Stack, TextField, Text, MessageBarType, Toggle, ChoiceGroup } from '@fluentui/react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { APPID } from '@laf/config'
import { createCourse, createMedal, uploadCover } from '@redux/slices/courseSlice'
import { CSSProperties, FormEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const MedalCreateView = () => {
  const navigate = useNavigate()
  const { _id } = useParams()
  const courseName = useAppSelector(state => state.course.courses.find(c => c._id === _id)?.name)
  const identity = useAppSelector(state => state.user.identity)

  useEffect(() => {
    if (identity !== 1) { navigate('/course') }
  }, [identity])

  const dispatch = useAppDispatch()
  const [medalName, setMedalName] = useState('')
  const [medalContent, setMedalContent] = useState('')
  const [score, setScore] = useState(1)
  const [iconKey, setIconKey] = useState(medals[0])

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    dispatch(createMedal({
      name: medalName,
      content: medalContent,
      score,
      iconName: iconKey,
      course_id: _id as string
    }))
      .then(() => {
        Message.show(MessageBarType.success, '创建成功。').then(() => navigate(`/course/detail/${_id}`))
      })
      .catch(() => {
        Message.show(MessageBarType.success, '创建失败。')
      })
  }

  return (
    <section style={{ padding: '40px 40px 80px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          padding: '10px 0',
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#fff',
          boxShadow: Depths.depth8,
          zIndex: 999,
          ...animationStyle
        }}>
          <PrimaryButton text="提交" type="submit" styles={{ root: { marginRight: '10px' } }} />
          <DefaultButton text="取消" onClick={() => navigate(`/course/detail/${_id}`)} />
        </div>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item style={animationStyle}>
            <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>新建勋章</Text>
            <Text variant="xLarge" style={subtitleStyle}>{courseName}</Text>
          </Stack.Item>
          <Stack.Item style={{ padding: '20px', backgroundColor: '#fff', ...animationStyle }}>
            <Stack tokens={{ childrenGap: 10 }}>
              <Stack.Item>
                <TextField label="勋章名称" required name="name" value={medalName} onChange={(ev, newVal) => setMedalName(newVal as string)} maxLength={6}/>
              </Stack.Item>
              <Stack.Item>
                <TextField multiline label="勋章简介" name="content" rows={8} autoAdjustHeight value={medalContent} onChange={(ev, newVal) => setMedalContent(newVal as string)} />
              </Stack.Item>
              <Stack.Item>
                <TextField label="需要的分值" required name="score" type="number" min={1} value={score.toString()} onChange={(ev, newVal) => setScore(Number(newVal))} />
              </Stack.Item>
              <Stack.Item>
                <ChoiceGroup label="选择勋章图标" required
                  name="medal"
                  options={medals.map(medal => ({
                    key: medal,
                    text: medal,
                    value: medal,
                    iconProps: { iconName: medal }
                  }))}
                  selectedKey={iconKey}
                  onChange={(ev, options) => setIconKey(options?.value as string)}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </section>
  )
}

export default MedalCreateView