import React, { CSSProperties } from 'react'

type Props = {
  render: (item: any, index: number, key?: string) => React.ReactNode
  items: any[],
  style?: CSSProperties
}

const List: React.FC<Props> = (props) => {
  return (
    <div style={props.style ?? {}}>
      {props.items?.map((item, i) => props.render(item, i, item._id))}
    </div>
  )
}

export default List