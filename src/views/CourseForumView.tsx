import {
  FontWeights,
  MessageBarType,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  PrimaryButton,
  Stack,
  Text,
  TextField
} from '@fluentui/react'
import { CSSProperties, useState } from 'react'
import CommentItem from '@components/CommentItem'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useParams } from 'react-router-dom'
import { sendComment } from '@redux/slices/courseSlice'
import moment from 'moment'
import List from '@components/List'
import Message from '@components/Message'

const CourseForumView = () => {
  const dispatch = useAppDispatch()
  const { _id } = useParams()
  const course = useAppSelector(state => state.course.courses.find(c => c._id === _id))
  const comments = course?.comments

  const user_id = useAppSelector(state => state.user._id) as string

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const animationStyle: CSSProperties = {
    animation: MotionAnimations.slideUpIn,
    animationDuration: MotionDurations.duration4
  }

  const [commentValue, setCommentValue] = useState('')
  const handleSend = () => {
    dispatch(sendComment({ user_id, course_id: _id!, content: commentValue, date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }))
      .then(() => {
        setCommentValue('')
        Message.show(MessageBarType.success, '发表成功。')
      })
  }

  return (
    <section style={{ padding: '40px' }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>讨论区</Text>
          <Text variant="xLarge" style={subtitleStyle}>{course?.name}</Text>
        </Stack.Item>
        <Stack.Item style={{ marginTop: '10px' }}>
          <Stack horizontal>
            <Stack.Item grow={11} style={{ marginRight: '20px', backgroundColor: '#fff' }}>
              <List items={comments ?? []} render={CommentItem} />
            </Stack.Item>
            <Stack.Item grow={1} style={{ backgroundColor: '#fff', position: 'sticky', top: 20, height: 'fit-content' }}
              styles={{ root: { padding: '16px', flex: '1 0 20%' } }}>
              <Stack>
                <Stack.Item style={{ marginBottom: '10px' }}>
                  <TextField multiline autoAdjustHeight rows={15} value={commentValue} placeholder="请友好交流哦～"
                    onChange={(ev, newVal) => setCommentValue(newVal as string)} />
                </Stack.Item>
                <Stack.Item>
                  <PrimaryButton text="发送讨论" style={{ width: '100%' }} onClick={handleSend} />
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default CourseForumView

