import React, { CSSProperties, ReactElement } from 'react'
import styles from './index.module.scss'

type Props = {
  children?: ReactElement | ReactElement[],
  items?: NavItem[],
  style?: CSSProperties
}

const NavBar: React.FC<Props> = (props) => {
  return (
    <ul className={styles['gelp-nav-bar']} style={props.style ?? {}}>
      {props.children}
    </ul>
  )
}

export default NavBar
