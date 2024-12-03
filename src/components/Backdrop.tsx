import React from "react";

interface BackdropProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center"></div>
  );
};

export default Backdrop;
