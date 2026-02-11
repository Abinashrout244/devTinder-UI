import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import Feed from "../components/Feed";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    Feed: feedSlice,
  },
});

export default appStore;
