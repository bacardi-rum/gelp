import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loggedIn, logout } from '@redux/slices/userSlice'
import { getCoursesByUserId } from '@redux/slices/courseSlice'
import { useAppDispatch } from './redux'
import { getSchedulesByUserId } from '@redux/slices/scheduleSlice'
import { getLogsByUserId } from '@redux/slices/logSlice'
import { getAssignmentsByUserId } from '@redux/slices/assignmentSlice'
import { getPermissionsByUserId } from '@redux/slices/permissionSlice'


export const useInit = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('gelp-user-info') as string)
    if (!userInfo) { navigate('/') }
    else {
      if (+new Date() >= userInfo.expire) {
        navigate('/')
        dispatch(logout())
      }
      else {
        dispatch(loggedIn(userInfo))
        dispatch(getCoursesByUserId({ user_id: userInfo._id as string, identity: userInfo.identity }))
        if (userInfo.identity === 0) {
          dispatch(getSchedulesByUserId(userInfo._id))
          dispatch(getLogsByUserId(userInfo._id))
          dispatch(getAssignmentsByUserId(userInfo._id))
        }
        if (userInfo.identity === 1) {
          dispatch(getPermissionsByUserId(userInfo._id))
        }
      }
    }
  }, [])
}