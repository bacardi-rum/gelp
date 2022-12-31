type UserInfo = {
  _id: string,
  identity: -1 | 0 | 1
  avatarUrl?: string,
  nickname: string,
  name: string,
  password: string,
  phone?: string,
  age?: number,
  grade?: number,
  email: string,
  score?: number,
  level?: number
  token?: string,
  expire?: number
}

type CourseItem = {
  _id: string,
  user_id: string,
  coverUrl?: string,
  name: string,
  content: string,
  needPassword?: boolean,
  password: boolean,
  needPermission?: boolean,
  published: boolean,
  deleted: boolean,
}

type AttachmentItem = {
  _id: string,
  assignment_id: string,
  name: string,
  fileType?: string,
  size?: string,
  sizeRaw?: number,
  iconName?: string,
  url: string,
  user_id?: string
}

type AssignmentItem = {
  _id: string,
  course_id: string,
  name: string,
  content: string,
  score: number,
  startTime: string,
  endTime: string,
  published: boolean,
  deleted: boolean,
  attachmentCount?: number,
  scored?: number,
  state?: 0 | 1 | 2 | 3,
  done?: boolean
  // 0未提交 1已提交未评分 2已提交已评分 3作业已过期,
  submissionCount?: number
}

type ScheduleItem = {
  _id: string,
  name: string,
  content: string,
  startTime: string,
  endTime: string,
  done: boolean,
  assignmentCount: number
}

type CommentItem = {
  _id: string,
  user_id: string,
  course_id: string,
  content: string,
  date: string
}

type LogItem = {
  _id: string,
  user_id: string,
  name: string,
  content: string,
  date: string,
  deleted: boolean
}

type MedalItem = {
  _id: string,
  course_id: string,
  name: string,
  content?: string,
  score: number,
  iconName: string,
  deleted: boolean
}

type NavItem = {
  name: string,
  url: string,
  key: string,
  identity?: 0 | 1 | 2
}
