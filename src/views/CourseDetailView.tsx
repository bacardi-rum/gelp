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
import TitledList from '@components/common/TitledList/TitledList'
import CourseItem from '@components/common/CourseItem'
import AssignmentItem from '@components/common/AssignmentItem'
import { CSSProperties, useState } from 'react'
import RankingItem from '@components/common/RankingItem'
import ControlledModal from '@components/common/ControlledModal'

const CourseDetailView = () => {
  const { _id } = useParams()
  const detail: CourseItem = {
    _id: _id as string,
    teacher_id: '222',
    assignments: [],
    content: new Array(30).fill('JavaScript高级程序设计').join(' '),
    cover: '',
    deleted: false,
    name: 'JavaScript高级程序设计',
    published: false
  }

  const assignments: AssignmentItem[] = [
    {
      _id: '3333',
      content: new Array(10).fill('JavaScript高级程序设计').join(' '),
      course_id: _id as string,
      deleted: false,
      endTime: new Date('2022-12-20'),
      name: '阅读第一章',
      published: false,
      score: 10,
      startTime: new Date('2022-12-10'),
      attachments: [
        {
          _id: '111sss',
          name: 'JavaScript高级程序设计电子书',
          iconName: 'Add',
          sizeRaw: 20000000,
          url: ''
        }
      ]
    }
  ]

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  // const [isForumModalOpen, setIsForumModalOpen] = useState(false)

  return (
    <section style={{ padding: 40 }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{detail.name}</Text>
          <Text variant="xLarge" style={subtitleStyle}>Professional JavaScript</Text>
        </Stack.Item>
        <Stack.Item style={{
          margin: '10px 0 0',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <Persona styles={{ root: { marginBottom: '10px' } }}
                   text={detail.teacher_id}
                   secondaryText={detail.teacher_id}
                   size={PersonaSize.size40}/>
          <Text variant="mediumPlus">{detail.content}</Text>
        </Stack.Item>
      </Stack>
      <Stack horizontal style={animationStyle}>
        <Stack.Item style={{ marginTop: '40px' }}>
          <NavLink state={detail} to={`/course/forum/${_id}`} style={{ textDecoration: 'none' }}>
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
        <Stack.Item style={{ margin: 0, marginRight: '20px' }} grow={5}
                    styles={{ root: { maxWidth: '75%', minWidth: '75%' } }}>
          <TitledList items={assignments} render={AssignmentItem} title="任务" subtitle="Assignments"
                      style={{ margin: '0px' }}
                      actions={(
                        <SearchBox placeholder="搜索所有任务" styles={{ root: { minWidth: '300px' } }}/>
                      )}/>
        </Stack.Item>
        <Stack.Item style={{ margin: 0 }} grow={1}>
          <TitledList items={new Array<Student | {}>(10).fill({})
            .map((v) => {
              return {
                _id: '124342353',
                email: 'sss',
                level: 4,
                name: (Math.random() * 1000).toString(),
                phone: '16601267108',
                score: Math.floor(Math.random() * 100 + 1)
              }
            })} render={RankingItem} title="排行榜" subtitle="Ranking"
                      style={{ margin: '0px' }}/>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseDetailView
