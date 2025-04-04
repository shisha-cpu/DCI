// store/slices/userSlice.js
'use client'

import { createSlice } from '@reduxjs/toolkit'

// Helper functions for localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.warn('Failed to load state from localStorage', e)
    return undefined
  }
}

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('userState', serializedState)
  } catch (e) {
    console.warn('Failed to save state to localStorage', e)
  }
}

// Initial state with hydration from localStorage
const initialState = loadFromLocalStorage() || {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
      saveToLocalStorage(state)
    },
    loginFailure(state, action) {
      state.error = action.payload
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('userState')
    },
    // Optional: Add a reducer to update user data
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }
      saveToLocalStorage(state)
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions
export default userSlice.reducer