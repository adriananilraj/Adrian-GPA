import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiKey: 'AIzaSyDUuimn5T9m40ISQC_MllDzXUsJLCohOh4',
  searchHistory: [],
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.searchHistory.push(action.payload)
    },
    clearSearch: (state) => {
      state.searchHistory = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSearch, clearSearch } = indexSlice.actions

export default indexSlice.reducer