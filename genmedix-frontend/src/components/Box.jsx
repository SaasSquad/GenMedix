import { Link } from 'react-router-dom';
function Box({ icon, feature, link }) {

  return (
    <Link to={link} className="">
      <div className="transition-all duration-500 ease-in-out delay-150 rounded-md w-52 h-24 hover:-translate-y-1 hover:scale-110 bg-gray-600 hover:bg-white text-white hover:text-black m-2 p-4 hover:font-bold cursor-pointer">
        {icon}
        <h2>{feature}</h2>
      </div>
    </Link>
  )
}

export default Box