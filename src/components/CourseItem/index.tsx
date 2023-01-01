import React from 'react'
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  FontSizes,
  ImageFit,
  mergeStyleSets
} from '@fluentui/react'
import { NavLink } from 'react-router-dom'

function CourseItem(item: CourseItem & { user: UserInfo }, index: number, key?: string): React.ReactNode {
  // const navigate = useNavigate()

  const styles = mergeStyleSets({
    container: {
      // width: '100%',
      maxWidth: '328px'
    },
    title: {
      height: 'unset',
      padding: '0 16px',
      margin: '8px 0',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  })
  return (
    <NavLink to={`/course/detail/${item._id}`} style={{ color: 'unset', textDecoration: 'none' }} key={key ?? item._id}>
      <DocumentCard className={styles.container}
        onClick={() => { }}>
        <DocumentCardPreview previewImages={[
          {
            previewImageSrc: item.coverUrl,
            imageFit: ImageFit.centerCover,
            // previewIconProps: { iconName: 'Education', styles: { root: { fontSize: FontSizes.size32 } } },
            height: 180,
            width: 320
          }
        ]} />
        <DocumentCardTitle title={item.name} className={styles.title} />
        {item.content &&
          <DocumentCardTitle className={styles.title} title={item.content} showAsSecondaryTitle styles={{
            root: {
              padding: 0,
              margin: '8px 16px'
            }
          }} />}
        <DocumentCardActivity activity={item.user.nickname} people={[
          {
            name: item.user.name,
            profileImageSrc: item.user.avatarUrl as string
          }
        ]} />
      </DocumentCard>
    </NavLink>

  )
}

export default CourseItem
