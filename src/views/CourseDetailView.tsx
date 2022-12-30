import {
  CompoundButton,
  Depths,
  FontWeights, getTheme, List, MessageBarType, Modal,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  Persona,
  PersonaSize, PrimaryButton, SearchBox,
  Stack,
  TeachingBubble,
  Text, TextField
} from '@fluentui/react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import TitledList from '@components/TitledList/TitledList'
import AssignmentItem from '@components/AssignmentItem'
import { CSSProperties, FormEventHandler, useEffect, useId, useRef, useState } from 'react'
import RankingItem from '@components/RankingItem'
import { useAppDispatch, useAppSelector } from '@hooks'
import { getCourseById, requestCourse } from '@redux/slices/courseSlice'
import Message from '@components/Message'
import TitledCard from '@components/TitledCard'
import MedalItem from '@components/MetalItem'


const CourseDetailView = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { _id } = useParams()
  const user_id = useAppSelector(state => state.user._id) as string
  const course = useAppSelector(state => state.course.courses.find(course => course._id === _id))
  const cachedCourse = useAppSelector(state => state.course.cache[_id ?? ''])
  const identity = useAppSelector(state => state.user.identity)

  useEffect(() => {
    if (!course && !cachedCourse) {
      dispatch(getCourseById(_id as string))
    }
  }, [course, cachedCourse])

  const [assignmentName, setAssignmentName] = useState('')
  const [teachingBubbleVisible, setTeachingBubbleVisible] = useState(false)
  const [password, setPassword] = useState('')

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  const handleRequest: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    dispatch(requestCourse({ user_id, course_id: _id as string, password }))
      .then(({ payload }) => {
        Message.show(payload.ok ? MessageBarType.success : MessageBarType.error, payload.ok ? (cachedCourse.needPermission ? '申请成功，请等待教师通过。' : '加入成功。') : payload.error)
          .then(() => {
            payload.ok && window.location.reload()
          })
      })
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
        <Stack.Item>
          <TitledCard title="勋章墙" subtitle="Medals"
            // indicator
            style={{ marginLeft: 0 }}
            bodyStyle={{ height: '130px', minHeight: 'initial' }}
            actions={identity === 1 ? (
              <PrimaryButton onClick={() => navigate(`/course/create-medal/${_id}`)}>新建勋章</PrimaryButton>
            ) : undefined} >
            {course?.medals?.map(medal => (
              <MedalItem name={medal.name} iconName={medal.iconName} score={medal.score} content={medal.content as string} />
            ))}
          </TitledCard>
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
                <div style={{ display: 'flex', gap: 20 }}>
                  {identity === 1 && <PrimaryButton onClick={() => navigate(`/course/assignment/create/${_id}`)}>新建任务</PrimaryButton>}
                  <SearchBox value={assignmentName} onChange={(ev, newVal) => setAssignmentName(newVal as string)} placeholder="搜索所有任务" styles={{ root: { minWidth: '400px' } }} />
                </div>
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
            <form onSubmit={handleRequest} id="gelp-request-course-form">
              <TeachingBubble
                target="#request-to-join-text"
                primaryButtonProps={{
                  children: '确定',
                  type: 'submit',
                  form: 'gelp-request-course-form'
                }}
                secondaryButtonProps={{
                  children: '取消',
                  onClick() { setTeachingBubbleVisible(false) }
                }}
                onDismiss={() => setTeachingBubbleVisible(false)}
                headline="确定要加入该课程？"
              >
                <Text styles={{ root: { color: '#fff' } }}>{cachedCourse.name}, {cachedCourse.user.name}</Text>
                {cachedCourse.needPassword && (
                  <TextField styles={{ description: { color: '#fff' } }}
                    name="password"
                    label="密码"
                    type="password"
                    canRevealPassword
                    required
                    placeholder="申请该课程需要密码"
                    form='gelp-request-course-form'
                    value={password}
                    onChange={(ev, newVal) => setPassword(newVal as string)}
                  />
                )}
              </TeachingBubble>
            </form>
          )}
        </div>
      )}
    </section>
  )
}

export default CourseDetailView
