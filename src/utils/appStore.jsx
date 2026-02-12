import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    Feed: feedSlice,
    request: requestSlice,
    connection: connectionSlice,
  },
});

export default appStore;
