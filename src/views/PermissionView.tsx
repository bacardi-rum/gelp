import CourseItem from '@components/CourseItem'
import Message from '@components/Message'
import Selection from '@components/Selection'
import TitledList from '@components/TitledList/TitledList'
import { Stack, PrimaryButton, SearchBox, Persona, DefaultButton, Text, mergeStyleSets, FontWeights, VerticalDivider, MessageBarType } from '@fluentui/react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { permit } from '@redux/slices/permissionSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Permission = {
  _id: string,
  user_id: string,
  course_id: string,
  granted: boolean,
  dealed: boolean,
  date: string,
  score: number,
  user: UserInfo,
  courseName: string
}

const PermissionView = () => {
  const dispatch = useAppDispatch()
  const courses = useAppSelector(state => state.course.courses)
  const permissions = useAppSelector(state => state.permission.permissions)
  const user_id = useAppSelector(state => state.user._id)
  const coursesMap = new Map(courses.map(course => [course._id, course]))

  const [userOrCourseName, setUserOrCourseName] = useState('')

  const items = Object.keys(permissions)
    .flatMap(course_id => permissions[course_id].map<Permission>(permission => ({ ...permission, courseName: coursesMap.get(course_id)!.name })))
    .filter(item => item.user.name.includes(userOrCourseName) || item.user.nickname.includes(userOrCourseName) || item.courseName.includes(userOrCourseName))

  const handlePermit = (data: { user_id: string, course_id: string, granted: boolean }) => {
    dispatch(permit(data))
      .then(() => {
        Message.show(MessageBarType.success, '操作成功。')
      })
      .catch(() => {
        Message.show(MessageBarType.error, '操作失败。')
      })
  }

  const PermissionItem = (item: Permission, index: number, key?: string) => {
    const style = mergeStyleSets({
      body: {
        padding: 16,
        border: '1px solid #edebe9',
        '&:hover': {
          borderColor: '#c8c6c4',
          '&::after': {
            content: "",
            position: 'absolute',
            inset: 0,
            border: '1px solid #c8c6c4'
          }
        }
      }
    })

    const handleClick = (granted: boolean) => {
      handlePermit({ user_id: item.user_id, course_id: item.course_id, granted })
    }

    return (
      <div style={{ display: 'flex' }} key={item._id} className={style.body}>
        <Persona text={item?.user?.name} secondaryText={item?.user?.nickname} />
        <div style={{ flex: 1, display: 'flex', gap: 20, alignItems: 'center', padding: '0 16px' }}>
          <VerticalDivider />
          <Text variant="xLarge" styles={{ root: { fontWeight: FontWeights.regular } }}>{item?.courseName}</Text>
          <VerticalDivider />
          <Text variant="large">{item.date}</Text>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <PrimaryButton onClick={() => handleClick(true)}>通过</PrimaryButton>
          <DefaultButton onClick={() => handleClick(false)}>拒绝</DefaultButton>
        </div>
      </div>
    )
  }

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack>
        <Stack.Item>
          <TitledList
            style={{ paddingTop: '0' }}
            items={items}
            render={PermissionItem}
            title="所有待处理申请"
            subtitle="All Requests"
            actions={(
              <SearchBox
                value={userOrCourseName}
                onChange={(ev, newVal) => setUserOrCourseName(newVal as string)}
                placeholder="搜索学生姓名、用户名或课程名"
                styles={{ root: { minWidth: '500px', marginLeft: '20px' } }}
              />
            )}
          />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default PermissionView