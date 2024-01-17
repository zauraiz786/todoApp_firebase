import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig/firebaseConfig";

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate();

  function checkUser(event) {
    event.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate('/')
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  }
  return (
    <>
      <div className="relative flex flex-col justify-center h-[700px] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Login
          </h1>
          <form className="space-y-3" onSubmit={checkUser}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input type="text" placeholder="Email Address" className="w-full input input-bordered input-primary" onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered input-primary" onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            Don't have an account?
            <Link className="text-gray-600 hover:underline hover:text-blue-600" to="signin">
              Create One..
            </Link>
            <div>
              <button className="btn btn-primary" type="submit">{loading ? <button className="loading loading-spinner text-primary bg-white"></button> : 'login'}</button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
