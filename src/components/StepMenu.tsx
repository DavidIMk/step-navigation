"use client";

import { FC, useEffect, useState } from "react";
import { Flag, Pencil, Clipboard, Files, Trash2 } from "lucide-react";

interface StepMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onSetAsFirst: () => void;
  onRename: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const StepMenu: FC<StepMenuProps> = ({
  position,
  onClose,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    const menuWidth = 256;
    const menuHeight = 220;
    const windowWidth = window.innerWidth;
    const margin = 16;

    const x = Math.max(margin, Math.min(position.x, windowWidth - menuWidth - margin));
    const y = position.y < menuHeight ? position.y + 40 : position.y;

    setAdjustedPosition({ x, y });
  }, [position]);

  const buttonBaseClass = "w-full px-4 text-sm text-left hover:bg-gray-50 flex items-center gap-2 cursor-default hover:cursor-pointer";

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 w-60 bg-white rounded-lg shadow-lg border border-gray-200"
        style={{
          top: adjustedPosition.y,
          left: adjustedPosition.x,
          transform: "translateY(-100%)",
        }}
      >
        <div className="px-4 py-2 bg-[#FAFBFC] rounded-t-lg border-b border-gray-200">
          <span className="font-inter text-base leading-6 tracking-[-0.015em] text-gray-900 align-middle font-medium">
            Settings
          </span>
        </div>
        <div>
          <button
            onClick={onSetAsFirst}
            className={`${buttonBaseClass} pt-3 pb-1.5 text-gray-700`}
          >
            <Flag className="w-4 h-4" />
            Set as first page
          </button>
          <button
            onClick={onRename}
            className={`${buttonBaseClass} py-1.5 text-gray-700`}
          >
            <Pencil className="w-4 h-4" />
            Rename
          </button>
          <button
            onClick={onCopy}
            className={`${buttonBaseClass} py-1.5 text-gray-700`}
          >
            <Clipboard className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={onDuplicate}
            className={`${buttonBaseClass} pb-3 pt-1.5 text-gray-700`}
          >
            <Files className="w-4 h-4" />
            Duplicate
          </button>
          <div className="border-t border-gray-200" />
          <button
            onClick={onDelete}
            className={`${buttonBaseClass} py-3 text-[#EF494F]`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default StepMenu;
