import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "../../screens/home/Home"
import About from "../../screens/about/About"
import Login from "../../screens/login/Login"
import Signin from "../../screens/signin/Signin"
import Navbar from "../../components/Navbar";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={< Home />}/>
            <Route path='about' element={< About />}/>
            <Route path='login' element={< Login />}/>
            <Route path='login/:signin' element={< Signin />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
