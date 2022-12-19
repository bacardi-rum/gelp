import { NeutralColors, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import { CSSProperties } from 'react'
import styles from './index.module.scss'

const ScheduleItem = (item: ScheduleItem & { assignments: AssignmentItem[] }, index: number, key?: string) => {
  const subtitleStyle: CSSProperties = {
    display: 'block',
    padding: '6px 8px 0',
    color: NeutralColors.gray120
  }

  return (
    <NavLink state={{ item }} to={`/schedule/detail/${item?._id}`} key={key ?? item._id}
      style={{ display: 'block', textDecoration: 'none' }}>
      <div className={styles['gelp-schedule-item']}>
        <Text variant="xLarge" as="h3"
          style={{
            display: 'block',
            padding: '6px 8px 0',
            fontWeight: 'normal',
            whiteSpace: 'normal'
          }}>{item?.name}</Text>
        <Text variant="medium"
          style={subtitleStyle}>开始时间: {item?.startTime}</Text>
        <Text variant="medium"
          style={subtitleStyle}>结束时间: {item?.endTime}</Text>
        <Text variant="medium"
          style={{
            display: 'block',
            padding: '6px 8px',
            color: NeutralColors.gray140
          }}>共 {item?.assignments.length} 个任务</Text>
      </div>
    </NavLink>
  )
}

export default ScheduleItem
