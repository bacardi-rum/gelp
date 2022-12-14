import styles from './index.module.scss'
import { NeutralColors, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import { CSSProperties, ReactNode } from 'react'

const AssignmentItem = (item?: AssignmentItem): ReactNode => {
  const subtitleStyle: CSSProperties = {
    padding: '4px 16px',
    color: NeutralColors.gray120
  }

  return (
    <NavLink state={{ item }} to={`/course/assignment/${item?._id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div className={styles['gelp-assignment-item']}>
        <Text variant="xLarge" as="h3"
              style={{ display: 'block', padding: '8px 16px 0', fontWeight: 'normal' }}>{item?.name}</Text>
        <Text variant="mediumPlus" as="h4" style={{
          display: 'block',
          padding: '6px 16px 4px',
          // maxWidth: '85%',
          color: NeutralColors.gray140,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{item?.content}</Text>
        <Text variant="medium"
              style={{ ...subtitleStyle, display: 'block', color: NeutralColors.gray140 }}>分值: {item?.score}</Text>
        <Text variant="medium" style={subtitleStyle}>开始时间: {item?.startTime.toDateString()}</Text>
        <Text variant="medium"
              style={subtitleStyle}>结束时间: {item?.endTime.toDateString()}</Text>
      </div>
    </NavLink>
  )
}

export default AssignmentItem
