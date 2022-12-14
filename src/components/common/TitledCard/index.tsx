import { Depths, FontSizes, FontWeights, Icon, MotionAnimations, MotionDurations, NeutralColors } from '@fluentui/react'
import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'


type Props = {
  children?: ReactElement[] | ReactElement,
  title?: string,
  subtitle?: string,
  actions?: ReactElement[] | ReactElement,
  footer?: ReactElement[] | ReactElement,
  indicator?: boolean,
  bodyStyle?: Partial<CSSStyleDeclaration>,
  border?: boolean
}

const TitledCard: React.FC<Props> = (props) => {
  const cardBody = useRef<HTMLDivElement>(null)

  const moveForward = useCallback(() => {
    cardBody.current?.scrollBy({
      left: 322,
      behavior: 'smooth'
    })
  }, [])

  const moveBack = useCallback(() => {
    cardBody.current?.scrollBy({
      left: -320,
      behavior: 'smooth'
    })
  }, [])

  return (
    <section className={styles['gelp-titled-card']} style={{
      animation: MotionAnimations.slideUpIn,
      animationDuration: MotionDurations.duration4,
      // boxSizing: 'border-box'
    }}>
      {props.title && (
        <header className={styles['gelp-titled-card__header']} style={{
          fontSize: FontSizes.size28,
          fontWeight: FontWeights.regular,
          color: NeutralColors.gray160
        }}>
          <div className={styles['gelp-titled-card__header-left']}>
            {props.title}
            {props.subtitle && (
              <span style={{
                marginLeft: '10px',
                fontSize: FontSizes.size18,
                fontWeight: FontWeights.regular,
                color: NeutralColors.gray120
              }}>{props.subtitle}</span>
            )}
          </div>
          {props.actions && <div className={styles['gelp-titled-card__header-right']}>{props.actions}</div>}
        </header>
      )}
      <div className={styles['gelp-titled-card__body']} ref={cardBody} style={{
        ...(props.bodyStyle ?? {}) as { [key: string]: string | number },
        ...{
          border: props.border ? `1px solid ${NeutralColors.gray40}` : 'none',
          minHeight: '310px',
          boxSizing: 'border-box'
        }
      }}>
        {props.children}
      </div>
      {props.footer && (
        <footer className={styles['gelp-titled-card__footer']}>
          {props.footer}
        </footer>
      )}
      {props.indicator && (
        <Icon iconName="Forward" className={styles['gelp-titled-card__forward']} style={{
          fontSize: FontSizes.size20,
          color: NeutralColors.gray140,
        }} onClick={moveForward}/>
      )}

      {props.indicator && (<Icon iconName="Back" className={styles['gelp-titled-card__back']} style={{
          fontSize: FontSizes.size20,
          color: NeutralColors.gray140,
        }} onClick={moveBack}/>
      )}
    </section>
  )
}

export default TitledCard
