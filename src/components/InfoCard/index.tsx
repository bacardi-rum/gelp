import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardActivityProps,
  IDocumentCardPreviewProps,
} from '@fluentui/react'
import React, { ReactElement, useState } from 'react'
import styles from './index.module.scss'
import ControlledModal from '@components/ControlledModal'

type Props = {
  previewProps?: IDocumentCardPreviewProps,
  title: string,
  subtitle?: string | ReactElement[] | ReactElement,
  activity?: string,
  people?: IDocumentCardActivityProps['people'],
  withModal?: boolean,
  modalTitle?: string,
  modalBody?: ReactElement[] | ReactElement,
  style?: Partial<CSSStyleDeclaration>,
  bodyStyle?: Partial<CSSStyleDeclaration>,
  onClickHref?: string
}

const InfoCard: React.FC<Props> = (props) => {
  // const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="gelp-info-card"
      style={{
        display: 'inline-block',
        ...(props.style ?? {}) as { [key: string]: string | number }
      }}>
      <DocumentCard style={{ height: '100%' }}
        onClickHref={props.onClickHref}
        // onClick={() => { props.withModal && setIsModalOpen(true) }}
        styles={{ root: { display: 'inline-block' } }}>
        {/* <DocumentCardLogo {...logoProps} /> */}
        {props.previewProps && (
          <DocumentCardPreview {...props.previewProps} />
        )}
        <div className={styles['gelp-info-card__body']}
          style={(props.bodyStyle as { [key: string]: string | number }) ?? {}}>
          <DocumentCardTitle styles={{ root: { height: 'unset', textOverflow: 'ellipsis' } }}
            shouldTruncate
            title={props.title} />
          {typeof props.subtitle === 'string' && (
            <DocumentCardTitle title={props.subtitle}
              showAsSecondaryTitle
              shouldTruncate
              styles={{ root: { padding: '0 16px 8px', height: 'unset', textOverflow: 'ellipsis' } }} />
          )}
          {typeof props.subtitle === 'object' && (
            <>{props.subtitle}</>
          )}
          {props.activity && (
            <DocumentCardActivity activity={props.activity} people={props.people ?? []} />
          )}
        </div>
      </DocumentCard>
      {/* {props.withModal && (
        <ControlledModal isOpen={isModalOpen} handleDismiss={(isOpen) => setIsModalOpen(isOpen)}
          header={props.modalTitle as string} body={props.modalBody} />
      )} */}
    </div>
  )
}

export default InfoCard