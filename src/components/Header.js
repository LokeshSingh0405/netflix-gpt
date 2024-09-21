import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  useEffect(() => { 
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      const {uid, email , displayName, photoURL} = user;
       dispatch(addUser({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL:photoURL
       }))
       navigate("/browse");
    } else {
      dispatch(removeUser())
      navigate("/")
    }
  });

  return () => unSubscribe();
},[])
  
  const handleSignOut = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
      // An error happened.
      // navigate("/error");
    });
    
  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img className='w-44'src= {LOGO} alt="Logo" />
      {user && (<div className='flex'> 
        <img className = "h-14 w-12 my-2 mx-3 rounded" src={user?.photoURL} alt="user-icon" />
        <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
      </div>)}
    </div>
  )
}

export default Header