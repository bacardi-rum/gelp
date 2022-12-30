import { CREATE_COURSE, CREATE_MEDAL, GET_COURSES_BY_NAME, GET_COURSES_BY_USER_ID, GET_COURSE_BY_ID, REQUEST_COURSE, SEND_COMMENT } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const getCoursesByUserId = createAsyncThunk(
  'course/getByUserId',
  async (data: { user_id: string, identity: 0 | 1 }) => {
    return await cloud.invoke(GET_COURSES_BY_USER_ID, data)
  }
)

export const sendComment = createAsyncThunk(
  'course/sendComment',
  async (data: { user_id: string, course_id: string, content: string, date: string }) => {
    return cloud.invoke(SEND_COMMENT, data)
  })

export const getCoursesByName = createAsyncThunk(
  'course/getByName',
  async (name: string) => {
    return cloud.invoke(GET_COURSES_BY_NAME, { name })
  }
)

export const getCourseById = createAsyncThunk(
  'course/getById',
  async (_id: string) => {
    return cloud.invoke(GET_COURSE_BY_ID, { _id })
  }
)

export const createCourse = createAsyncThunk(
  'course/create',
  async (data: { user_id: string, name: string, content: string, coverUrl: string, needPassword: boolean, password: string, needPermission: boolean }) => {
    return cloud.invoke(CREATE_COURSE, data)
  }
)

export const uploadCover = createAsyncThunk(
  'course/uploadCover',
  async (data: Parameters<typeof cloud['upload']>) => {
    return cloud.upload(...data)
  }
)

export const requestCourse = createAsyncThunk(
  'course/request',
  async (data: { user_id: string, course_id: string, password: string }) => {
    return cloud.invoke(REQUEST_COURSE, { ...data, date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
  }
)

export const createMedal = createAsyncThunk(
  'course/createMedal',
  async (data: Omit<MedalItem, '_id' | 'deleted'>) => {
    return cloud.invoke(CREATE_MEDAL, data)
  }
)

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [] as (CourseItem & {
      date: string,
      user: UserInfo,
      assignments: (AssignmentItem & { attachments: AttachmentItem[] })[],
      medals: MedalItem[],
      comments: (CommentItem & { user: UserInfo })[],
      rankings: UserInfo[]
    })[],
    cache: {} as { [key: string]: CourseItem & { user: UserInfo } }
  },
  reducers: {
    assignmentCreated(state, action) {
      console.log(action.payload)

      const assignment = action.payload
      const course = state.courses.find(c => c._id === assignment.course_id)
      course?.assignments?.push(assignment)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCoursesByUserId.fulfilled, (state, action) => { state.courses = action.payload.courses })
      .addCase(sendComment.fulfilled, (state, action) => {
        const { data, res } = action.payload
        const course = state.courses.find(c => c._id === data.course_id)
        res.ok && course?.comments.push(data)
      })
      .addCase(getCoursesByName.fulfilled, (state, action) => {
        action.payload.courses.forEach((c: CourseItem & { user: UserInfo }) => {
          state.cache[c._id] = c
        })
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        const course = action.payload.course as CourseItem & { user: UserInfo }
        state.cache[course._id] = course
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload.course)
      })
      .addCase(createMedal.fulfilled, (state, action) => {
        const medal = action.payload.data
        const course = state.courses.find(course => course._id === medal.course_id)
        course?.medals?.push(medal)
      })
  }
})

export default courseSlice.reducer
export const { assignmentCreated } = courseSlice.actions