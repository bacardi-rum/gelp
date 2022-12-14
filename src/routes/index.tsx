import { useRoutes } from 'react-router-dom'
import DashboardView from '@views/DashboardView'
import React, { lazy } from 'react'

const lazyLoad = (viewName: string) => lazy(() => import(`@views/${viewName}View`))

const LoginView = lazyLoad('Login'),
  AboutView = lazyLoad('About'),
  CourseView = lazyLoad('Course'),
  CourseDetailView = lazyLoad('CourseDetail'),
  CourseForumView = lazyLoad('CourseForum'),
  AssignmentView = lazyLoad('Assignment'),
  ScheduleView = lazyLoad('Schedule'),
  LogView = lazyLoad('Log')

const Routes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <LoginView/>,
      children: [],
    },
    {
      path: '/about',
      element: <AboutView/>,
      children: []
    },
    {
      path: '/dashboard',
      element: <DashboardView/>,
      children: []
    },
    {
      path: '/course',
      element: <CourseView/>,
      children: []
    },
    {
      path: '/course/detail/:_id',
      element: <CourseDetailView/>
    },
    {
      path: '/course/forum/:_id',
      element: <CourseForumView/>
    },
    {
      path: '/course/assignment/:_id',
      element: <AssignmentView/>,
      children: [
        {
          path: 'upload',
          element: <div>Upload</div>
        }
      ]
    },
    {
      path: '/schedule',
      element: <ScheduleView/>
    },
    {
      path: '/log',
      element: <LogView/>
    }
  ])
}

export default Routes
