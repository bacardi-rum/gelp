import AssignmentItem from '@components/AssignmentItem'
import TitledList from '@components/TitledList/TitledList'
import { mergeStyleSets, Stack, Text } from '@fluentui/react'
import { useAppSelector } from '@hooks'
import { RootState } from '@redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JudgementView = () => {
  const courses = useAppSelector(state => state.course.courses)

  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState(0)

  const CourseItem = (item: RootState['course']['courses'][number], index: number, key?: string) => {
    const style = mergeStyleSets({
      body: {
        position: 'relative',
        padding: 16,
        border: index === selectedCourse ? '2px solid #c8c6c4' : '1px solid #edebe9',
        '&:hover': {
          borderColor: '#c8c6c4',
          cursor: 'pointer',
          '&::after': index === selectedCourse ? {} : {
            content: "",
            position: 'absolute',
            inset: 0,
            border: '1px solid #c8c6c4'
          }
        }
      }
    })

    return (
      <div className={style.body} onClick={() => setSelectedCourse(index)}>
        <Text variant="large">{item.name}</Text>
      </div>
    )
  }

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack horizontal>
        <Stack.Item>
          <TitledList title="我的课程" subtitle="My Courses" items={courses} render={CourseItem} />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TitledList title="课程下的任务" subtitle="Assignments" items={courses[selectedCourse]?.assignments ?? []} render={AssignmentItem} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default JudgementView