import { GET_JUDGEMENTS_BY_USER_ID, JUDGE } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getJudgementsByUserId = createAsyncThunk(
  'judgement/getAll',
  async (user_id: string) => {
    return cloud.invoke(GET_JUDGEMENTS_BY_USER_ID, { user_id })
  }
)

export const judge = createAsyncThunk(
  'judgement/judge',
  async (data: { user_id: string, course_id: string, assignment_id: string, score: number }) => {
    return cloud.invoke(JUDGE, data)
  }
)

const judgementSlice = createSlice({
  name: 'judgement',
  initialState: {
    judgements: {} as {
      [course_id: string]: {
        [assignment_id: string]: {
          submitted: (UserInfo & { submissions: AttachmentItem[], state: 0 | 1 | 2 | 3 })[],
          unsubmitted: number
        }
      }
    }
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getJudgementsByUserId.fulfilled, (state, action) => {
        state.judgements = action.payload
      })
      .addCase(judge.fulfilled, (state, action) => {
        const { assignment_id, course_id, user_id } = action.payload
        if (assignment_id && course_id && user_id) {
          state.judgements[course_id][assignment_id].submitted.find(sub => sub._id === user_id)!.state = 2
        }
      })
  }
})

export default judgementSlice.reducer