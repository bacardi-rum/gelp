import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

console.log(styles)

type Props = {
  to: string,
  children: ReactElement | ReactElement[] | string
}

const NavBarItem: React.FC<Props> = (props) => {
  return (
    <NavLink to={props.to}
             className={({ isActive }) => `${styles['gelp-nav-bar-item']} ${isActive ? styles['active'] : ''}`}>
      <li className={styles['gelp-nav-bar-item__inner']}>
        {props.children}
      </li>
    </NavLink>
  )
}

export default NavBarItem
