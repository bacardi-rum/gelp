import styles from './index.module.scss'
import { NeutralColors, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import { CSSProperties, ReactNode } from 'react'
import moment from 'moment'

const AssignmentItem = (item: AssignmentItem, index: number, key?: string): ReactNode => {
  const subtitleStyle: CSSProperties = {
    display: 'block',
    padding: '6px 8px 0',
    color: NeutralColors.gray120
  }

  return (
    <NavLink state={{ item }} to={`/course/assignment/${item?._id}`} key={key ?? item._id}
      style={{ display: 'block', textDecoration: 'none' }}>
      <div className={styles['gelp-assignment-item']}>
        <Text variant="xLarge" as="h3"
          style={{
            display: 'block',
            padding: '6px 8px 0',
            fontWeight: 'normal',
            whiteSpace: 'normal'
          }}>{item?.name}</Text>
        <Text variant="medium" style={subtitleStyle}>开始时间: {moment(item?.startTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <Text variant="medium"
          style={subtitleStyle}>结束时间: {moment(item?.endTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <Text variant="medium"
          style={{
            display: 'block',
            padding: '6px 8px',
            color: NeutralColors.gray140
          }}>分值: {item?.score}</Text>
      </div>
    </NavLink>
  )
}

export default AssignmentItem
