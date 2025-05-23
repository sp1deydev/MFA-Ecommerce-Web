import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderBar from "./components/header";
import checkAuth from "./utils/checkAuth";
import { userSlice } from "./redux/userSlice";
import { authApi } from "./api/authApi";
import { toast } from "react-toastify";
import { systemApi } from "./api/systemApi";
import { mfaSlice } from "./redux/mfaSlice";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function App() {
  const dispatch = useDispatch();
  //auto login
  useEffect(() => {
    
    const autoLogin = async () => {
      dispatch(userSlice.actions.setIsLoading(true));
      if (!checkAuth()) {
        dispatch(userSlice.actions.setIsLoading(false));
        return;
      }
      try {
        const res = await authApi.getCurrentUser();
        if (!res.data.success) {
          dispatch(userSlice.actions.removeCurrentUser());
          dispatch(userSlice.actions.setIsLoading(false));
          toast.error(res.data.message);
          return;
        }
        const { user } = res.data;
        const currentUser = {
          id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          isConfig: user.isConfig,
          createdAt: user.createdAt,
        };
        dispatch(userSlice.actions.setCurrentUser(currentUser));
        dispatch(userSlice.actions.setIsLoading(false));
      } catch (err) {
        dispatch(userSlice.actions.removeCurrentUser());
        dispatch(userSlice.actions.setIsLoading(false));
        toast.error(err.response.data.message || "Loi dang nhap");
      }
    };
    autoLogin();
  }, [dispatch]);

  //auto get cart api

  //auto go to top when search
  return (
    <Router>
      <div>
        <Routers />
      </div>
        <TawkMessengerReact
          propertyId="648c198894cf5d49dc5e0d5f"
          widgetId="1h31k7fuq"
        />
    </Router>
  );
}

export default App;
