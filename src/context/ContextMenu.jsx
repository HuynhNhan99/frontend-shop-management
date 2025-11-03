import React, { useEffect, useState } from "react";

export default function ContextMenu({ x, y, options, onClose }) {
  const [coords, setCoords] = useState({ x, y });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Đảm bảo menu không tràn khỏi màn hình
    const menuWidth = 180;
    const menuHeight = options.length * 42 + 16;
    const maxX = window.innerWidth - menuWidth - 10;
    const maxY = window.innerHeight - menuHeight - 10;

    setCoords({
      x: x > maxX ? maxX : x,
      y: y > maxY ? maxY : y,
    });

    // Hiện menu với hiệu ứng fade
    setTimeout(() => setVisible(true), 10);

    const handleClickOutside = () => onClose();
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [x, y, options.length, onClose]);

  return (
    <div
      className={`fixed z-50 bg-white shadow-xl rounded-xl border border-gray-200 py-2 text-sm transform transition-all duration-150 ${
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-1"
      }`}
      style={{
        top: coords.y,
        left: coords.x,
        minWidth: "180px",
      }}
    >
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={opt.onClick}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-150"
        >
          {opt.icon && <span>{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
