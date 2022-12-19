import { FontSizes, getTheme, Icon, NeutralColors } from '@fluentui/react'
import React from 'react'
import styles from './index.module.scss'

type Props = AttachmentItem

const className = 'gelp-attachment-item'
const AttachmentItem: React.FC<Props> = (props) => {
  return (
    <div className={styles[className]}>
      <Icon iconName='FileCode' style={{ marginRight: '4px', fontSize: FontSizes.size20, verticalAlign: 'text-top' }} />
      <a href={props.url} target="_blank" style={{ borderBottom: `1px solid ${getTheme().palette.themePrimary}`, color: NeutralColors.gray160, fontSize: FontSizes.size16 }}>{props.name}</a>
    </div>
  )
}

export default AttachmentItem