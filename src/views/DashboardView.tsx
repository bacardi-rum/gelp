import TitledCard from '@components/TitledCard'
import InfoCard from '@components/InfoCard'
import {
  Calendar,
  DateRangeType,
  DayOfWeek, DefaultButton,
  defaultCalendarStrings,
  FontSizes,
  IDocumentCardPreviewProps,
  ImageFit,
  PrimaryButton,
  ProgressIndicator,
  Stack
} from '@fluentui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitledList from '@components/TitledList/TitledList'
import ScheduleItem from '@components/ScheduleItem'
import AssignmentItem from '@components/AssignmentItem'
import LogItem from '@components/LogItem'
import { useAppSelector } from '@hooks'
import { getLevel, getScoreByLevel } from '@config/level'

const DashboardView: React.FC = () => {
  const navigate = useNavigate()
  const userInfo = useAppSelector(state => state.user)
  const courses = useAppSelector(state => state.course.courses)
  const schedules = useAppSelector(state => state.schedule.schedules)
  const logs = useAppSelector(state => state.log.logs)
  const assignments = useAppSelector(state => state.assignment.assignments)
  console.log(assignments)


  const [level, scoreRemaining] = getLevel(userInfo.score ?? 0)
  const totalScore = getScoreByLevel(level)

  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack
        horizontal
        horizontalAlign="space-around"
      >
        <Stack.Item
          grow={3}
          style={{ overflow: 'hidden' }}
        >
          <TitledCard
            title="最近课程"
            subtitle="Recent Courses"
            indicator
            actions={(
              <PrimaryButton onClick={() => navigate('/course')}>查看所有课程</PrimaryButton>
            )}
          >
            {courses.map(course => (
              <InfoCard key={course._id}
                onClickHref={`#/course/detail/${course._id}`}
                title={course.name}
                previewProps={{
                  previewImages: [
                    {
                      previewImageSrc: course.coverUrl,
                      imageFit: ImageFit.centerCover,
                      height: 196,
                      width: 320
                    }
                  ]
                }}
                subtitle={course.content}
                activity={course.user.nickname}
                people={[
                  {
                    name: course.user.name,
                    profileImageSrc: ''
                  }
                ]}
              />))
            }
          </TitledCard>
        </Stack.Item>
        <Stack.Item
          grow={1}
          disableShrink
          style={{ minWidth: '350px' }}
        >
          <TitledCard
            title="等级"
            subtitle="Level"
            bodyStyle={{ padding: '20px' }}
          >
            <ProgressIndicator
              label={`Lv.${level}`}
              description={`距离下一等级还有${scoreRemaining}分，继续加油吧～`}
              percentComplete={(totalScore - scoreRemaining) / totalScore}
              barHeight={5}
            />
          </TitledCard>
        </Stack.Item>
      </Stack>

      <Stack
        horizontal
        horizontalAlign="space-around"
      >
        <Stack.Item
          grow={1}
          className="gelp-home-list"
        >
          <TitledList
            items={schedules.slice(0, 6)}
            render={ScheduleItem}
            title="计划"
            subtitle="Schedules"
            actions={(
              <PrimaryButton style={{ marginRight: '8px' }} onClick={() => navigate('/schedule')}>查看所有计划</PrimaryButton>
            )}
            bodyStyle={{ overflow: 'auto', height: '458px' }}
          />
        </Stack.Item>
        <Stack.Item
          grow={1}
          className="gelp-home-list"
        >
          <TitledList
            items={assignments.slice(0, 6)}
            render={AssignmentItem}
            title="即将到来的任务"
            subtitle="Coming Assignments"
            bodyStyle={{ overflow: 'auto', height: '458px' }}
          />
        </Stack.Item>
        <Stack.Item grow={1} className="gelp-home-list">
          <TitledList
            items={logs}
            render={LogItem}
            title="日志"
            subtitle="Logs"
            actions={
              <PrimaryButton onClick={() => navigate('/log')}>查看所有日志</PrimaryButton>
            }
            bodyStyle={{ overflow: 'auto', height: '458px' }}
          />
        </Stack.Item>
      </Stack>

      <Stack horizontal horizontalAlign="space-around">
        <Stack.Item>
          <TitledCard title="日历" subtitle="Calendar">
            <Calendar
              dateRangeType={DateRangeType.Day}
              highlightSelectedMonth
              showGoToToday
              firstDayOfWeek={DayOfWeek.Monday}
              strings={defaultCalendarStrings}
            />
          </TitledCard>
        </Stack.Item>
        <Stack.Item style={{ overflow: 'hidden' }} grow={1}>
          <TitledCard title="勋章墙" subtitle="Medals" indicator>

          </TitledCard>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default DashboardView
