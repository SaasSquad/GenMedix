import React, { useState } from 'react';
import GeneralQModal from './GeneralQModal';

const GeneralQBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <GeneralQModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GeneralQBtn;
