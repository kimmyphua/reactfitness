import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Profile from "./Components/Views/Profile"
import Home from "./Components/Landing/Home"
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import axios from "axios";
import Navigation from "./Components/Views/Navigation";
import CalculatorForm from "./Components/Views/CalculatorForm";
import Exercise from "./Components/Views/Exercise";
import LandingPage from "./Components/Landing/LandingPage";
import Settings from "./Components/Auth/Settings";
import ResetPwd from "./Components/Auth/ResetPwd";

function App() {

    const [auth, setAuth] = useState({})
    const [user, setUser] = useState({})


    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/api/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setAuth(true)
                setUser(data.user)

            } catch (e) {
                console.log(e.response)
                setAuth(false)
                setUser(null)
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [auth])

    // console.log(user)
  return (
    <div className="App">
    <BrowserRouter>
        <Navigation setAuth={setAuth} setUser={setUser} user={user} />
      <Switch>
          <Route path="/" exact>
              <LandingPage auth={auth} user={user} setUser={setUser}/>
          </Route>
          <Route path="/reset-password/:token" exact>
              <ResetPwd auth={auth} setAuth={setAuth}/>
          </Route>
          <Route path="/login" exact>
              <Login auth={auth} setAuth={setAuth}/>
          </Route>
          <Route path="/register" exact>
              <Register auth={auth} setAuth={setAuth}/>
          </Route>

          <PrivateRouter auth={auth} user={user} path="/exercise" exact Component={Exercise} />
          <PrivateRouter auth={auth} user={user} path="/profile" exact Component={Profile} />
          <PrivateRouter auth={auth} user={user} path="/calculator" exact Component={CalculatorForm} />
          {/*<PrivateRouter auth={auth} user={user} path="/settings" exact Component={Settings} />*/}
      </Switch>
    </BrowserRouter>
    </div>
  );
}
function PrivateRouter({auth, user, Component, path, ...rest}){
    return(
        <>
            { (auth) ?
                <Route path={path} >
                    <Component user={user}/>
                </Route> : <Redirect to="/login" />
            }
        </>
    )
}
export default App;
