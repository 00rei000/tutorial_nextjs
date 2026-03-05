"use client";

import { useState } from "react";
import ProductCard from "./components/ProductCard";
import ShopHeader from "./components/ShopHeader";
import { products } from "../data/products";

interface FilterValues {
  priceFrom: number;
  priceTo: number;
  ratingFrom: number;
  ratingTo: number;
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValues>({
    priceFrom: 0,
    priceTo: 10000000,
    ratingFrom: 0,
    ratingTo: 5,
  });

  // Lọc sản phẩm theo search + filter
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price >= filter.priceFrom && p.price <= filter.priceTo;
    const matchRating =
      p.rating >= filter.ratingFrom && p.rating <= filter.ratingTo;
    return matchSearch && matchPrice && matchRating;
  });

  return (
    <div>
      <ShopHeader onSearch={setSearch} onFilter={setFilter} />

      {/* Kết quả */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-lg font-semibold">Không tìm thấy sản phẩm nào</p>
          <p className="text-sm mt-1">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
