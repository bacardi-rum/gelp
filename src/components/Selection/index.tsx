import { Checkbox, ICheckboxProps } from '@fluentui/react'
import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement | ReactElement[],
  value: any,
  onSelect?: ICheckboxProps['onChange']
}

const Selection: React.FC<Props> = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <Checkbox onChange={props.onSelect} />
      <div style={{ flex: 1 }}>
        {props.children}
      </div>
    </div>
  )
}

export default Selection