import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload)
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        updateUser(state, action) {
            const updatedUser = action.payload;
            const index = state.users.findIndex(user => user.id == updatedUser.id);
            if (index !== -1) {
            state.users[index] = updatedUser;
            } else {
            console.error(`User with id ${updatedUser.id} not found`);
            }
        }
    }
})

export const {addUser, deleteUser, updateUser} = userSlice.actions
export default userSlice.reducer