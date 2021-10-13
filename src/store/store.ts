import { combineReducers } from 'redux'
import { curtainReducer } from './reducers'
import { sliceReducers } from './slices'
import { configureStore } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch as baseUseDispatch } from 'react-redux'

const rootReducer = combineReducers({
  curtainPos: curtainReducer,
  ...sliceReducers,
})

export type RootState = ReturnType<typeof rootReducer>

export const createStore = (state: Partial<RootState> = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: state,
})

export const store = createStore()

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => baseUseDispatch<AppDispatch>()
export const useSelector = createSelectorHook<RootState>()
