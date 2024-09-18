import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [isSignIn, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignIn)
  }

  return (
    <div>
      <Header />

      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_large.jpg" alt="" srcset=""/>
      </div>

      <form className='absolute rounded-lg text-white p-10 w-4/12 bg-black left-0 right-0 mx-auto my-36 bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>

        {
          !isSignIn &&( <input type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)
        }
        
        <input type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
        <input type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignIn ? "Sign In" : "Sign Up"}</button>
        <p onClick = {toggleSignInForm} className='text-sm cursor-pointer'>{isSignIn ? "New to Netflix? Sign Up Now." : "Already a User ? Sign In Now."}</p>
      </form>


    </div>


  )
}

export default Login