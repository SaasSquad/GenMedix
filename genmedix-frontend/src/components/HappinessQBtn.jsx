import React, { useState } from 'react';
import HappinessQModal from './HappinessQModal';

const HappinessQBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <HappinessQModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HappinessQBtn;
