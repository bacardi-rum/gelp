import React, { ReactElement } from 'react'
import styles from './index.module.scss'
import { FontSizes, FontWeights, NeutralColors, MotionAnimations, MotionDurations } from '@fluentui/react'
import List from '@components/List'

type Props = {
  items: any[],
  render: (item: any, index: number, key?: string) => React.ReactNode,
  title: string,
  subtitle?: string,
  actions?: ReactElement | ReactElement[],
  border?: boolean,
  style?: Partial<CSSStyleDeclaration>,
  bodyStyle?: Partial<CSSStyleDeclaration>
}

const className = 'gelp-titled-list'
const TitledList: React.FC<Props> = (props) => {
  return (
    <div className={styles[className]} style={{
      animation: MotionAnimations.slideUpIn,
      animationDuration: MotionDurations.duration4,
      ...(props.style ?? {}) as { [key: string]: string | number }
    }}>
      <div className={styles[`${className}__header`]} style={{
        fontSize: FontSizes.size28,
        fontWeight: FontWeights.regular,
        color: NeutralColors.gray160
      }}>
        <div className={styles[`${className}__header-left`]}>
          {props.title}
          <span style={{
            marginLeft: '10px',
            fontSize: FontSizes.size18,
            fontWeight: FontWeights.regular,
            color: NeutralColors.gray120
          }}>{props.subtitle}</span>
        </div>
        {props.actions && <div className={styles[`${className}__header-right`]}>{props.actions}</div>}
      </div>
      <div className={styles[`${className}__body`]} style={{
        border: props.border ? `1px solid ${NeutralColors.gray40}` : 'none',
        ...(props.bodyStyle ?? {}) as { [key: string]: string | number }
      }}>
        <List items={props.items} render={props.render}
          style={{ boxSizing: 'border-box' }} />
      </div>
    </div>
  )
}

export default TitledList
