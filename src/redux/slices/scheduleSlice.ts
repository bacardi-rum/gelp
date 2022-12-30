import { CREATE_SCHEDULE, GET_SCHEDULES_BY_USER_ID } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getSchedulesByUserId = createAsyncThunk('schedule/getAll',
  async (user_id: string) => {
    return await cloud.invoke(GET_SCHEDULES_BY_USER_ID, { user_id })
  })

export const createSchedule = createAsyncThunk('schedule/create',
  async (data: { user_id: string, name: string, content: string, startTime: string, endTime: string, assignments: string[] }) => {
    return await cloud.invoke(CREATE_SCHEDULE, data)
  })

const schedileSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedules: [] as (ScheduleItem & { assignments: AssignmentItem[] })[]
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSchedulesByUserId.fulfilled, (state, action) => action.payload)
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload.data)
      })
  }
})

export default schedileSlice.reducer