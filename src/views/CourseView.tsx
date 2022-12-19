import React, { useEffect, useState } from 'react'
import TitledList from '@components/TitledList/TitledList'
import CourseItem from '@components/CourseItem'
import { SearchBox, Stack } from '@fluentui/react'
import { useAppSelector } from '@hooks'

const CourseView = () => {
  const courses = useAppSelector(state => state.course.courses)
  console.log(courses)
  
  const [courseName, setCourseName] = useState('')

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item className="gelp-course-list">
          <TitledList style={{ paddingTop: '0' }} bodyStyle={{ padding: '20px' }} items={courses.filter(course => course.name.includes(courseName))} render={CourseItem} title="全部课程" subtitle="All Courses" actions={(
            <SearchBox value={courseName} onChange={(ev, newVal) => setCourseName(newVal as string)} placeholder="搜索已加入课程" styles={{ root: { minWidth: '500px' } }} />
          )} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseView
