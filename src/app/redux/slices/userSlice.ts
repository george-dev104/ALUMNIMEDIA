import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Member } from '@/types/Member'
import { Channel } from '@/types/Channel'

// Define a type for the slice state
interface UserState {
    type: 'member' | 'channel' | null
    member: Omit<Member, 'id'> | null
    channel: Omit<Channel, 'sub'> | null
}

// Define the initial state using that type
const initialState: UserState = {
    type: null,
    member: null,
    channel: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => ({
            type: action.payload.type,
            member: action.payload.member,
            channel: action.payload.channel
        })
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer