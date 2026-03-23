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
  selectShopTotal,
  selectShopPageSize,
} from "../store/slices/shopSlice";

/**
 * ShopPage Component
 *
 * Luồng:
 * 1. User nhập search/filter/chuyển trang
 * 2. Dispatch action -> Epic xử lý -> Gọi API -> Cập nhật Redux
 * 3. Component re-render với data mới từ Redux
 *
 * Features:
 * - Search: Debounce 300ms, gọi API backend
 * - Filter: Lọc theo giá, đánh giá
 * - Pagination: Backend paging (page, page_size)
 * - Sticky header & footer
 */
export default function ShopPage() {
  const dispatch = useAppDispatch();
  const { currentPage, loading, error } = useAppSelector(selectShopState);
  const products = useAppSelector(selectFilteredProducts);
  const total: number = useAppSelector(selectShopTotal);
  const pageSize: number = useAppSelector(selectShopPageSize);

  /**
   * Fetch products khi component mount hoặc currentPage thay đổi
   */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, currentPage]);

  /**
   * Handler: User nhập search
   * Reset về trang 1 khi search thay đổi
   */
  const handleSearch = (value: string) => {
    dispatch(setSearchInput(value)); // Epic debounce 300ms
    dispatch(setPage(1));
  };

  /**
   * Handler: User apply filter
   * Reset về trang 1 khi filter thay đổi
   */
  const handleFilter = (value: FilterValues) => {
    dispatch(setFilter(value));
    dispatch(setPage(1));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b-2 border-gray-200">
        <ShopHeader onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* Product List */}
      <div className="flex-1 px-6 pt-4 pb-6">
        <Spin spinning={loading} tip="Đang tải sản phẩm...">
          {error && !loading && (
            <div className="text-center text-sm text-red-500 py-8">{error}</div>
          )}
          {!loading && !error && products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Empty description="Không tìm thấy sản phẩm nào" />
              <p className="text-xs text-gray-400 mt-2">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : !loading && !error ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="h-2" />
            </>
          ) : null}
        </Spin>
      </div>

      {/* Sticky Pagination Footer */}
      {total > pageSize && (
        <div className="sticky bottom-0 z-20 bg-white shadow-sm px-3 py-1 flex items-center justify-center gap-2 text-[11px] text-gray-500 border-t border-gray-200">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={(page: number) => dispatch(setPage(page))}
            size="small"
          />
          <span>{total} sản phẩm</span>
        </div>
      )}
    </div>
  );
}
