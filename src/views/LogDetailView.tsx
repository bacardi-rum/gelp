import React, { CSSProperties } from 'react'
import { Stack, Text, FontWeights, NeutralColors, MotionAnimations, MotionDurations } from '@fluentui/react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@hooks'
import TitledList from '@components/TitledList/TitledList'
import ScheduleItem from '@components/ScheduleItem'
import CourseItem from '@components/CourseItem'
import ReactQuill from 'react-quill'

const LogDetailView = () => {
  const { _id } = useParams()
  const log = useAppSelector(state => state.log.logs.find(log => log._id === _id))

  const subtitleStyle: CSSProperties = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  return (
    <section style={{ padding: '40px' }}>
      <Stack>
        <Stack.Item style={animationStyle}>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{log?.name}</Text>
          <Text variant="xLarge" style={subtitleStyle}>修改日期: {log?.date}</Text>
        </Stack.Item>
        <Stack.Item styles={{ root: { backgroundColor: '#fff' } }} style={animationStyle}>
          {/* <Text variant="mediumPlus">
            <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(log?.content as string) }} />
          </Text> */}
          <ReactQuill theme="snow" value={log?.content} preserveWhitespace readOnly />
        </Stack.Item>
        <Stack.Item className="gelp-course-list">
          <TitledList style={{ paddingTop: '0', marginLeft: '0' }} bodyStyle={{ padding: '20px' }} items={log?.courses as CourseItem[]} render={CourseItem} title="关联的课程" subtitle="Linked Courses" />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default LogDetailView