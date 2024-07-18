import ChatInput from "../components/ChatInput";
import ChatWindow from "../components/ChatWindow";
import { useRef, useEffect } from "react";
import Welcome from "../components/Welcome"
import Header from "../components/Header"
import { Link } from 'react-router-dom';
// import Preloader from "./Preloader";
import { useStoreActions, useStoreState } from "easy-peasy";

const Home = () => {
    // Getting the state and actions from the store
    const user = useStoreState(state => state.user)
    const setIntro = useStoreActions(actions => actions.setIntro)
    const intro = useStoreState(state => state.intro);
    const stayLoggedOut = useStoreState(state => state.stayLoggedOut);
    const setStayLoggedOut = useStoreActions(actions => actions.setStayLoggedOut)
    const isOpen = useStoreState(state => state.isOpen)
    const setIsOpen = useStoreActions(actions => actions.setIsOpen)
    const setChatMessages = useStoreActions(actions => actions.setChatMessages)
    const dropdownRef = useRef(null);

    // useEffect to handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect to load saved chat messages from local storage on component mount
    useEffect(() => {
        const savedConversation = JSON.parse(localStorage.getItem('chatMessages'));
        if (savedConversation) {
            setChatMessages(savedConversation);
            setIntro(false)
        }
    }, []);

    // if (!user) return <Preloader />


    return (
        <div ref={dropdownRef} className="bg-gray-800 h-screen leading-7 text-white w-screen overflow-auto">
            <Header />
            <div className={`relative h-[80%] transition-all duration-500 ease-in-out ${isOpen && 'md:ml-40'}`}>
                {
                    intro ?
                        (
                            user ? <Welcome name={user.displayName} />
                                : <Welcome />
                        )
                        : <ChatWindow />
                }
                <ChatInput />
            </div>


            {
                (user || stayLoggedOut) ?
                    ""
                    : <div className="absolute bg-black bg-opacity-80 top-0 left-0 bottom-0 right-0 z-20">
                        <div className="relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80%] md:w-[30%] bg-gray-800 rounded-md p-16 text-center text-lg font-bold">
                            <h2>GET STARTED</h2>
                            <div className="mt-12 flex flex-col md:flex-row justify-center">
                                <Link to="/login" className="bg-blue-600 my-4 md:my-0 py-1 px-4 rounded-sm md:mr-6 outline-none">Log in</Link>
                                <Link to="/signup" className="bg-blue-600 py-1 px-4 rounded-sm outline-none">Sign up</Link>
                            </div>
                            <button onClick={() => setStayLoggedOut(!stayLoggedOut)} className="mt-4 text-sm text-gray-400">Stay logged out</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Home