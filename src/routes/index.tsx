import { useRoutes } from 'react-router-dom'
import DashboardView from '@views/DashboardView'
import React, { lazy } from 'react'

const lazyLoad = (viewName: string) => lazy(() => import(`@views/${viewName}View`))

const LoginView = lazyLoad('Login'),
  AboutView = lazyLoad('About'),
  CourseView = lazyLoad('Course'),
  CourseDetailView = lazyLoad('CourseDetail'),
  CourseForumView = lazyLoad('CourseForum'),
  CourseCreateView = lazyLoad('CourseCreate'),
  AssignmentDetailView = lazyLoad('AssignmentDetail'),
  ScheduleView = lazyLoad('Schedule'),
  LogView = lazyLoad('Log'),
  ScheduleDetailView = lazyLoad('ScheduleDetail'),
  LogDetailView = lazyLoad('LogDetail'),
  LogCreateView = lazyLoad('LogCreate'),
  CourseSearchView = lazyLoad('CourseSearch'),
  ProfileView = lazyLoad('Profile')
  // Uploader = lazy(() => import('@components/Uploader'))

const Routes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <LoginView />,
      children: [],
    },
    {
      path: '/about',
      element: <AboutView />,
      children: []
    },
    {
      path: '/dashboard',
      element: <DashboardView />,
      children: []
    },
    {
      path: '/course',
      element: <CourseView />,
      children: []
    },
    {
      path: '/course/search/:name',
      element: <CourseSearchView />
    },
    {
      path: '/course/detail/:_id',
      element: <CourseDetailView />
    },
    {
      path: '/course/forum/:_id',
      element: <CourseForumView />
    },
    {
      path: '/course/assignment/:_id',
      element: <AssignmentDetailView />,
      children: []
    },
    {
      path: '/course/create',
      element: <CourseCreateView />
    },
    {
      path: '/schedule',
      element: <ScheduleView />
    },
    {
      path: '/schedule/detail/:_id',
      element: <ScheduleDetailView />
    },
    {
      path: '/log',
      element: <LogView />
    },
    {
      path: '/log/detail/:_id',
      element: <LogDetailView />
    },
    {
      path: '/log/create',
      element: <LogCreateView />
    },
    {
      path: '/profile',
      element: <ProfileView />
    }
  ])
}

export default Routes
