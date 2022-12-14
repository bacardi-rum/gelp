import React from 'react'
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  FontSizes,
  mergeStyleSets
} from '@fluentui/react'
import { NavLink } from 'react-router-dom'

const DocumentCardActivityPeople = [
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
]

function CourseItem(item: CourseItem, index?: number, icScrolling?: boolean): React.ReactNode {
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
    <NavLink to={`/course/detail/${item._id}`} style={{ color: 'unset', textDecoration: 'none' }}>
      <DocumentCard className={styles.container}
                    onClick={() => {}}>
        <DocumentCardPreview previewImages={[
          {
            // previewImageSrc: require('@assets/IMG_1525.JPG'),
            previewIconProps: { iconName: 'Education', styles: { root: { fontSize: FontSizes.size32 } } },
            height: 140
          }
        ]}/>
        <DocumentCardTitle title={item.name} className={styles.title}/>
        {item.content &&
          <DocumentCardTitle className={styles.title} title={item.content} showAsSecondaryTitle styles={{
            root: {
              padding: 0,
              margin: '8px 16px'
            }
          }}/>}
        <DocumentCardActivity activity="teacher" people={DocumentCardActivityPeople}/>
      </DocumentCard>
    </NavLink>

  )
}

export default CourseItem
