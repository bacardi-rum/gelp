import React, { useEffect, useState } from 'react'
import TitledList from '@components/TitledList/TitledList'
import CourseItem from '@components/CourseItem'
import { PrimaryButton, SearchBox, Stack } from '@fluentui/react'
import { useAppSelector } from '@hooks'
import { useNavigate } from 'react-router-dom'

const CourseView = () => {
  const navigate = useNavigate()
  const courses = useAppSelector(state => state.course.courses)
  const user = useAppSelector(state => state.user)

  const [courseName, setCourseName] = useState('')

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item className="gelp-course-list">
          <TitledList
            style={{ paddingTop: '0' }}
            bodyStyle={{ padding: '20px' }}
            items={courses.filter(course => course.name.includes(courseName))}
            render={CourseItem}
            title="我的课程"
            subtitle="My Courses"
            actions={(
              <div style={{ display: 'flex' }}>
                {user.identity === 1 && <PrimaryButton text="新建课程" onClick={() => navigate('/course/create')} />}
                <SearchBox
                  value={courseName}
                  onChange={(ev, newVal) => setCourseName(newVal as string)}
                  placeholder={user.identity === 0 ? '搜索已加入课程' : '搜索我的课程'}
                  styles={{ root: { minWidth: '500px', marginLeft: '20px' } }}
                />
              </div>
            )}
          />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseView
