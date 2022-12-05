import { useRoutes } from 'react-router-dom'
import Home from '../views/Home'
import React from 'react'

const Routes: React.FC<GlobalProps> = (props) => {
  return useRoutes([
    {
      path: '/',
      element: <Home {...props}/>,
      children: [],
    }
  ])
}

export default Routes
