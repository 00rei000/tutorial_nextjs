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

const PAGE_SIZE = 10;

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValues>({
    priceFrom: 0,
    priceTo: 10000000,
    ratingFrom: 0,
    ratingTo: 5,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc sản phẩm theo search + filter
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price >= filter.priceFrom && p.price <= filter.priceTo;
    const matchRating =
      p.rating >= filter.ratingFrom && p.rating <= filter.ratingTo;
    return matchSearch && matchPrice && matchRating;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Reset về trang 1 khi search/filter thay đổi
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: FilterValues) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search + Filter sticky */}
      <div className="sticky top-0 z-10 bg-white shadow-md px-6 pt-4">
        <ShopHeader onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex-1 px-6 pt-4 pb-6">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="text-lg font-semibold">Không tìm thấy sản phẩm nào</p>
            <p className="text-sm mt-1">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {/* Nút Previous */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ‹
                </button>

                {/* Số trang */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-cyan-400 text-white border-cyan-400"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Nút Next */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ›
                </button>
              </div>
            )}

            {/* Thông tin trang */}
            <p className="text-center text-xs text-gray-400 mt-2">
              Trang {currentPage} / {totalPages} &nbsp;·&nbsp;{" "}
              {filteredProducts.length} sản phẩm
            </p>
          </>
        )}
      </div>
    </div>
  );
}
