import SideIcon from "./SideIcon";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaBook } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import SideBarButton from "./SideBarButton";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPlus } from "react-icons/fa6";

const SideBar = () => {
  const user = useStoreState(state => state.user)
  const isOpen = useStoreState(state => state.isOpen)
  const setIntro = useStoreActions(actions => actions.setIntro)
  const setIsOpen = useStoreActions(actions => actions.setIsOpen)

  const handleChat = () => {
    localStorage.removeItem('chatMessages');
    setIntro(true)
    setIsOpen(false)
    window.location.href = '/';
  }

  return (
    <div className={`relative w-0 md:w-auto md:flex h-screen bg-gray-600 overflow-hidden transition-all duration-500 ease-in-out ${isOpen && 'w-56'} z-10`}>
      <div
        className={`w-12 pl-2 md:pl-8 pr-10 bg-gray-600 text-white md:flex flex-col items-center transition-all duration-500 ease-in-out ${isOpen && 'w-52 flex'
          }`}
      >
        <SideBarButton />

        <button onClick={handleChat} className={`${isOpen ? 'w-36 border-2 px-2 border-gray-400 rounded-lg' : 'pl-8 w-auto'} h-12 flex items-center hover:font-bold hover:bg-gray-700`}>
      <FaPlus className="flex items-center justify-center mr-2 p-2 w-8 h-8 bg-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-gray-600"/>
          <p className={` ${isOpen ? 'flex' : 'hidden'} font-bold `}>
            New Chat
          </p>
        </button>

        <div className={`absolute bottom-12 mt-4 ${isOpen ? 'pl-24 w-80' : 'pl-8 w-16'}`}>
          <SideIcon icon={<FaRocketchat className="text-yellow-300 text-xl" />} feature={'Chat with Eliza'} link="/" />
          {user && <>
            <SideIcon icon={<RxDashboard className="text-blue-600 text-xl" />} feature={'Dashboard'} link="/dashboard" />
            <SideIcon icon={<FaBook className="text-red-500 text-xl" />} feature={'Diary'} link="/diary" /></>}

          {/* <SideIcon icon={<FaMagnifyingGlassLocation className="text-green-500 text-xl" />} name={'Nearby Therapy'} link="/resources" /> */}
          <SideIcon icon={<GrResources className="text-purple-600 text-xl" />} feature={'Resources'} link="/resources" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
