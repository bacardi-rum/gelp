import AssignmentItem from '@components/AssignmentItem'
import AttachmentItem from '@components/AttachmentItem'
import CourseItem from '@components/CourseItem'
import Message from '@components/Message'
import TitledList from '@components/TitledList/TitledList'
import { FontWeights, mergeStyleSets, MessageBarType, NeutralColors, PrimaryButton, Stack, Text, TextField } from '@fluentui/react'
import { useAppDispatch, useAppSelector } from '@hooks'
import { RootState } from '@redux'
import { judge } from '@redux/slices/judgementSlice'
import React, { CSSProperties, FormEventHandler, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

const JudgementDetailView = () => {
  const { _id } = useParams()
  const dispatch = useAppDispatch()
  const [selectedStudent, setSelectedStudent] = useState(0)
  const course = useAppSelector(state => {
    return state.course.courses.find(course => {
      return course.assignments.findIndex(assign => assign._id === _id) !== -1
    })
  })
  const assignment = course?.assignments.find(ass => ass._id === _id)
  const judgement = useAppSelector(state => state.judgement.judgements[course?._id as string]?.[_id as string])

  const subtitleStyle: CSSProperties = {
    fontWeight: FontWeights.regular,
    color: NeutralColors.gray120,
    marginLeft: '10px'
  }

  const StudentItem = useCallback((item: UserInfo & { submissions: AttachmentItem[] }, index: number, key?: string) => {
    const style = mergeStyleSets({
      body: {
        position: 'relative',
        padding: 16,
        border: index === selectedStudent ? '2px solid #c8c6c4' : '1px solid #edebe9',
        '&:hover': {
          borderColor: '#c8c6c4',
          cursor: 'pointer',
          '&::after': index === selectedStudent ? {} : {
            content: "",
            position: 'absolute',
            inset: 0,
            border: '1px solid #c8c6c4'
          }
        }
      }
    })

    return (
      <div className={style.body} onClick={() => setSelectedStudent(index)}>
        <Text variant="large">{item.name}</Text>
      </div>
    )
  }, [])

  const [score, setScore] = useState(0)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    dispatch(judge({
      user_id: judgement.submitted[selectedStudent]._id as string,
      course_id: course?._id as string,
      assignment_id: assignment?._id as string,
      score
    }))
      .then(() => {
        Message.show(MessageBarType.success, '评分成功。')
      })
  }

  return (
    <section style={{ padding: '40px' }}>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Text variant="xxLargePlus" style={{ fontWeight: FontWeights.regular }}>{assignment?.name}</Text>
          <Text variant="xLarge" style={subtitleStyle}>{course?.name}</Text>
        </Stack.Item>
        <Stack.Item style={{ padding: '20px', backgroundColor: 'white' }}>
          <Text variant="mediumPlus">{course?.content}</Text>
        </Stack.Item>
      </Stack>
      <Stack horizontal>
        <Stack.Item>
          <TitledList title="已提交学生" subtitle="Submitted" items={judgement.submitted} render={StudentItem} style={{ marginLeft: '0' }} />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TitledList title="提交详情" subtitle="Details" items={judgement.submitted[selectedStudent].submissions} render={(item, index) => {
            return (<AttachmentItem {...item} key={item._id} />) as React.ReactNode
          }}
            bodyStyle={{ padding: '16px', boxSizing: 'border-box' }}
            actions={(
              <form onSubmit={handleSubmit}>
                <Stack horizontal tokens={{ childrenGap: 20 }}>
                  <Stack.Item grow={1}>
                    <TextField required type="number" max={assignment?.score} min={0} value={score.toString()} onChange={(ev, newVal) => setScore(Number(newVal))}
                      styles={{ root: { minWidth: 300 } }} />
                  </Stack.Item>
                  <Stack.Item>
                    <PrimaryButton type="submit">{`评分（最高${assignment?.score}分）`}</PrimaryButton>
                  </Stack.Item>
                </Stack>
              </form>
            )} />
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default JudgementDetailView