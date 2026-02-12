import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Error from "./utils/Error";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Toaster position="bottom-left" />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<ConnectionRequests />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
