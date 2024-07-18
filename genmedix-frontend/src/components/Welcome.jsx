import Box from "./Box"
import { FaRocketchat } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaBook } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import PropTypes from 'prop-types';


const Welcome = ({name}) => {

  return (
    <div className="my-4 h-[93%] w-[85%] md:w-[80%] mx-auto overflow-auto">
      <div className="text-4xl mb-12 md:mb-0 md:text-5xl font-bold ">
        {
          name ?
            <h1 className="mb-4">Hello! {name},</h1>
            : <span>Hi!</span>
        }
        {!name && <h1 className="mb-4"><span className='text-green-500'>Gen</span><span className="text-blue-600">Medix</span> Here</h1> }
        <h1>What would you like to do today?</h1>
      </div>
      <div className="mx-auto w-[95%] md:w-[80%] flex justify-around  mt-8 md:mt-28 flex-wrap">
        <Box icon={<FaRocketchat className="text-yellow-300 text-xl" />} feature={'Chat with Eliza'} link="/" />

        { name && <>
        <Box icon={<RxDashboard className="text-blue-500 text-xl" />} feature={'Dashboard'} link="/dashboard"/>
        <Box icon={<FaBook className="text-red-500 text-xl" />} feature={'Diary'} link="/diary"/></>}
       <Box icon={<GrResources className="text-purple-500 text-xl" />} feature={'Resources'} link="/resources"/>
      
      </div>
    </div>
  )
}

Welcome.propTypes = {
  name: PropTypes.string,
};

export default Welcome