import React, { useState } from "react";
import ContextMenu from "../context/ContextMenu";

export default function ProductTable({ products, onEdit, onDelete }) {
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (e, product) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      product,
    });
  };

  const handleClose = () => setContextMenu(null);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Mã</th>
            <th className="px-4 py-2 border">Tên sản phẩm</th>
            <th className="px-4 py-2 border">Giá bán</th>
            <th className="px-4 py-2 border">Tồn kho</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.product_id}
              onContextMenu={(e) => handleRightClick(e, p)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2 border">{p.product_code}</td>
              <td className="px-4 py-2 border">{p.product_name}</td>
              <td className="px-4 py-2 border">{p.sale_price}</td>
              <td className="px-4 py-2 border">{p.quantity_in_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleClose}
          options={[
            {
              label: "✏️ Sửa",
              onClick: () => {
                onEdit(contextMenu.product);
                handleClose();
              },
            },
            {
              label: "🗑️ Xóa",
              onClick: () => {
                onDelete(contextMenu.product.product_id);
                handleClose();
              },
            },
          ]}
        />
      )}
    </div>
  );
}
