/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.JPG' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

type ScheduleItem = {
  _id: string,
  name: string,
  content: string,
  startTime: Date,
  endTime: Date,
  done: boolean,
  total: number,
  tasks: any[]
}

type CourseItem = {
  _id: string,
  teacher_id: string,
  // intro?: string,
  cover?: string,
  name: string,
  content: string,
  published: boolean,
  deleted: boolean,
  assignments: []
}

type NavItem = {
  name: string,
  url: string,
  key: string
}

type Attachment = {
  _id: string,
  name: string,
  fileType?: string,
  size?: string,
  sizeRaw: number,
  iconName?: string,
  url: string
}

type AssignmentItem = {
  _id: string,
  course_id: string,
  name: string,
  content: string,
  score: number,
  startTime: Date,
  endTime: Date,
  published: boolean,
  deleted: boolean,
  // state: 0 | 1 | 2 | 3,
  attachments: Attachment[]
  // 0未提交 1已提交未评分 2已提交已评分 3作业已过期
}

type Student = {
  _id: string,
  name: string,
  phone: string,
  age?: number,
  grade?: number,
  email?: string,
  score: number,
  level: number
}

type CommentItem = {
  _id: string,
  student_id?: string,
  teacher_id?: string,
  course_id: string,
  content: string,
  date: Date
}
