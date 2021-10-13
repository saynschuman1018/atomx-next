import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showMenu: false,
}

export const { actions, reducer } = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.showMenu = !state.showMenu
    },
  },
})

export const {
  toggleMobileMenu,
} = actions
