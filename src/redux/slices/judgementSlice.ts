import { GET_JUDGEMENTS_BY_USER_ID } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getJudgementsByUserId = createAsyncThunk(
  'judgement/getAll',
  async (user_id: string) => {
    return cloud.invoke(GET_JUDGEMENTS_BY_USER_ID, { user_id })
  }
)

const judgementSlice = createSlice({
  name: 'judgement',
  initialState: {
    judgements: {} as {
      [course_id: string]: {
        [assignment_id: string]: {
          submitted: (UserInfo & { submissions: AttachmentItem[] })[],
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
  }
})

export default judgementSlice.reducer