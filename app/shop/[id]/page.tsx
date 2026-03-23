"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";
import {
  fetchProductDetail,
  selectProductDetail,
  selectProductDetailLoading,
} from "../../store/slices/productDetailSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductDetail);
  const loading = useAppSelector(selectProductDetailLoading);
  const error = useAppSelector((state) => state.productDetail.error);
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const productId = Number(id);

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  if (!productId) {
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

  if (loading) {
    return <div className="p-4 text-gray-500">Đang tải sản phẩm...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-4">
        <p className="text-gray-500">{error ?? "Không tìm thấy sản phẩm!"}</p>
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

      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-2 shrink-0">
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

        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>

          <p className="text-sm text-gray-500">{product.description}</p>

          <p className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString("vi-VN")} VND
          </p>

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

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                router.push("/shop/cart");
              }}
              className="px-6 py-3 bg-cyan-400 text-white text-base font-bold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Mua Ngay
            </button>
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
