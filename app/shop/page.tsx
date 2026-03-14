"use client";

import { useEffect } from "react";
import { Empty, Pagination, Spin } from "antd";
import ProductCard from "./components/ProductCard";
import ShopHeader from "./components/ShopHeader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProducts,
  type FilterValues,
  setFilter,
  setPage,
  setSearchInput,
  selectFilteredProducts,
  selectShopState,
} from "../store/slices/shopSlice";

const PAGE_SIZE = 10;

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const { currentPage, loading, error } = useAppSelector(selectShopState);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Reset về trang 1 khi search/filter thay đổi
  const handleSearch = (value: string) => {
    dispatch(setSearchInput(value));
    dispatch(setPage(1));
  };

  const handleFilter = (value: FilterValues) => {
    dispatch(setFilter(value));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search + Filter sticky */}
      <div className="sticky top-0 z-10 bg-white shadow-md px-6 pt-4">
        <ShopHeader onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex-1 px-6 pt-4 pb-6">
        <Spin spinning={loading} tip="Đang tải sản phẩm...">
          {error && !loading && (
            <div className="text-center text-sm text-red-500 py-8">{error}</div>
          )}
          {!loading && !error && filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Empty description="Không tìm thấy sản phẩm nào" />
              <p className="text-xs text-gray-400 mt-2">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : !loading && !error ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-6">
                  <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    pageSize={PAGE_SIZE}
                    onChange={(page: number) => dispatch(setPage(page))}
                    size="small"
                  />
                </div>
              )}

              <p className="text-center text-xs text-gray-400 mt-2">
                Trang {currentPage} / {totalPages} &nbsp;·&nbsp;{" "}
                {filteredProducts.length} sản phẩm
              </p>
            </>
          ) : null}
        </Spin>
      </div>
    </div>
  );
}
