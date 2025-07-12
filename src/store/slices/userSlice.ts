import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  currentUser: User | null
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set current user
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    
    // Action to add user to list
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    
    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    // Action to set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    
    // Action to reset state
    resetUser: (state) => {
      state.currentUser = null
      state.error = null
    }
  },
})

// Export actions
export const { setCurrentUser, addUser, setLoading, setError, resetUser } = userSlice.actions

// Export reducer
export default userSlice.reducer 