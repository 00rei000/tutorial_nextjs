"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // useParams để lấy id từ URL, useRouter để điều hướng
import { products } from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../store/hooks"; // Dùng hook của Redux để lấy dữ liệu giỏ hàng và dispatch action
import { addToCart } from "../../store/slices/cartSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  // Tìm sản phẩm theo id
  const product = products.find((p) => p.id === Number(id));

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Không tìm thấy sản phẩm!</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
        >
          Quay lại Shop
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 relative">
      {/* Header + Breadcrumb + Cart badge góc phải */}
      <div className="border-b-2 border-gray-200 pb-3 mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span
              className="cursor-pointer hover:text-blue-400"
              onClick={() => router.push("/shop")}
            >
              Shop
            </span>
            <span>/</span>
            <span>Product</span>
          </div>
        </div>

        {/* Cart badge góc trên phải */}
        <div
          className="relative cursor-pointer"
          onClick={() => router.push("/shop/cart")}
        >
          <Image
            src="/cart.png"
            alt="Cart"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex gap-8 items-start">
        {/* Cột trái: Ảnh */}
        <div className="flex flex-col gap-2 shrink-0">
          {/* Ảnh lớn */}
          <div className="w-48 h-48 border border-gray-200 rounded-lg p-2 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              className="object-contain"
            />
          </div>
          {/* Ảnh nhỏ bên dưới */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center cursor-pointer hover:border-blue-400"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Tên */}
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>

          {/* Mô tả */}
          <p className="text-sm text-gray-500">{product.description}</p>

          {/* Giá */}
          <p className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString("vi-VN")} VND
          </p>

          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < product.rating
                    ? "text-yellow-400 text-xl"
                    : "text-gray-300 text-xl"
                }
              >
                ★
              </span>
            ))}
          </div>

          {/* Nút hành động */}
          <div className="flex flex-wrap gap-4 mt-2">
            {/* Mua Ngay: thêm vào giỏ + chuyển thẳng sang Cart */}
            <button
              onClick={() => {
                dispatch(addToCart(product));
                router.push("/shop/cart");
              }}
              className="px-6 py-3 bg-cyan-400 text-white text-base font-bold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Mua Ngay
            </button>
            {/* Thêm vào giỏ hàng: thêm vào giỏ + ở lại trang */}
            <button
              onClick={() => {
                dispatch(addToCart(product));
              }}
              className="px-6 py-3 bg-green-500 text-white text-base font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
