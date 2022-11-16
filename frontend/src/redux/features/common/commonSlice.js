import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showShareModal: false,
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setShowShareModal: (state, action) => {
            state.showShareModal = action.payload;
        },
    },
});

export const { setShowShareModal } = commonSlice.actions;
export default commonSlice.reducer;
