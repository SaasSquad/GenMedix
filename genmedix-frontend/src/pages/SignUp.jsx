import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

const SignUp = () => {
    const name = useStoreState(state => state.name);
    const setName = useStoreActions(actions => actions.setName)
    const email = useStoreState(state => state.email);
    const setEmail = useStoreActions(actions => actions.setEmail)
    const password = useStoreState(state => state.password);
    const setPassword = useStoreActions(actions => actions.setPassword)
    const error = useStoreState(state => state.error);
    const setError = useStoreActions(actions => actions.setError)
    const Navigate = useNavigate()

    // const validatePassword = (password) => {
    //     const minLength = 8;
    //     const hasUppercase = /[A-Z]/.test(password);
    //     const hasNumber = /\d/.test(password);
    //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    //     return password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;
    //   };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        // if (!validatePassword(password)) {
        //     setError("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character");
        //     return;
        //   }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            Navigate('/')
            // console.log('User signed up:', userCredential.user);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("An account with this email already exists");
              } else {
                setError("Failed to sign up");
              }
        }
    };

    return (
        <div className="flex w-screen h-screen text-left bg-gray-900 md:bg-white text-white">
            <form action="" onSubmit={handleSignUp} className="w-[70%] md:w-[40%] lg:w-[30%] bg-gray-900 rounded-md md:p-12 flex flex-col justify-center m-auto z-10">
                <h1 className="text-xl font-bold text-center pl-3"><Link to="/">
                    <span className='text-green-500'>Gen</span><span className="text-blue-600">Medix</span></Link>
                </h1>
                <h2 className="text-xl text-center my-3 font-bold">Sign up</h2>
                <div className="my-3 text-blue-600">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name" />
                </div>
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
                <button type="submit" className="bg-blue-600 my-6 py-4 text-white w-[100%] rounded-md">Sign up</button>
                <div>
                    <p className="inline-block pr-1">Already have an account?</p>
                    <Link to='/login' className='text-blue-600'>log in</Link>
                </div>
                {error && <p className='text-red-700'>{error}</p>}
            </form>
        </div>
    )
}

export default SignUp