import AttachmentItem from '@components/AttachmentItem'
import { useAppSelector } from '@hooks'
import {
  DetailsList,
  FontWeights,
  IColumn,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  SelectionMode,
  Stack,
  Text
} from '@fluentui/react'
import { CSSProperties, Dispatch, ReactElement, SetStateAction } from 'react'
import { Outlet, useParams } from 'react-router-dom'

type Item = {
  key: string,
  name: string,
  value: string
}
const AssignmentView = () => {
  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  const stackItemStyle: CSSProperties = {
    margin: '10px 0 0',
    padding: '20px',
    backgroundColor: 'white'
  }

  const columns: IColumn[] = [
    {
      key: 'state',
      minWidth: 0,
      maxWidth: 200,
      // flexGrow: 1,
      name: '状态',
      onRender(item: Item, index: number | undefined, column: IColumn | undefined): any {
        return <Text style={{ fontWeight: FontWeights.bold }}>{item.name}</Text>
      }
    },
    {
      key: 'state_value',
      minWidth: 0,
      // flexGrow: 3,
      name: '状态值',
      onRender(item: Item, index: number | undefined, column: IColumn | undefined): any {
        return <Text>{item.value}</Text>
      }
    }
  ]

  const items: Item[] = [
    {
      key: 'done_state',
      name: '完成状态',
      value: false ? '已完成' : '未完成'
    },
    {
      key: 'submit_state',
      name: '提交状态',
      value: '未提交'
    },
    {
      key: 'score_state',
      name: '评分状态',
      value: '未评分'
    },
    {
      key: 'remaining_time',
      name: '剩余时间',
      value: (+new Date()).toString()
    }
  ]

  const { _id } = useParams()
  const course = useAppSelector(state => {
    return state.course.courses.find(course => {
      return course.assignments.findIndex(assign => assign._id === _id) !== -1
    })
  })
  const detail = course?.assignments.find(assign => assign._id === _id)


  return (
    <section style={{ padding: '40px' }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>
            {detail?.name}
          </Text>
          <Text variant="xLarge" style={subtitleStyle}>
            {course?.name}
          </Text>
        </Stack.Item>
        <Stack.Item style={stackItemStyle}>
          <Text variant="mediumPlus">
            <div dangerouslySetInnerHTML={{
              __html: detail?.content as string
            }} style={{ marginBottom: '10px' }} />
          </Text>
          {/* 附件信息 */}
          {detail?.attachments.map(attachment => (
            <AttachmentItem {...attachment} key={attachment._id} />
          ))}
        </Stack.Item>
        <Stack.Item style={{ marginTop: '40px' }}>
          <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>
            任务状态
          </Text>
          <Text variant="large" style={subtitleStyle}>
            State
          </Text>
        </Stack.Item>
        <Stack.Item style={{ ...stackItemStyle, padding: 10 }}>
          <DetailsList items={items} columns={columns} isHeaderVisible={false} selectionMode={SelectionMode.none} />
        </Stack.Item>
        <Stack.Item>
          <Outlet context={[[], () => 1] as [AttachmentItem[], Dispatch<SetStateAction<AttachmentItem>[]>]} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default AssignmentView
