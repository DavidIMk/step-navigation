"use client";

import { FC, useState, useRef } from "react";
import { FileText, EllipsisVertical } from "lucide-react";
import StepMenu from "./StepMenu";

interface StepProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  onSetAsFirst?: () => void;
  onRename?: () => void;
  onCopy?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onMenuChange?: (isOpen: boolean) => void;
}

const Step: FC<StepProps> = ({
  title,
  isActive = false,
  onClick,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
  onMenuChange,
}) => {
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isActive || !stepRef.current) return;
    e.preventDefault();
    const rect = stepRef.current.getBoundingClientRect();
    setMenuPosition({
      x: rect.left,
      y: rect.top - 8,
    });
    onMenuChange?.(true);
  };

  const handleCloseMenu = () => {
    setMenuPosition(null);
    onMenuChange?.(false);
  };

  return (
    <>
      <div
        ref={stepRef}
        onClick={onClick}
        onContextMenu={handleContextMenu}
        className={`
          h-8 min-w-[32px]
          rounded-lg
          border-[0.5px]
          px-2.5 py-1
          flex items-center gap-2
          whitespace-nowrap
          font-inter font-medium text-sm leading-5 tracking-[-0.015em]
          transition-colors duration-200
          select-none
          ${
            isActive
              ? "border-[#F59D0E] text-[#F59D0E] bg-[#F59D0E]/5"
              : "border-[#9DA4B2] text-[#677289] bg-[#9DA4B2]/15 hover:bg-[#9DA4B2]/35"
          }
        `}
      >
        <FileText
          className="w-5 h-5 flex-shrink-0 pointer-events-none"
          color={isActive ? "#F59D0E" : "#677289"}
        />
        <span className="pointer-events-none">{title}</span>
        {isActive && (
          <EllipsisVertical className="w-4 h-4 pointer-events-none" />
        )}
      </div>
      {menuPosition && isActive && (
        <StepMenu
          position={menuPosition}
          onClose={handleCloseMenu}
          onSetAsFirst={() => {
            onSetAsFirst?.();
            handleCloseMenu();
          }}
          onRename={() => {
            onRename?.();
            handleCloseMenu();
          }}
          onCopy={() => {
            onCopy?.();
            handleCloseMenu();
          }}
          onDuplicate={() => {
            onDuplicate?.();
            handleCloseMenu();
          }}
          onDelete={() => {
            onDelete?.();
            handleCloseMenu();
          }}
        />
      )}
    </>
  );
};

export default Step;
