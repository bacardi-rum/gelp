import React, { useEffect, useState } from 'react'
import TitledList from '@components/TitledList/TitledList'
import CourseItem from '@components/CourseItem'
import { SearchBox, Stack } from '@fluentui/react'
import { useAppDispatch } from '@hooks'
import { useParams } from 'react-router-dom'
import { getCoursesByName } from '@redux/slices/courseSlice'

const CourseSearchView = () => {
  const { name } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCoursesByName(name as string))
      .then(({ payload }) => {
        setCourses(payload.courses)
        console.log(payload.courses)
        
      })
  }, [name])

  const [courses, setCourses] = useState<(CourseItem & { user: UserInfo })[]>([])

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item className="gelp-course-list">
          <TitledList style={{ paddingTop: '0' }} bodyStyle={{ padding: '20px' }} items={courses} render={CourseItem} title="搜索课程" subtitle="Search for Courses" />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseSearchView
