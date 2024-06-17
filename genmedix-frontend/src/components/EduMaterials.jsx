const EduMaterials = ({link, title, type}) => {
    return ( <>
    <div className="border border-blue-400 border-4 p-4 mb-4"><a href={link}>
          <p className="mb-8 md:text-2xl">
            {title}
          </p>
        </a><p className="bg-gray-700 w-fit p-[0.2rem] rounded-sm">{type}</p></div></> );
}
 
export default EduMaterials;