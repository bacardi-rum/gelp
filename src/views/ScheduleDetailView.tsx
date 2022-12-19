import { useParams } from 'react-router-dom'
import { FontWeights, MotionAnimations, MotionDurations, NeutralColors, Persona, PersonaSize, SearchBox, Stack, Text } from '@fluentui/react'
import React, { CSSProperties, useMemo, useState } from 'react'
import TitledList from '@components/TitledList/TitledList'
import AssignmentItem from '@components/AssignmentItem'
import { useAppSelector } from '@hooks'

const ScheduleDetailView = () => {
  const { _id } = useParams()
  const schedule = useAppSelector(state => state.schedule.schedules.find(s => s._id === _id))
  const [assignmentName, setAssignmentName] = useState('')

  const subtitleStyle: CSSProperties = useMemo(() => {
    return {
      fontWeight: FontWeights.regular,
      color: NeutralColors.gray120,
      marginLeft: '10px'
    }
  }, [])

  const animationStyle = useMemo(() => {
    return {
      animation: MotionAnimations.slideUpIn,
      animationDuration: MotionDurations.duration4
    }
  }, [])

  const decode = function (str: string) {
    if (str.startsWith('\n')) str = str.substring(1)
    return str.replaceAll(/\n/g, '<br>')
  }

  return (
    <section style={{ padding: '40px' }}>
      <Stack>
        <Stack.Item style={animationStyle}>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{schedule?.name}</Text>
          {/* <Text variant="xLarge" style={subtitleStyle}>Professional JavaScript</Text> */}
        </Stack.Item>
        <Stack.Item style={{
          margin: '10px 0 0',
          padding: '20px',
          backgroundColor: 'white',
          ...animationStyle
        }}>
          <Text variant="mediumPlus">
            <div dangerouslySetInnerHTML={{ __html: decode(schedule?.content as string) }} />
          </Text>
        </Stack.Item>
        <Stack.Item style={{ margin: 0, marginRight: '20px' }} grow={5}>
          <TitledList items={schedule?.assignments?.filter(ass => ass.name.includes(assignmentName))!} render={AssignmentItem} title="任务" subtitle="Assignments"
            style={{ margin: '0px' }}
            actions={(
              <SearchBox placeholder="搜索所有任务" styles={{ root: { minWidth: '400px' } }} value={assignmentName} onChange={(ev, newVal) => setAssignmentName(newVal as string)} />
            )} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default ScheduleDetailView
