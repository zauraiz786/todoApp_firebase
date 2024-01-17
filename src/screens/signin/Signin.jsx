import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig/firebaseConfig";

function Signin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  function createUser(event) {
    event.preventDefault();
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/')
        console.log(user);
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
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Sign in
          </h1>
          <form className="space-y-4" onSubmit={createUser}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input type="text" placeholder="Email Address" className="w-full input input-bordered" onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="w-full input input-bordered" onChange={(e)=>{setPassword(e.target.value)}}required/>
            </div>

            <div>
              <button className="btn btn-block" type="submit">{loading ? <button className="loading loading-spinner loading-sm"></button> : 'Sign in'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
