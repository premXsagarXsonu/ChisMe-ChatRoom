import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./pages/dashboardPage";
import IndexPage from "./pages/indexPage";
import ChatroomPage from "./pages/chatroomPage";
//import io from "socket.io-client";
//import makeToast from "./Toaster/toaster";


function App() {
 
return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/" 
          component={IndexPage} exact />
        <Route
          path="/login" 
          //render = {()=><LoginPage SetupSocket={SetupSocket} /> } 
          component={LoginPage}
          exact />
        <Route
          path="/register" 
          component={RegisterPage} exact />
        <Route
          path="/dashboard" 
          //render={() => <DashboardPage socket={socket} />} 
          component={DashboardPage}
          exact />
        <Route 
        path="/chatroom/:id" 
        //render={() => <ChatroomPage socket={socket} />} 
        component={ChatroomPage}
        exact />
      </Switch>
    </BrowserRouter>

  );
};
export default App
