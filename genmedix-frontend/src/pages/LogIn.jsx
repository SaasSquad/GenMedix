import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate()

    // const signInWithGoogle = () => {
    //     const provider = new auth.GoogleAuthProvider();
    //     auth.signInWithPopup(provider);
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Navigate('/')
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                setError('Incorrect email or password');
              } else {
                setError('network-request-failed');
              }
        }
    };

    return (
        <div className="flex w-screen h-screen text-left bg-gray-900 md:bg-white text-white">
            <form action="" onSubmit={handleLogin} className="w-[70%] md:w-[40%] lg:w-[30%] bg-gray-900 rounded-md md:p-12 flex flex-col justify-center m-auto z-10">
                <h1 className="text-2xl font-bold text-center pl-3"><Link to="/">
                <span className='text-green-500'>Gen</span><span className="text-blue-600">Medix</span></Link>
                </h1>
                <h2 className="text-xl text-center my-3 font-bold">Log in</h2>
                {error && <p className='text-red-700'>{error}</p>}
                <div className="my-3 text-blue-600">
                    <label htmlFor="name">Email:</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email" />
                </div>
                <div className="my-3 text-blue-600">
                    <label htmlFor="name">Password:</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password" />
                </div>
                <button type="submit" className="bg-blue-600 my-6 py-4 text-white w-[100%] rounded-md">log in</button>
                <div>
                    <p className="inline-block pr-1">Don't have an account?</p>
                    <Link to='/signup' className="text-blue-600">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default LogIn