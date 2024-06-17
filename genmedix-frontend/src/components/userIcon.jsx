const getInitials = (initials) => {
  return initials.slice(0, 2).toUpperCase();
};

const UserIcon = ({name}) => {
  const initials = getInitials(name);

  return (
    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-gray-600">
      {initials}
    </div>
  );
};

export default UserIcon;
