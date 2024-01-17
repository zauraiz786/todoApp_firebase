import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig/firebaseConfig";

function Navbar() {
  const navigate = useNavigate();
  function signOutUser() {
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
    });
  }
  return (
    <>
      <div className="navbar bg-base-100 rounded">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">Todo App</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="about">About </Link>
            </li>
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link to="login">Login </Link>
                  </li>
                  <li>
                    <a onClick={signOutUser}>SignOut</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
