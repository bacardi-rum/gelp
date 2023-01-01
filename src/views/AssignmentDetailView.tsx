import AttachmentItem from '@components/AttachmentItem'
import { useAppDispatch, useAppSelector } from '@hooks'
import {
  DefaultButton,
  DetailsList,
  FontWeights,
  IColumn,
  MessageBarType,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  PrimaryButton,
  SelectionMode,
  Stack,
  Text
} from '@fluentui/react'
import { CSSProperties, Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Uploader from '@components/Uploader'
import TitledCard from '@components/TitledCard'
import cloud from '@laf'
import { uploadAttachments, uploadSubmissions } from '@redux/slices/assignmentSlice'
import { submissionsUploaded } from '@redux/slices/courseSlice'
import Message from '@components/Message'

type Item = {
  key: string,
  name: string,
  value: string
}
const AssignmentDetailView = () => {
  const { _id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const course = useAppSelector(state => {
    return state.course.courses.find(course => {
      return course.assignments.findIndex(assign => assign._id === _id) !== -1
    })
  })
  const user = useAppSelector(state => state.user)
  const judgement = useAppSelector(state => state.judgement.judgements[course?._id as string]?.[_id as string])

  const detail = course?.assignments.find(assign => assign._id === _id)

  const getFileKey = (url: string) => {
    const splits = url.split('/')
    return splits[splits.length - 1]
  }

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
      name: '状态',
      onRender(item: Item, index: number | undefined, column: IColumn | undefined): any {
        return <Text style={{ fontWeight: FontWeights.bold }}>{item.name}</Text>
      }
    },
    {
      key: 'state_value',
      minWidth: 0,
      name: '状态值',
      onRender(item: Item, index: number | undefined, column: IColumn | undefined): any {
        return <Text>{item.value}</Text>
      }
    }
  ]

  const items: Item[] = user.identity === 0 ? [
    {
      key: 'done_state',
      name: '完成状态',
      value: detail?.state === 2 ? '已完成' : (detail?.state === 3 ? '过期未提交' : '未完成')
    },
    {
      key: 'submit_state',
      name: '提交状态',
      value: (detail?.state === 1 || detail?.state === 2) ? '已提交' : '未提交'
    },
    {
      key: 'score_state',
      name: '评分状态',
      value: detail?.state === 2 ? `${detail.scored}分` : '未评分'
    },
    {
      key: 'remaining_time',
      name: '剩余时间',
      value: moment(detail?.endTime).fromNow(true)
    }
  ] : []

  const teacherItems: Item[] = user.identity === 1 ? [
    {
      key: 'total',
      name: '总人数',
      value: (judgement.submitted.length + judgement.unsubmitted).toString()
    },
    {
      key: 'submitted',
      name: '已提交人数',
      value: judgement.submitted.length.toString()
    },
    {
      key: 'unsubmitted',
      name: '未提交人数',
      value: judgement.unsubmitted.toString()
    },
    {
      key: 'remaining_time',
      name: '剩余时间',
      value: moment(detail?.endTime).fromNow(true)
    }
  ] : []

  const [submissions, setSubmissions] = useState<File[]>([])
  const [uploaderDisabled, setUploaderDisabled] = useState(true)

  useEffect(() => {
    if (detail && detail.state !== 2) {
      const files = detail?.submissions.map(submission => {
        return fetch(submission.url)
          .then(res => Promise.all([res.blob(), res.headers.get('content-type')]))
          .then(([blob, type]) => {
            return new File([blob], submission.name, { type: type as string })
          })
      })
      Promise.all(files as Promise<File>[] ?? []).then(setSubmissions)
    }
  }, [detail?.state])

  const handleUpload = () => {
    Promise.all(detail!.submissions.map(sub => {
      return cloud.delete(getFileKey(sub.url))
    }))
      .then(() => {
        return dispatch(uploadAttachments({
          user_id: user._id as string,
          course_id: course?._id as string,
          assignmentName: detail?.name as string,
          attachments: submissions
        }))
      })
      .then(({ payload }) => {
        return dispatch(uploadSubmissions({
          course_id: course?._id as string,
          assignment_id: _id as string,
          user_id: user._id as string,
          attachmentKeys: payload as { key: string, name: string }[]
        }))
      })
      .then(({ payload }) => {
        return dispatch(submissionsUploaded(payload.data))
      })
      .then(() => {
        setUploaderDisabled(true)
        return Message.show(MessageBarType.success, '上传成功。')
      })
      .then(() => window.location.reload())
      .catch(() => Message.show(MessageBarType.error, '上传失败。'))
  }

  return (
    <section style={{ padding: '40px' }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>
            {detail?.name}
          </Text>
          <Text variant="xLarge" style={subtitleStyle}>{course?.name}</Text>
          <Text variant="xLarge" style={{ ...subtitleStyle, display: 'block', margin: 0 }}>开始日期: {detail?.startTime}</Text>
          <Text variant="xLarge" style={{ ...subtitleStyle, display: 'block', margin: 0 }}>结束日期: {detail?.endTime}</Text>
          <Text variant="xLarge" style={{ ...subtitleStyle, display: 'block', margin: 0, color: NeutralColors.gray160 }}>分值: {detail?.score}</Text>
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
        {user.identity === 0 && (
          <>
            <Stack.Item>
              <TitledCard title="任务状态" subtitle="State" style={{ marginLeft: 0 }} bodyStyle={{ minHeight: 'initial', padding: 10 }}>
                <DetailsList items={items} columns={columns} isHeaderVisible={false} selectionMode={SelectionMode.none} />
              </TitledCard>
            </Stack.Item>
            {detail?.state !== 3 && detail?.state !== 2 && (
              <Stack.Item>
                <TitledCard title="提交物" subtitle="Submissions" style={{ marginLeft: 0 }} actions={(
                  uploaderDisabled ? (<PrimaryButton onClick={() => setUploaderDisabled(false)}>修改</PrimaryButton>) : (<DefaultButton onClick={handleUpload}>上传</DefaultButton>)
                )}>
                  <Uploader multiple files={submissions} disabled={uploaderDisabled} onChange={setSubmissions} />
                </TitledCard>
              </Stack.Item>
            )}
          </>
        )}
        {user.identity === 1 && (
          <Stack.Item>
            <TitledCard title="任务状态" subtitle="State" style={{ marginLeft: 0 }} bodyStyle={{ minHeight: 'initial', padding: 10 }} actions={(
              <PrimaryButton onClick={() => navigate(`/judgement/detail/${_id}`)}>评判任务</PrimaryButton>
            )}>
              <DetailsList items={teacherItems} columns={columns} isHeaderVisible={false} selectionMode={SelectionMode.none} />
            </TitledCard>
          </Stack.Item>
        )}
      </Stack>
    </section>
  )
}

export default AssignmentDetailView
