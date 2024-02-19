import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestionList = createAsyncThunk(
    "questionlist",
    async (data, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axios({
                url: "https://65cc726ddd519126b83e79a9.mockapi.io/questions"
            })
            if (response.status === 200) {
                return fulfillWithValue(response?.data);
            } else {
                console.log("error: ", response?.data?.message);
                return rejectWithValue();
            }
        } catch (error) {
            console.log('error: ', error);
            return rejectWithValue();
        }
    }
)