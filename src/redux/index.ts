import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@redux/slices/userSlice'
import courseReducer from '@redux/slices/courseSlice'
import scheduleReducer from '@redux/slices/scheduleSlice'
import logReducer from '@redux/slices/logSlice'
import assignmentReducer from '@redux/slices/assignmentSlice'
import permissionReducer from '@redux/slices/permissionSlice'
import judgementReducer from '@redux/slices/judgementSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    schedule: scheduleReducer,
    log: logReducer,
    assignment: assignmentReducer,
    permission: permissionReducer,
    judgement: judgementReducer
  },
  devTools: true
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: { counter: CounterState }
export type AppDispatch = typeof store.dispatch

export default store
