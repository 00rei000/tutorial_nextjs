"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/hooks";

export default function CartBadge() {
  const router = useRouter();
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/shop/cart")}
    >
      <Image
        src="/cart.png"
        alt="Cart"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
      {/* Badge số lượng */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}
