import { createSlice } from "@reduxjs/toolkit";
import { getQuestionList } from "./quizApi";

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        isLoading: false,
        questions: []
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestionList.pending, (state)=>{
            state.isLoading = true
        });
        builder.addCase(getQuestionList.fulfilled, (state, actions)=>{
            state.isLoading = false
            state.questions = actions.payload
        });
        builder.addCase(getQuestionList.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export const { isLoading } = quizSlice.actions;

export default quizSlice.reducer