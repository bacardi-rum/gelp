import ControlledModal from '@components/ControlledModal'
import { FontSizes, Icon, ITextStyles, NeutralColors, Text } from '@fluentui/react'
import React, { CSSProperties, useMemo, useState } from 'react'
import styles from './index.module.scss'

type Props = {
  name: string,
  content: string,
  iconName: string,
  score: number
}

const className = 'gelp-medal-item'
const MedalItem: React.FC<Props> = (props) => {
  const textStyles: ITextStyles = useMemo(() => {
    return {
      root: {
        display: 'block',
      }
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles[className]} onClick={() => setIsOpen(true)}>
        <Icon iconName={props.iconName} styles={{ root: { fontSize: FontSizes.size42 } }} />
        <div className={styles[`${className}__text`]}>
          <Text styles={textStyles}>{props.name}</Text>
          <Text styles={textStyles} style={{ color: NeutralColors.gray120 }}>分值: {props.score}</Text>
        </div>
      </div>
      <ControlledModal isOpen={isOpen} handleDismiss={setIsOpen} header="勋章详情" body={props.content} />
    </>
  )
}

export default MedalItem

