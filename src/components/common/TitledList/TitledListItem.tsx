import React, { ReactNode } from 'react'
import {
  DocumentCardTitle,
  getTheme,
  Icon,
  IDocumentCardTitleStyles,
  IIconStyles,
  NeutralColors, VerticalDivider
} from '@fluentui/react'
import InfoCard from '@components/common/InfoCard'

const titleStyle: IDocumentCardTitleStyles = {
  root: {
    display: 'inline-block',
    padding: '4px 16px',
    height: 'unset',
    color: NeutralColors.gray120
  }
}

const TitledListItem = (item: ScheduleItem, index?: number, isScrolling?: boolean): ReactNode => {
  return (
    <InfoCard title={item.name}
              style={{ width: '99.5%' }}
              bodyStyle={{ padding: '16px' }}
              withModal
              modalTitle={item.name}
              modalBody={(
                <p>
                  {item.tasks}
                </p>
              )}
              subtitle={(
                <>
                  <div>
                    {/*<Icon iconName="BoxAdditionSolid" styles={iconStyle}/>*/}
                    <DocumentCardTitle styles={titleStyle}
                                       title={`开始时间: ${item.startTime.toDateString()}`}
                                       showAsSecondaryTitle/>
                    {/*<Icon iconName="BoxMultiplySolid" styles={iconStyle}/>*/}
                    <DocumentCardTitle styles={titleStyle} title={`结束时间: ${item.endTime.toDateString()}`}
                                       showAsSecondaryTitle/>
                  </div>
                  <DocumentCardTitle styles={{ root: { ...titleStyle.root as {}, color: NeutralColors.gray160 } }}
                                     title={`共 ${item.total} 个任务`}
                                     showAsSecondaryTitle/>
                </>
              )}
    />
  )
}

export default TitledListItem
