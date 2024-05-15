import React from "react";

const Divider = () => {
  return (
    <div className="w-full h-[1px] bg-slate-500 mb-3 relative">
      <span className="absolute bottom-[-10px] left-0 right-0 m-auto w-[40px] z-40 bg-white flex justify-center">
        or
      </span>
    </div>
  );
};

export default Divider;
