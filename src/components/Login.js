import React, { useRef, useState } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMAGE_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = (e) => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message);
    if (message) return null;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
       const user = userCredential.user;  
        updateProfile(user, {
          displayName: name.current.value , photoURL: USER_AVATAR ,
        }).then(() => {
          const {uid, email , displayName, photoURL} = auth.currentUser;
          dispatch(addUser({
           uid: uid,
           email: email,
           displayName: displayName,
           photoURL:photoURL
          }))
        }).catch((error) => {
          console.log(error,"error");
          setErrorMessage(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage+ "-" +errorCode)
      });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage+ "-" +errorCode)
      });
    }
  }

  return (
    <div>
      <Header />

      <div className='absolute'>
        <img src={BG_IMAGE_URL} alt="" srcset="" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute rounded-lg text-white p-10 w-4/12 bg-black left-0 right-0 mx-auto my-36 bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {
          !isSignInForm && (<input type="text" ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)
        }

        <input type="text" ref={email} placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
        <input type="password" ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
        <p className='py- 2 my-4 colour text-red-500 font-bold text-lg'>{errorMessage}</p>
        <button onClick={handleButtonClick} className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p onClick={toggleSignInForm} className='text-sm cursor-pointer'>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already a User ? Sign In Now."}</p>
      </form>


    </div>


  )
}

export default Login