import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Profile from "./Components/Views/Profile"
import Home from "./Components/Views/Home"
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import axios from "axios";
import Navigation from "./Components/Views/Navigation";
import CalculatorForm from "./Components/Views/CalculatorForm";
import Statistic from "./Components/Views/Statistic";
import Exercise from "./Components/Views/Exercise";

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
          <Route path="/calculator" exact>
              <CalculatorForm auth={auth} user={user}/>
          </Route>
          <Route path="/login" exact>
              <Login auth={auth} setAuth={setAuth}/>
          </Route>
          <Route path="/register" exact>
              <Register auth={auth} setAuth={setAuth}/>
          </Route>
          <Route path="/test" exact>
              <Statistic/>
          </Route>
          <PrivateRouter auth={auth} user={user} path="/home" exact Component={Home} />
          <PrivateRouter auth={auth} user={user} path="/profile" exact Component={Profile} />
          <PrivateRouter auth={auth} user={user} path="/exercise" exact Component={Exercise} />

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
