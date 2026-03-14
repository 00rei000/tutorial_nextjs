"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/hooks";
import { Badge } from "antd";

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
      <Badge count={totalItems} size="small" offset={[-4, 4]}>
        <Image
          src="/cart.png"
          alt="Cart"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
      </Badge>
    </div>
  );
}
