import { CREATE_ASSIGNMENT, GET_COMING_ASSIGNMENTS_BY_USER_ID, GET_SCHEDULES_BY_USER_ID } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAssignmentsByUserId = createAsyncThunk(
  'assignment/getTop10',
  async (user_id: string) => {
    return await cloud.invoke(GET_COMING_ASSIGNMENTS_BY_USER_ID, { user_id })
  })

export const createAssignment = createAsyncThunk(
  'assignment/create',
  async (data: { course_id: string, name: string, content: string, score: number, startTime: string, endTime: string, attachmentKeys: { key: string, name: string }[] }) => {
    return cloud.invoke(CREATE_ASSIGNMENT, data)
  }
)

export const uploadAttachments = createAsyncThunk(
  'course/uploadAttachments',
  async (data: { user_id: string, course_id: string, assignmentName: string, attachments: File[] }) => {
    const { user_id, course_id, assignmentName, attachments } = data
    const task: Promise<any>[] = [], keys: { key: string, name: string }[] = []
    for (let i = 0; i < attachments.length; i++) {
      const key = `${user_id}_${course_id}_${assignmentName}_${attachments[i].name}`
      keys.push({ key, name: attachments[i].name })
      task.push(cloud.upload(key, attachments[i], attachments[i].type))
    }
    return await Promise.all(task).then(() => keys)
  }
)

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignments: [] as (AssignmentItem)[]
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAssignmentsByUserId.fulfilled, (state, action) => action.payload)
  }
})

export default assignmentSlice.reducer