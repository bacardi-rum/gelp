import { GET_COURSES_BY_USER_ID, SEND_COMMENT } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getCoursesByUserId = createAsyncThunk('course/getAll',
  async (user_id: string) => {
    return await cloud.invoke(GET_COURSES_BY_USER_ID, { user_id })
  }
)

export const sendComment = createAsyncThunk('course/sendComment',
  async (data: { user_id: string, course_id: string, content: string, date: string }) => {
    return cloud.invoke(SEND_COMMENT, data)
  })

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
    })[]
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCoursesByUserId.fulfilled, (state, action) => action.payload)
      .addCase(sendComment.fulfilled, (state, action) => {
        const { data, res } = action.payload
        const course = state.courses.find(c => c._id === data.course_id)
        res.ok && course?.comments.unshift(data)
      })
  }
})

export default courseSlice.reducer