import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  to: string,
  children: ReactElement | ReactElement[] | string
}

const className = 'gelp-nav-bar-item'
const NavBarItem: React.FC<Props> = (props) => {
  return (
    <NavLink to={props.to}
             className={({ isActive }) => `${styles[className]} ${isActive ? styles['active'] : ''}`}>
      <li className={styles[`${className}__inner`]}>
        {props.children}
      </li>
    </NavLink>
  )
}

export default NavBarItem
