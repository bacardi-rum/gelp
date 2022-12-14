import {
  FontWeights, List,
  MotionAnimations,
  MotionDurations,
  NeutralColors,
  PrimaryButton,
  Stack,
  Text,
  TextField
} from '@fluentui/react'
import { CSSProperties, useState } from 'react'
import CommentItem from '@components/common/CommentItem'

const CourseForumView = () => {
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

  return (
    <section style={{ padding: '40px' }}>
      <Stack style={animationStyle}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>讨论区</Text>
          <Text variant="xLarge" style={subtitleStyle}>JavaScript高级程序设计</Text>
        </Stack.Item>
        <Stack.Item style={{ marginTop: '10px' }}>
          <Stack horizontal>
            <Stack.Item grow={5} style={{ marginRight: '20px', backgroundColor: '#fff' }}>
              <List items={new Array<CommentItem>(20).fill({
                _id: '111',
                content: new Array(30).fill(`
                首先我认为
                这个应该是这样的思路：
                
                1. 的对抗肌肤内部上的驾考伏牛山的肌肤
                2. 对方的咖啡机那斯洛伐克的那三大
                `).join(''),
                course_id: '111111',
                date: new Date(),
                student_id: '12324',
                teacher_id: ''
              })} onRenderCell={CommentItem}/>
            </Stack.Item>
            <Stack.Item grow={1} style={{ backgroundColor: '#fff', position: 'sticky', top: 20, height: 'fit-content' }}
                        styles={{ root: { padding: '16px', flex: '1 0 20%' } }}>
              <Stack>
                <Stack.Item style={{ marginBottom: '10px' }}>
                  <TextField multiline autoAdjustHeight rows={15} value={commentValue} placeholder="请友好交流哦～"
                             onChange={(ev) => setCommentValue((ev.target as HTMLTextAreaElement).value)}/>
                </Stack.Item>
                <Stack.Item>
                  <PrimaryButton text="发送讨论" style={{ width: '100%' }}/>
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
