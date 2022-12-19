import { CREATE_LOG, GET_LOGS_BY_USER_ID } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getLogsByUserId = createAsyncThunk(
  'log/getAll',
  async (user_id: string) => {
    return await cloud.invoke(GET_LOGS_BY_USER_ID, { user_id })
  }
)

export const createLog = createAsyncThunk(
  'log/create',
  async (data: { user_id: string, name: string, content: string, date: string, courses: string[] }) => {
    return await cloud.invoke(CREATE_LOG, data)
  }
)

const logSlice = createSlice({
  name: 'log',
  initialState: {
    logs: [] as (LogItem & { courses: (CourseItem & { user: UserInfo })[] })[]
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLogsByUserId.fulfilled, (state, action) => action.payload)
    .addCase(createLog.fulfilled, (state, action) => {
      state.logs.unshift(action.payload.data)
    })
  }
})

export default logSlice.reducer