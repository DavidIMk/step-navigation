"use client";

import { FC, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepConnectorProps {
  onAddBetween: () => void;
}

const StepConnector: FC<StepConnectorProps> = ({ onAddBetween }) => {
  const [showAdd, setShowAdd] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowAdd(true), 400);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowAdd(false);
  };

  const handleAddClick = () => {
    setShowAdd(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onAddBetween();
  };

  return (
    <motion.div
      className="relative flex items-center justify-center h-8"
      animate={{ width: showAdd ? 56 : 20 }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minWidth: 0 }}
    >
      {/* Single dashed line when not hovered */}
      <AnimatePresence initial={false}>
        {!showAdd && (
          <motion.div
            key="center-dash"
            className="h-0 border-t border-dashed border-[#D1D5DB] absolute left-0 top-1/2 z-0"
            initial={{ width: 20, opacity: 0 }}
            animate={{ width: 20, opacity: 1 }}
            exit={{ width: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
      {/* Left dashed line when hovered */}
      <AnimatePresence initial={false}>
        {showAdd && (
          <motion.div
            key="left-dash"
            className="h-0 border-t border-dashed border-[#D1D5DB] absolute left-0 top-1/2 z-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 20, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
      {/* Right dashed line when hovered */}
      <AnimatePresence initial={false}>
        {showAdd && (
          <motion.div
            key="right-dash"
            className="h-0 border-t border-dashed border-[#D1D5DB] absolute right-0 top-1/2 z-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 20, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
      {/* Add button */}
      <AnimatePresence initial={false}>
        {showAdd && (
          <motion.button
            key="add-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[0.5px] border-[#E1E1E1] bg-white flex items-center justify-center shadow"
            style={{ minWidth: 16, minHeight: 16 }}
            onClick={handleAddClick}
            tabIndex={-1}
          >
            <span className="text-xs font-bold text-[#1A1A1A] leading-none">
              +
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepConnector;
