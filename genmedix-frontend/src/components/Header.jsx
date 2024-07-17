import UserIcon from "../components/userIcon";
import SideBar from "../components/SideBar";
import SideBarButton from "../components/SideBarButton";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const Header = () => {
    const user = useStoreState(state => state.user)
    const isOpen = useStoreState(state => state.isOpen)
    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login')
            // console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className="relative h-[8%] left-0 flex justify-between px-6 pt-4">
            <div>
                <div className={`absolute h-12 left-0 top-0 flex justify-between md:justify-normal ${!isOpen && 'w-[60%]'}`}>
                    <div className='absolute md:hidden ml-2'>
                        <SideBarButton />
                    </div>
                    <SideBar />
                    <h1 className={`font-bold pt-4 pl-3 ${isOpen && 'hidden md:block'}`}>
                        <span className='text-green-500'>Gen</span><span className="text-blue-600">Medix</span>
                    </h1>
                </div>
            </div>
            {
                user ?
                    <div className="-mr-4 md:ml-0">
                        <button onClick={() => setDropDown(!dropDown)}><UserIcon name={user.displayName}/></button>
                        {dropDown && (
                            <div className="absolute right-4 mt-2 w-48 bg-gray-600 rounded-md shadow-lg z-10">
                                <button className="block px-4 py-2 text-sm hover:bg-gray-400 w-full text-left" aria-label="settings-button">Settings</button>
                                <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm hover:bg-gray-400 w-full text-left" aria-label="logout-button">Log out</button>
                            </div>
                        )}
                    </div>
                    :
                    <Link to='/login' className="-mr-4 md:ml-0">login/signup</Link>
            }
        </header>
    )
}

export default Header