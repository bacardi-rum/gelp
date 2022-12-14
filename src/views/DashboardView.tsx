import TitledCard from '@components/common/TitledCard'
import InfoCard from '@components/common/InfoCard'
import {
  Calendar,
  DateRangeType,
  DayOfWeek, DefaultButton,
  defaultCalendarStrings,
  IDocumentCardPreviewProps,
  ImageFit,
  PrimaryButton,
  ProgressIndicator,
  Stack
} from '@fluentui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TitledList from '@components/common/TitledList/TitledList'
import TitledListItem from '@components/common/TitledList/TitledListItem'

const coursePreviewProps: IDocumentCardPreviewProps = {
  getOverflowDocumentCountText(overflowCount: number) {
    return `+ ${overflowCount} more`
  },
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      previewImageSrc: require('@assets/IMG_1525.JPG'),
      imageFit: ImageFit.centerCover,
      width: 318,
      height: 196,
    }
  ]
}

const schedulePreviewProps: IDocumentCardPreviewProps = {
  getOverflowDocumentCountText(overflowCount: number) {
    return overflowCount > 0 ? `+ ${overflowCount} more` : ''
  },
  previewImages: [
    { name: '1. 阅读JavaScript高级程序设计第一章和第二章。' },
    { name: '2. 完成课后习题。' },
    { name: '3. 阅读JavaScript高级程序设计第一章和第二章。' },
    { name: '4. 阅读JavaScript高级程序设计第一章和第二章。' },
    { name: '5. 阅读JavaScript高级程序设计第一章和第二章。' },
  ]
}

const DocumentCardActivityPeople = [
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
  { name: 'Annie Lindqvist', profileImageSrc: 'TestImages.personaFemale' },
]

const content = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem nulla, malesuada ut sagittis sit
            amet, vulputate in leo. Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis. Fusce tempor
            sagittis nunc, ut interdum ipsum vestibulum non. Proin dolor elit, aliquam eget tincidunt non, vestibulum ut
            turpis. In hac habitasse platea dictumst. In a odio eget enim porttitor maximus. Aliquam nulla nibh,
            ullamcorper aliquam placerat eu, viverra et dui. Phasellus ex lectus, maximus in mollis ac, luctus vel eros.
            Vivamus ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit, et volutpat eros dui et ante.
            Quisque ultricies mi nec leo ultricies mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend
            efficitur.`

const DashboardView: React.FC = () => {
  const navigate = useNavigate()

  // @ts-ignore
  return (
    <section style={{ padding: '0 40px 40px 20px' }}>
      <Stack horizontal horizontalAlign="space-around">
        <Stack.Item grow={3} style={{ overflow: 'hidden' }}>
          <TitledCard title="最近课程" subtitle="Recent Courses" indicator actions={
            <PrimaryButton onClick={() => navigate('/course')}>查看所有课程</PrimaryButton>
          }>
            {new Array(6)
              .fill({})
              .map(v =>
                <InfoCard
                  style={{ verticalAlign: 'top' }}
                  title="JavaScript高级程序设计"
                  subtitle={new Array(Math.floor(Math.random() * 5 + 1)).fill('JavaScript高级程序设计').join(' ')}
                  previewProps={coursePreviewProps} activity="Hello"
                  people={DocumentCardActivityPeople}
                  withModal
                  modalTitle="JavaScript高级程序设计"
                  modalBody={
                    <p>{content}</p>
                  }/>
              )}
          </TitledCard>
        </Stack.Item>
        <Stack.Item grow={1} disableShrink style={{ minWidth: '350px' }}>
          <TitledCard title="等级" subtitle="Level" bodyStyle={{ padding: '20px' }}>
            <ProgressIndicator label="Lv.1 40/100" description="距离下一等级还有60分，继续加油吧～" percentComplete={.4}
                               barHeight={5}/>
          </TitledCard>
        </Stack.Item>
      </Stack>

      <Stack horizontal horizontalAlign="space-around">
        <Stack.Item grow={1} className="gelp-home-list">
          <TitledList items={[
            {
              _id: '111111',
              name: '阅读《JavaScript高级程序设计》',
              content: '',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10,
              done: false,
              tasks: []
            },
            {
              _id: '222222',
              name: '阅读《JavaScript高级程序设计》',
              content: '',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10,
              done: false,
              tasks: []
            }
          ] as ScheduleItem[]} render={TitledListItem} title="计划" subtitle="Schedules" actions={
            <>
              <PrimaryButton style={{ marginRight: '8px' }}>查看所有计划</PrimaryButton>
              <DefaultButton>新建计划</DefaultButton></>
          }/>
        </Stack.Item>
        <Stack.Item grow={1} className="gelp-home-list">
          <TitledList items={[
            {
              name: '阅读《JavaScript高级程序设计》',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10
            },
            {
              name: '阅读《JavaScript高级程序设计》',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10
            }
          ]} render={TitledListItem} title="任务" subtitle="Assignments" actions={
            <PrimaryButton>查看所有任务</PrimaryButton>
          }/>
        </Stack.Item>
        <Stack.Item grow={1} className="gelp-home-list">
          <TitledList items={[
            {
              name: '阅读《JavaScript高级程序设计》',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10
            },
            {
              name: '阅读《JavaScript高级程序设计》',
              startTime: new Date('2022-12-02'),
              endTime: new Date(),
              total: 10
            }
          ]} render={TitledListItem} title="日志" subtitle="Logs" actions={
            <PrimaryButton>查看所有日志</PrimaryButton>
          }/>
        </Stack.Item>
      </Stack>

      <Stack horizontal horizontalAlign="space-around">
        <Stack.Item>
          <TitledCard title="日历" subtitle="Calendar">
            <Calendar
              dateRangeType={DateRangeType.Month}
              highlightSelectedMonth
              showGoToToday
              firstDayOfWeek={DayOfWeek.Monday}
              strings={defaultCalendarStrings}
            />
          </TitledCard>
        </Stack.Item>
        <Stack.Item style={{ overflow: 'hidden' }}>
          <TitledCard title="勋章墙" subtitle="Medals" indicator>
            {new Array(6).fill((
              <InfoCard
                title="JavaScript高级程序设计"
                subtitle="JavaScript高级程序设计"
                previewProps={coursePreviewProps} activity="Hello"
                people={DocumentCardActivityPeople}
                withModal
                modalTitle="JavaScript高级程序设计"
                modalBody={
                  <p>{content}</p>
                }/>
            ))}
          </TitledCard>
        </Stack.Item>
      </Stack>
    </section>
  )
}

export default DashboardView
