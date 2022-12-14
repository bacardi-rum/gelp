import React from 'react'
import TitledList from '@components/common/TitledList/TitledList'
import CourseItem from '@components/common/CourseItem'
import { SearchBox, Stack } from '@fluentui/react'

const CourseView = () => {
  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item className="gelp-course-list">
          <TitledList style={{ paddingTop: '0' }} bodyStyle={{ padding: '20px' }} items={new Array<CourseItem>(6).fill({
            _id: '111111',
            content: 'JavaScript高级程序设计 JavaScript高级程序设计 JavaScript高级程序设计',
            // intro: 'JavaScript高级程序设计 JavaScript高级程序设计 JavaScript高级程序设计',
            deleted: false,
            name: 'JavaScript高级程序设计',
            published: false,
            teacher_id: '',
            assignments: []
          })} render={CourseItem} title="全部课程" subtitle="All Courses" actions={(
            <SearchBox placeholder="搜索已加入课程" styles={{ root: { minWidth: '500px' } }}/>
          )}/>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseView
