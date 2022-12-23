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
  TeachingBubble,
  Text, TextField
} from '@fluentui/react'
import { NavLink, useParams } from 'react-router-dom'
import TitledList from '@components/TitledList/TitledList'
import AssignmentItem from '@components/AssignmentItem'
import { CSSProperties, useEffect, useId, useState } from 'react'
import RankingItem from '@components/RankingItem'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getCourseById } from '@redux/slices/courseSlice'


const CourseDetailView = () => {
  const dispatch = useAppDispatch()

  const { _id } = useParams()
  const course = useAppSelector(state => state.course.courses.find(course => course._id === _id))
  const cachedCourse = useAppSelector(state => state.course.cache[_id ?? ''])

  useEffect(() => {
    if (!course && !cachedCourse) {
      dispatch(getCourseById(_id as string))
    }
  }, [])

  const [assignmentName, setAssignmentName] = useState('')
  const [teachingBubbleVisible, setTeachingBubbleVisible] = useState(false)

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
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{course?.name ?? cachedCourse?.name}</Text>
          {/* <Text variant="xLarge" style={subtitleStyle}>Professional JavaScript</Text> */}
        </Stack.Item>
        <Stack.Item style={{
          margin: '10px 0 0',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <Persona styles={{ root: { marginBottom: '10px' } }}
            text={course?.user.name ?? cachedCourse?.user.name}
            secondaryText={course?.user.nickname ?? cachedCourse?.user.nickname}
            size={PersonaSize.size40} />
          <Text variant="mediumPlus">{course?.content ?? cachedCourse?.content}</Text>
        </Stack.Item>
      </Stack>
      {course && (<>
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
      </>)}
      {!course && (
        <div style={{ marginTop: '40px' }}>
          <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>加入后查看详情</Text>
          <Text variant="xxLarge" style={{
            marginLeft: 10,
            fontWeight: FontWeights.regular,
            borderBottom: `2px solid ${getTheme().palette.themePrimary}`,
            cursor: 'pointer'
          }} id="request-to-join-text" onClick={() => setTeachingBubbleVisible(true)}>申请加入</Text>
          {teachingBubbleVisible && (
            <TeachingBubble
              target="#request-to-join-text"
              primaryButtonProps={{
                children: '确定',
                onClick() { }
              }}
              secondaryButtonProps={{
                children: '取消',
                onClick() { }
              }}
              onDismiss={() => setTeachingBubbleVisible(false)}
              headline="确定要加入该课程？"
            >
              {cachedCourse.name}, {cachedCourse.user.name}
            </TeachingBubble>
          )}
        </div>
      )}
    </section>
  )
}

export default CourseDetailView
