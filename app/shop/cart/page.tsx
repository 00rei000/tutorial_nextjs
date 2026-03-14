"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  increase,
  decrease,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { Button, Empty, Modal, message } from "antd";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const subTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const confirmRemove = (productId: number) => {
    setSelectedProductId(productId);
    setRemoveModalOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (selectedProductId !== null) {
      dispatch(removeFromCart(selectedProductId));
      message.success("Đã xóa sản phẩm");
    }
    setRemoveModalOpen(false);
    setSelectedProductId(null);
  };

  const handleRemoveCancel = () => {
    setRemoveModalOpen(false);
    setSelectedProductId(null);
  };

  const handleIncrease = (productId: number) => {
    dispatch(increase(productId));
  };

  const handleDecrease = (productId: number) => {
    dispatch(decrease(productId));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
        <span className="text-gray-500 text-sm">
          {items.reduce((sum, item) => sum + item.quantity, 0)} items in bag
        </span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="py-10">
            <Empty description="Giỏ hàng trống" />
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 border-b border-gray-200 pb-4 relative"
            >
              <Button
                onClick={() => confirmRemove(item.product.id)}
                size="small"
                className="absolute top-0 right-0"
              >
                ✕
              </Button>
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={100}
                height={100}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {item.product.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-gray-900">
                    {item.product.price.toLocaleString("vi-VN")} VND
                  </p>

                  <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1">
                    <Button
                      size="small"
                      onClick={() => handleIncrease(item.product.id)}
                    >
                      +
                    </Button>
                    <span className="text-gray-800 w-4 text-center leading-none">
                      {item.quantity}
                    </span>
                    <Button
                      size="small"
                      onClick={() => handleDecrease(item.product.id)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tổng tiền */}
      <div className="flex flex-col items-end gap-2 mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between w-72">
          <span className="text-gray-600">SubTotal</span>
          <span className="font-medium">
            {subTotal.toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="flex justify-between w-72">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{tax.toLocaleString("vi-VN")} VND</span>
        </div>
        <div className="flex justify-between w-72 border-t border-gray-300 pt-2">
          <span className="font-bold text-gray-800">Total</span>
          <span className="font-bold text-gray-900">
            {total.toLocaleString("vi-VN")} VND
          </span>
        </div>
      </div>

      <Modal
        title="Xóa sản phẩm"
        open={removeModalOpen}
        onOk={handleRemoveConfirm}
        onCancel={handleRemoveCancel}
        okText="Xóa"
        cancelText="Hủy"
        destroyOnHidden
        getContainer={false}
      >
        Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?
      </Modal>
    </div>
  );
}
