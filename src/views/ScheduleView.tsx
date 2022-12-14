import {
  Calendar,
  DateRangeType,
  DayOfWeek,
  Stack,
  Dropdown,
  IDropdownOption,
  DatePicker,
  Text,
  FontWeights, NeutralColors, PrimaryButton
} from '@fluentui/react'
import React, { CSSProperties, useCallback, useState } from 'react'
import moment from 'moment'

const ScheduleView = () => {
  const [startTime, setStartTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()

  const formatDate = useCallback((date?: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }, [])

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  return (
    <section style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>全部计划</Text>
          <Text variant="large" style={subtitleStyle}>All Schedules</Text>
        </div>
        <PrimaryButton text="新建计划"/>
      </div>
      <Stack horizontal style={{ padding: '20px', marginTop: '10px', backgroundColor: '#fff' }}
             tokens={{ childrenGap: 20 }}>
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
            onSelectDate={setEndTime as (date?: Date | null) => void}
            formatDate={formatDate}
          />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default ScheduleView
