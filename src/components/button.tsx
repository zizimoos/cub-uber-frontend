import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`text-white py-2  transition-colors text-lg font-medium ${
      canClick
        ? "bg-green-500 hover:bg-green-700"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "loading ..." : actionText}
  </button>
);
