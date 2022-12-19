import {
  DayOfWeek,
  Stack,
  DatePicker,
  Text,
  FontWeights, NeutralColors, PrimaryButton, TextField, MotionAnimations, MotionDurations, DefaultButton, MessageBarType, MarqueeSelection, Checkbox
} from '@fluentui/react'
import React, { CSSProperties, FormEvent, ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import moment from 'moment'
import ScheduleItem from '@components/ScheduleItem'
import { useAppDispatch, useAppSelector } from '@hooks'
import ControlledModal from '@components/ControlledModal'
import { createSchedule } from '@redux/slices/scheduleSlice'
import Message from '@components/Message'
import List from '@components/List'
import AssignmentItem from '@components/AssignmentItem'
import Selection from '@components/Selection'

const ScheduleView = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(state => state.user._id) as string
  const schedules = useAppSelector(state => state.schedule.schedules)
  const assignments = useAppSelector(state => state.course.courses.flatMap(c => c.assignments))
  const [startTime, setStartTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()
  const [scheduleName, setScheduleName] = useState('')
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false)

  const [createName, setCreateName] = useState('')
  const [createContent, setCreateContent] = useState('')
  const [createStartTime, setCreateStartTime] = useState<Date>()
  const [createEndTime, setCreateEndTime] = useState<Date>()
  const [createSelectedAssignments, setCreateSelectedAssignments] = useState<string[]>([])

  const formatDate = useCallback((date?: Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }, [])

  const subtitleStyle: CSSProperties = useMemo(() => {
    return {
      fontWeight: FontWeights.regular,
      color: NeutralColors.gray120,
      marginLeft: '10px'
    }
  }, [])

  const handleCreate = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    console.log(createName, createContent)

    dispatch(createSchedule({
      user_id,
      name: createName,
      content: createContent,
      startTime: formatDate(createStartTime),
      endTime: formatDate(createEndTime),
      assignments: createSelectedAssignments
    })).then(() => {
      setShowCreateScheduleModal(false)
      Message.show(MessageBarType.success, '创建成功。')
    }).catch(() => {
      Message.show(MessageBarType.error, '创建失败。')
    })
  }

  const handleSelect = useCallback((checked: boolean, value: string) => {
    const newCreateSelectedAssignments = [...createSelectedAssignments]
    if (checked) {
      newCreateSelectedAssignments.push(value)
    }
    else {
      const index = newCreateSelectedAssignments.findIndex(ass => ass === value)
      newCreateSelectedAssignments.splice(index, 1)
    }
    setCreateSelectedAssignments(newCreateSelectedAssignments)
  }, [createSelectedAssignments])

  return (
    <section style={{ padding: '40px', animation: MotionAnimations.slideUpIn, animationDuration: MotionDurations.duration4 }} >
      <ControlledModal header="新建计划" isOpen={showCreateScheduleModal} isBlocking handleDismiss={(isOpen) => setShowCreateScheduleModal(isOpen)} body={(
        <form id="gelp-create-schedule-form" onSubmit={handleCreate}>
          <TextField label="名称" name="name" placeholder="计划名称" required styles={{ root: { marginBottom: 8 } }} value={createName} onChange={(ev, val) => setCreateName(val as string)} />
          <TextField label="内容简介" name="content" placeholder="计划内容简介" multiline rows={5} autoAdjustHeight styles={{ root: { marginBottom: 8 } }} value={createContent} onChange={(ev, val) => setCreateContent(val as string)} />
          <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { marginBottom: 8 } }}>
            <Stack.Item grow={1}>
              <DatePicker
                label="开始日期"
                firstDayOfWeek={DayOfWeek.Monday}
                highlightSelectedMonth
                showWeekNumbers
                placeholder="选择开始日期"
                ariaLabel="Select a date"
                value={createStartTime}
                onSelectDate={setCreateStartTime as (date?: Date | null) => void}
                formatDate={formatDate}
                isRequired
              />
              <input name="startTime" hidden value={formatDate(createStartTime)} required onChange={() => { }} />
            </Stack.Item>
            <Stack.Item grow={1}>
              <DatePicker
                label="结束日期"
                firstDayOfWeek={DayOfWeek.Monday}
                highlightSelectedMonth
                showWeekNumbers
                placeholder="选择结束日期"
                ariaLabel="Select a date"
                value={createEndTime}
                onSelectDate={(date) => setCreateEndTime(new Date(date?.setHours(23, 59, 59) as number))}
                formatDate={formatDate}
                isRequired
              />
              <input name="endTime" hidden value={formatDate(createEndTime)} required onChange={() => { }} />
            </Stack.Item>
          </Stack>
          <List items={(!createStartTime && !createEndTime) ? [] : assignments.filter(ass => {
            if (createStartTime && !createEndTime) {
              return new Date(ass.startTime) >= createStartTime
            }
            if (!createStartTime && createEndTime) {
              return new Date(ass.endTime) <= createEndTime
            }
            if (createStartTime && createEndTime) {
              const date = new Date(ass.startTime)
              return date >= createStartTime && date <= createEndTime
            }
          })} render={(item, index, key) => {
            return (
              <Selection value={item._id ?? key} onSelect={(ev, checked) => handleSelect(checked as boolean, item._id ?? key)}>
                {AssignmentItem(item, index, key) as ReactElement}
              </Selection>
            )
          }} />
        </form>
      )} footer={(
        <div style={{ textAlign: 'right' }}>
          <PrimaryButton text="创建" styles={{ root: { marginRight: 10 } }} type="submit" form="gelp-create-schedule-form" />
          <DefaultButton text="取消" onClick={() => setShowCreateScheduleModal(false)}/>
        </div>
      )} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>全部计划</Text>
          <Text variant="large" style={subtitleStyle}>All Schedules</Text>
        </div>
        <PrimaryButton text="新建计划" onClick={() => setShowCreateScheduleModal(true)} />
      </div>
      <Stack horizontal
        style={{
          padding: '20px',
          marginTop: '10px',
          backgroundColor: '#fff',
        }}
        tokens={{ childrenGap: 20 }}>
        <Stack.Item grow={2}>
          <TextField placeholder="搜索全部计划" label="计划名称" value={scheduleName} onChange={(ev, newVal) => setScheduleName(newVal as string)} />
        </Stack.Item>
        <Stack.Item grow={1}>
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
          />
        </Stack.Item>
        <Stack.Item grow={1}>
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
          />
        </Stack.Item>
      </Stack>
      <Stack style={{ marginTop: '20px', backgroundColor: '#fff' }}>
        <Stack.Item>
          <List items={schedules
            .filter(schedule => {
              return (!startTime || startTime <= new Date(schedule.startTime))
                && (!endTime || endTime >= new Date(schedule.endTime))
                && schedule.name.includes(scheduleName)
            })}
            render={ScheduleItem}
          />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default ScheduleView
