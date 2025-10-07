import React from "react";
import defaultProfile from "/public/profile.png"; 

const UserAvatar = ({ photo, name, designs }) => {
  return (
    <div
      className={`w-[35px] md:w-[45px] h-[35px] md:h-[45px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${designs}`}
    >
      <img
        src={photo || defaultProfile}
        alt={name || "Local_User"}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default React.memo(UserAvatar);
