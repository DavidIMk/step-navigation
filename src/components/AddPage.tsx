"use client";

import { FC } from "react";

interface AddPageProps {
  onClick: () => void;
}

const AddPage: FC<AddPageProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        h-8 min-w-[32px]
        rounded-lg
        border-[0.5px] border-[#E1E1E1]
        px-2.5 py-1
        flex items-center gap-1.5
        whitespace-nowrap
        font-inter font-medium text-sm leading-5 tracking-[-0.015em]
        transition-colors duration-200
        select-none
        text-[#1A1A1A]
        pointer-events-none
      `}
    >
      <span className="text-lg leading-none">+</span>
      <span>Add page</span>
    </div>
  );
};

export default AddPage;
