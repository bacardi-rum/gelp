import { GET_COMING_ASSIGNMENTS_BY_USER_ID, GET_SCHEDULES_BY_USER_ID } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAssignmentsByUserId = createAsyncThunk('assignment/getTop10',
  async (user_id: string) => {
    return await cloud.invoke(GET_COMING_ASSIGNMENTS_BY_USER_ID, { user_id })
  })

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