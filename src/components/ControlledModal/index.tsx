import {
  FontSizes,
  FontWeights, getTheme, IButtonStyles,
  IconButton,
  mergeStyleSets,
  Modal,
  MotionAnimations, MotionDurations,
  NeutralColors
} from '@fluentui/react'
import React, { ReactElement, useMemo } from 'react'
import styles from './index.module.scss'

type Props = {
  isOpen: boolean,
  isBlocking?: boolean,
  handleDismiss: (isOpen: boolean) => void,
  header: string,
  body?: ReactElement | ReactElement[] | string | number,
  footer?: ReactElement | ReactElement[] | string | number
}

const theme = getTheme(),
  className = 'gelp-controlled-modal'
const ControlledModal: React.FC<Props> = (props) => {
  const contentStyles = useMemo(() => {
    return mergeStyleSets({
      container: {
        borderTop: `4px solid ${theme.palette.themePrimary}`,
      },
      header: [
        {
          color: NeutralColors.gray180,
          fontWeight: FontWeights.regular,
          fontSize: FontSizes.size20,
        }
      ],
      body: {
        background: NeutralColors.gray20,
      },
    })
  }, [])

  const iconButtonStyles: Partial<IButtonStyles> = useMemo(() => {
    return {
      root: {
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
        color: NeutralColors.gray160,
      },
      rootHovered: {
        color: NeutralColors.gray180,
      },
    }
  }, [])

  return (
    <Modal isOpen={props.isOpen} isBlocking={props.isBlocking ?? false} onDismiss={() => props.handleDismiss(false)}
           containerClassName={`${styles[`${className}__container`]} ${contentStyles.container}`}
           styles={{
             root: { animation: MotionAnimations.fadeIn, animationDuration: MotionDurations.duration1 }
           }}>
      <div className={`${styles[`${className}__header`]} ${contentStyles.header}`}>
        <span>{props.header}</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close popup modal"
          onClick={() => props.handleDismiss(false)}
        />
      </div>
      <div className={`${styles[`${className}__body`]} ${contentStyles.body}`}>
        {props.body}
      </div>
      {props.footer && (
        <div className={`${styles[`${className}__footer`]}`}>
          {props.footer}
        </div>
      )}
    </Modal>
  )
}

export default ControlledModal
