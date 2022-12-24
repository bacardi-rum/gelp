import Message from '@components/Message'
import Uploader from '@components/Uploader'
import { Depths, PrimaryButton, DefaultButton, Stack, FontWeights, TextField, Text, MotionAnimations, MotionDurations, NeutralColors, DatePicker, DayOfWeek, MessageBarType } from '@fluentui/react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { createAssignment, uploadAttachments } from '@redux/slices/assignmentSlice'
import { assignmentCreated } from '@redux/slices/courseSlice'
import moment from 'moment'
import React, { CSSProperties, useState, useCallback, FormEventHandler, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AssignmentCreateView = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { _id: user_id, identity } = useAppSelector(state => state.user)
  const { _id } = useParams()

  useEffect(() => {
    if (identity !== 1) { navigate(`/course/detail/${_id}`) }
  }, [identity])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [score, setScore] = useState(1)
  const [startTime, setStartTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()
  const [attachments, setAssignments] = useState<File[]>([])

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  const formatDate = useCallback((date?: Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    dispatch(uploadAttachments({
      user_id: user_id as string,
      course_id: _id as string,
      assignmentName: name,
      attachments
    }))
      .then(({ payload }) => {        
        return dispatch(createAssignment({
          course_id: _id as string,
          name,
          content,
          score,
          startTime: formatDate(startTime),
          endTime: formatDate(endTime),
          attachmentKeys: payload as { key: string, name: string }[],
        }))
      })
      .then(({ payload }) => {
        return dispatch(assignmentCreated(payload.data))
      })
      .then(() => {
        return Message.show(MessageBarType.success, '创建成功。')
      })
      .then(() => navigate(`/course/detail/${_id}`))
      .catch(() => Message.show(MessageBarType.error, '创建失败。'))
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
            <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>新建任务</Text>
            <Text variant="xLarge" style={subtitleStyle}>Create an Assignment</Text>
          </Stack.Item>
          <Stack.Item style={{ padding: '20px', backgroundColor: '#fff', ...animationStyle }}>
            <Stack tokens={{ childrenGap: 10 }}>
              <Stack.Item>
                <TextField label="任务名称" required name="name" value={name} onChange={(ev, newVal) => setName(newVal as string)} />
              </Stack.Item>
              <Stack.Item>
                <TextField multiline label="任务简介" name="content" rows={10} autoAdjustHeight value={content} onChange={(ev, newVal) => setContent(newVal as string)} />
              </Stack.Item>
              <Stack.Item>
                <Stack tokens={{ childrenGap: 20 }} horizontal>
                  <Stack.Item grow={1}>
                    <TextField label="分值" required value={score.toString()} onChange={(ev, newVal) => setScore(Number(newVal))} type="number" min={1} />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <DatePicker
                      label="开始日期"
                      firstDayOfWeek={DayOfWeek.Monday}
                      highlightSelectedMonth
                      showWeekNumbers
                      placeholder="选择开始日期"
                      ariaLabel="Select a date"
                      value={startTime}
                      onSelectDate={setStartTime as (date?: Date | null) => void}
                      formatDate={formatDate}
                      isRequired
                    />
                    <input name="startTime" hidden value={formatDate(startTime)} required onChange={() => { }} />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <DatePicker
                      label="结束日期"
                      firstDayOfWeek={DayOfWeek.Monday}
                      highlightSelectedMonth
                      showWeekNumbers
                      placeholder="选择结束日期"
                      ariaLabel="Select a date"
                      value={endTime}
                      onSelectDate={(date) => setEndTime(new Date(date?.setHours(23, 59, 59) as number))}
                      formatDate={formatDate}
                      isRequired
                    />
                    <input name="endTime" hidden value={formatDate(endTime)} required onChange={() => { }} />
                  </Stack.Item>
                </Stack>
              </Stack.Item>
              <Stack.Item>
                <Uploader multiple label="上传附件" tip='选择文件或拖动文件到此处' files={attachments} onChange={setAssignments} />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </section>
  )
}

export default AssignmentCreateView