import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGE, USER_LOGO_URL } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL
        }))
        
        navigate("/browse");
      } else {
        dispatch(removeUser())
        navigate("/")
      }
    });
    



    return () => unSubscribe();
  }, [dispatch, navigate])

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
      // An error happened.
      // navigate("/error");
    });

  }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between '>
      <img className='w-44' src={LOGO} alt="Logo" />
      {user && (<div className='flex'>
      { showGptSearch && ( <select className='bg-gray-900 text-white py-2 px-3 rounded-lg m-2' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGE.map((language) => (
              <><option key = {language.identifier} value={language.identifier}>{language.name}</option></>
            ))
          }

        </select>)}
        <button onClick={handleGptSearchClick} className='text-white px-2 mx-2 my-2 rounded-lg bg-purple-600'>{showGptSearch ? "Home Page" : "GPT Search"}</button>
        <img className="h-14 w-12 my-2 mx-3 rounded" src={USER_LOGO_URL} alt="user-icon" />
        <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
      </div>)}
    </div>
  )
}

export default Header