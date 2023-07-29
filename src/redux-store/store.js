import { configureStore } from "@reduxjs/toolkit";
import todoSlicer from "./todoSlicer";

export const store = configureStore({
    reducer: {
        todo: todoSlicer
    }
})