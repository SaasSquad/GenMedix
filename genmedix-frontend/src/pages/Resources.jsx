import React, { useState } from 'react';
import MentalHealthNews from "../components/MentalHealthNews";
import MentalHealthNewsPage from './MentalHealthNewsPage';
import Header from '../components/Header';
import EduMaterialsPage from './EduMaterialsPage';
import OtherToolsPage from './OtherToolsPage';
import { useStoreState } from 'easy-peasy';

const Resources = () => {

  const [content, setContent] = useState(1);
  const isOpen = useStoreState(state => state.isOpen)

  const handleButtonClick = (contentNumber) => {
    setContent(contentNumber);
  }

  return (
    <div className="bg-gray-800 h-screen leading-7 text-white w-screen overflow-auto">
      <Header />
      <section className={`h-[92%] pb-8 w-[85%] md:w-[80%] mx-auto overflow-auto transition-all duration-500 ease-in-out ${isOpen && 'md:ml-60'}`}>
        <h1 className="text-4xl text-center font-bold mb-8">Your <span className="text-green-500">Resource</span> Page</h1><div>
          <div className="flex justify-around">
            <button className={`btn ${content === 1 && 'btn-active'}`}
              onClick={() => handleButtonClick(1)}>News</button>
            <button className={`btn ${content === 2 && 'btn-active'}`}
              onClick={() => handleButtonClick(2)}>Edu. materials</button>
            <button className={`btn ${content === 3 && 'btn-active'}`}
              onClick={() => handleButtonClick(3)}>Other Tools</button>
          </div>
          <section>
            {content === 1 && <MentalHealthNewsPage />}
            {content === 2 && <EduMaterialsPage/>}
            {content === 3 && <OtherToolsPage/>}
          </section>
        </div>
      </section>
    </div>
  );
}



export default Resources;