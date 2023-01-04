import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import cloud from '@laf'
import { CHANGE_USER, GET_USER_BY_USER_ID, LOGIN, REGISTER } from '@config/api'

export const register = createAsyncThunk('user/register',
  async (data: { nickname: string, name: string, password: string, identity: 0 | 1 }) => {
    return await cloud.invoke(REGISTER, data)
  })

export const login = createAsyncThunk('user/login',
  async (data: { nickname: string, password: string, identity: 0 | 1 }) => {
    return await cloud.invoke(LOGIN, data)
  })

export const getUserByUserId = createAsyncThunk(
  'user/getOne',
  async (data: { user_id: string, token: string }) => {
    return cloud.invoke(GET_USER_BY_USER_ID, data)
  }
)

export const changeUserInfo = createAsyncThunk(
  'user/change',
  async (data: Partial<UserInfo>) => {
    return cloud.invoke(CHANGE_USER, data)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    identity: -1,
    nickname: '',
    name: '',
    token: '',
    expire: 0
  } as Partial<UserInfo>,
  reducers: {
    loggedIn(state: Partial<UserInfo>, action: PayloadAction<Partial<UserInfo>>) {
      // 将用户信息存入localStorage
      localStorage.setItem('gelp-user-info', JSON.stringify(action.payload))
      return action.payload
    },
    logout(state) {
      localStorage.removeItem('gelp-user-info')
    }
  },
  extraReducers(builder) {
    builder.addCase(changeUserInfo.fulfilled, (state, { payload }) => {
      Object.keys(payload).forEach(key => state[key as keyof UserInfo] = payload[key])
    })
  }
})

export const { loggedIn, logout } = userSlice.actions
export default userSlice.reducer
