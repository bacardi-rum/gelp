import Message from '@components/Message'
import Uploader from '@components/Uploader'
import { FontWeights, NeutralColors, MotionAnimations, MotionDurations, Depths, PrimaryButton, DefaultButton, Stack, TextField, Text, MessageBarType, Toggle } from '@fluentui/react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { APPID } from '@laf/config'
import { createCourse, uploadCover } from '@redux/slices/courseSlice'
import { CSSProperties, FormEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCreateView = () => {
  const navigate = useNavigate()
  const identity = useAppSelector(state => state.user.identity)

  useEffect(() => {
    if (identity !== 1) { navigate('/course') }
  }, [identity])

  const dispatch = useAppDispatch()
  const [courseName, setCourseName] = useState('')
  const [courseContent, setCourseContent] = useState('')
  const [covers, setCovers] = useState<File[]>([])
  const [needPassword, setNeedPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [needPermission, setNeedPermission] = useState(false)

  const courses = useAppSelector(state => state.course.courses)
  const user_id = useAppSelector(state => state.user._id) as string
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
    const cover = covers[0]
    const key = `${user_id}_${courseName}_${cover.name}`,
      bucket = `${APPID}-public`

    Promise.resolve(null)
      .then(() => {
        return cover ?
          dispatch(uploadCover([
            key,
            cover,
            cover.type
          ])) :
          Promise.resolve(null)
      })
      .then(() => {
        return dispatch(createCourse({
          user_id,
          name: courseName,
          content: courseContent,
          coverUrl: `https://${bucket}.oss.laf.run/${key}`,
          needPassword,
          password,
          needPermission
        }))
      })
      .then(({ payload }) => {
        Message.show(payload.ok ? MessageBarType.success : MessageBarType.error, payload.ok ? '创建成功' : payload.error)
          .then(() => navigate('/course'))
      }).catch(() => {
        Message.show(MessageBarType.error, '创建失败')
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
          <DefaultButton text="取消" onClick={() => navigate('/log')} />
        </div>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item style={animationStyle}>
            <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>新建课程</Text>
            <Text variant="xLarge" style={subtitleStyle}>Create a Course</Text>
          </Stack.Item>
          <Stack.Item style={{ padding: '20px', backgroundColor: '#fff', ...animationStyle }}>
            <Stack tokens={{ childrenGap: 10 }}>
              <Stack.Item>
                <TextField label="课程名称" required name="name" value={courseName} onChange={(ev, newVal) => setCourseName(newVal as string)} />
              </Stack.Item>
              <Stack.Item>
                <TextField multiline label="课程简介" name="content" rows={8} autoAdjustHeight value={courseContent} onChange={(ev, newVal) => setCourseContent(newVal as string)} />
              </Stack.Item>
              <Stack.Item>
                <Stack horizontal tokens={{ childrenGap: 20 }}>
                  <Stack.Item>
                    <Toggle label="需要密码" checked={needPassword} onChange={(ev, checked) => setNeedPassword(checked as boolean)} />
                  </Stack.Item>
                  {needPassword && (
                    <Stack.Item grow={1}>
                      <TextField label="密码" required value={password} onChange={(ev, newVal) => setPassword(newVal as string)} type="password" canRevealPassword />
                    </Stack.Item>
                  )}
                </Stack>
              </Stack.Item>
              <Stack.Item>
                <Toggle label="需要申请" checked={needPermission} onChange={(ev, checked) => setNeedPermission(checked as boolean)} />
              </Stack.Item>
              <Stack.Item>
                <Uploader label="上传封面" accept="image/png,image/jpeg" tip='选择文件或拖动文件到此处' files={covers} onChange={setCovers} />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </section>
  )
}

export default CourseCreateView