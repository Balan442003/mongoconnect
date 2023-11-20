// store.js

import { configureStore } from "@reduxjs/toolkit";

import { adminApi } from "./adminApi";

const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(adminApi.middleware),
});

export default store;