import {
  CompoundButton,
  Depths,
  FontWeights, getTheme, List, Modal,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  Persona,
  PersonaSize, PrimaryButton, SearchBox,
  Stack,
  Text, TextField
} from '@fluentui/react'
import { NavLink, useParams } from 'react-router-dom'
import TitledList from '@components/TitledList/TitledList'
import CourseItem from '@components/CourseItem'
import AssignmentItem from '@components/AssignmentItem'
import { CSSProperties, useEffect, useState } from 'react'
import RankingItem from '@components/RankingItem'
import ControlledModal from '@components/ControlledModal'
import { useAppDispatch, useAppSelector } from '@hooks'


const CourseDetailView = () => {
  const dispatch = useAppDispatch()

  const { _id } = useParams()
  const course = useAppSelector(state => state.course.courses.find(course => course._id === _id))
  const [assignmentName, setAssignmentName] = useState('')

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  return (
    <section style={{ padding: 40 }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{course?.name}</Text>
          {/* <Text variant="xLarge" style={subtitleStyle}>Professional JavaScript</Text> */}
        </Stack.Item>
        <Stack.Item style={{
          margin: '10px 0 0',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <Persona styles={{ root: { marginBottom: '10px' } }}
            text={course?.user.name}
            secondaryText={course?.user.nickname}
            size={PersonaSize.size40} />
          <Text variant="mediumPlus">{course?.content}</Text>
        </Stack.Item>
      </Stack>
      <Stack horizontal style={animationStyle}>
        <Stack.Item style={{ marginTop: '40px' }}>
          <NavLink state={course} to={`/course/forum/${_id}`} style={{ textDecoration: 'none' }}>
            <Text variant="xxLarge" style={{
              fontWeight: FontWeights.regular,
              borderBottom: `2px solid ${getTheme().palette.themePrimary}`,
              cursor: 'pointer'
            }}>讨论区</Text>
          </NavLink>
          <Text variant="large" style={subtitleStyle}>Forum</Text>
        </Stack.Item>
      </Stack>
      <Stack horizontal>
        <Stack.Item style={{ margin: 0, marginRight: '20px' }} grow={5}>
          <TitledList items={course?.assignments.filter(assign => assign.name.includes(assignmentName)) as any[]} render={AssignmentItem} title="任务" subtitle="Assignments"
            style={{ margin: '0px' }}
            actions={(
              <SearchBox value={assignmentName} onChange={(ev, newVal) => setAssignmentName(newVal as string)} placeholder="搜索所有任务" styles={{ root: { minWidth: '400px' } }} />
            )} />
        </Stack.Item>
        <Stack.Item style={{ margin: 0 }} grow={1}>
          <TitledList items={course?.rankings!} render={RankingItem} title="排行榜" subtitle="Ranking"
            style={{ margin: '0px' }} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseDetailView
