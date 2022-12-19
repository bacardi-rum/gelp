import { DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardType, ImageFit, NeutralColors, Text } from '@fluentui/react'
import { NavLink } from 'react-router-dom'
import { CSSProperties } from 'react'
import styles from './index.module.scss'

const LinkedCourseItem = (item: CourseItem, index: number, key?: string) => {
  const subtitleStyle: CSSProperties = {
    display: 'block',
    padding: '6px 8px 0',
    color: NeutralColors.gray120
  }

  return (
    // <NavLink state={{ item }} to={`/course/detail/${item?._id}`}
    //   style={{ display: 'block', textDecoration: 'none' }}>
    //   <div className={styles['gelp-linked-course-item']}>
    //     <Text variant="xLarge" as="h3"
    //       style={{
    //         display: 'block',
    //         padding: '6px 8px 0',
    //         fontWeight: 'normal',
    //         whiteSpace: 'normal'
    //       }}>{item?.name}</Text>
    //     <Text variant="medium"
    //       style={subtitleStyle}>修改日期: {item?.date}</Text>
    //     <Text variant="medium"
    //       style={{
    //         display: 'block',
    //         padding: '6px 8px',
    //         color: NeutralColors.gray140
    //       }}>关联 {item} 个课程</Text>
    //   </div>
    // </NavLink>
    <DocumentCard type={DocumentCardType.compact} key={key ?? item._id}>
      <DocumentCardPreview previewImages={[
        {
          previewImageSrc: item?.coverUrl,
          imageFit: ImageFit.centerCover,
          height: 144,
          width: 200
        }
      ]} />
      <DocumentCardTitle title={item?.name as string} />
    </DocumentCard>
  )
}

export default LinkedCourseItem
