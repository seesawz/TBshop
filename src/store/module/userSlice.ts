import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:{}
  },
  reducers: {
   SAVEUSERINFO(state,action){
    state.userInfo = action.payload
   }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { SAVEUSERINFO } = userSlice.actions

export default userSlice.reducer