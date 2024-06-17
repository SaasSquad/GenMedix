import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Resources from './pages/Resources'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import { auth } from './firebase'
import Diary from './pages/Diary'
import { useStoreActions } from 'easy-peasy'

function App() {
  const setUser = useStoreActions(actions => actions.setUser)

  useEffect(() => {
    // This callback is invoked whenever the user's authentication state changes.
    const unsubscribe = auth.onAuthStateChanged(user => {

      // with the new user object. This updates the user state in the store.
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
      <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/diary' element={<Diary />} />
      </Routes>
    </Router>
  )
}

export default App
