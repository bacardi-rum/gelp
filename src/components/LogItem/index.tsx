import { NeutralColors, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import { CSSProperties } from 'react'
import styles from './index.module.scss'

const LogItem = (item: LogItem & { courses: CourseItem[] }, index: number, key?: string) => {
  const subtitleStyle: CSSProperties = {
    display: 'block',
    padding: '6px 8px 0',
    color: NeutralColors.gray120
  }

  return (
    <NavLink state={{ item }} to={`/log/detail/${item?._id}`} key={key ?? item._id}
      style={{ display: 'block', textDecoration: 'none' }}>
      <div className={styles['gelp-log-item']}>
        <Text variant="xLarge" as="h3"
          style={{
            display: 'block',
            padding: '6px 8px 0',
            fontWeight: 'normal',
            whiteSpace: 'normal'
          }}>{item?.name}</Text>
        <Text variant="medium"
          style={subtitleStyle}>修改日期: {item?.date}</Text>
        <Text variant="medium"
          style={{
            display: 'block',
            padding: '6px 8px',
            color: NeutralColors.gray140
          }}>关联 {item?.courses?.length} 个课程</Text>
      </div>
    </NavLink>
  )
}

export default LogItem
