import React, { useState, useCallback, ReactElement, CSSProperties, FormEvent } from 'react'
import ReactQuill from 'react-quill'
import { FontWeights, Stack, TextField, Text, NeutralColors, PrimaryButton, DefaultButton, Depths, SearchBox, MessageBarType, MotionAnimations, MotionDurations, IStyle } from '@fluentui/react'
import List from '@components/List'
import { useAppDispatch, useAppSelector } from '@hooks'
import CourseItem from '@components/CourseItem'
import Selection from '@components/Selection'
import TitledList from '@components/TitledList/TitledList'
import { useNavigate } from 'react-router-dom'
import { createLog } from '@redux/slices/logSlice'
import moment from 'moment'
import Message from '@components/Message'

const LogCreateView = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [courseName, setCourseName] = useState('')
  const [logName, setLogName] = useState('')

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

  const handleSelect = useCallback((checked: boolean, value: string) => {
    const newSelectedCourses = [...selectedCourses]
    if (checked) {
      newSelectedCourses.push(value)
    }
    else {
      const index = newSelectedCourses.findIndex(ass => ass === value)
      newSelectedCourses.splice(index, 1)
    }
    setSelectedCourses(newSelectedCourses)
  }, [selectedCourses])

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    dispatch(createLog({
      user_id,
      name: logName,
      content: value,
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      courses: selectedCourses
    })).then(() => {
      Message.show(MessageBarType.success, '创建成功。', 1000)
        .then(() => {
          navigate('/log')
        })
    }).catch(() => {
      Message.show(MessageBarType.error, '创建失败。')
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
            <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>新建日志</Text>
            <Text variant="xLarge" style={subtitleStyle}>Create a Log</Text>
          </Stack.Item>
          <Stack.Item style={{ padding: '20px', backgroundColor: '#fff', ...animationStyle }}>
            <TextField label="日志名称" required name="name" value={logName} onChange={(ev, newVal) => setLogName(newVal as string)} />
          </Stack.Item>
        </Stack>

        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: '40px' } }}>
          <Stack.Item>
            <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>日志内容</Text>
            <Text variant="xLarge" style={subtitleStyle}>Content of Log</Text>
          </Stack.Item>
          <Stack.Item style={{ backgroundColor: '#fff' }}>
            <ReactQuill theme="snow" value={value} onChange={setValue} preserveWhitespace />
          </Stack.Item>
        </Stack>

        <Stack>
          <Stack.Item className="gelp-course-list">
            <TitledList
              style={{ paddingTop: '0', marginLeft: '0' }}
              bodyStyle={{ padding: '20px' }}
              items={courses.filter(c => c.name.includes(courseName))}
              render={(item, index, key) => {
                return (
                  <Selection value={item._id ?? key} onSelect={(ev, checked) => handleSelect(checked as boolean, item._id ?? key)} key={key}>
                    {CourseItem(item, index, key) as ReactElement}
                  </Selection>
                )
              }}
              title="关联的课程"
              subtitle="Linked Courses"
              actions={(
                <SearchBox value={courseName} onChange={(ev, newVal) => setCourseName(newVal as string)} placeholder="搜索已加入课程" styles={{ root: { minWidth: '500px' } }} />
              )}
            />
          </Stack.Item>
        </Stack>
      </form>
    </section>
  )
}

export default LogCreateView