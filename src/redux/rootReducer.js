import { combineReducers } from "@reduxjs/toolkit";
import quizSlice from "../modules/quiz/redux/quizSlice";

export const rootReducer = combineReducers({
    quiz: quizSlice
})
