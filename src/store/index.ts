import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter'


const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  },
  devTools: true
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: { counter: CounterState }
export type AppDispatch = typeof store.dispatch
