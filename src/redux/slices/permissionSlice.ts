import { GET_PERMISSIONS_BY_USER_ID, PERMIT } from '@config/api'
import cloud from '@laf'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getPermissionsByUserId = createAsyncThunk(
  'permission/getAll',
  async (user_id: string) => {
    return cloud.invoke(GET_PERMISSIONS_BY_USER_ID, { user_id })
  }
)

export const permit = createAsyncThunk(
  'permission/permit',
  async (data: { user_id: string, course_id: string, granted: boolean }) => {
    return cloud.invoke(PERMIT, data)
  }
)

const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    permissions: {} as {
      [_id: string]: {
        _id: string,
        user_id: string,
        course_id: string,
        granted: boolean,
        dealed: boolean,
        date: string,
        score: number,
        user: UserInfo
      }[]
    }
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPermissionsByUserId.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(permit.fulfilled, (state, action) => {
        const { user_id, course_id } = action.payload.data
        const courseIndex = state.permissions[course_id].findIndex(info => info.user_id === user_id)
        state.permissions[course_id].splice(courseIndex, 1)
      })
  }
})

export default permissionSlice.reducer