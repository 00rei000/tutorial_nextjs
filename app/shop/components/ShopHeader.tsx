"use client";

import Image from "next/image";
import { useState } from "react";

interface FilterValues {
  priceFrom: number;
  priceTo: number;
  ratingFrom: number;
  ratingTo: number;
}

interface ShopHeaderProps {
  onSearch: (value: string) => void;
  onFilter: (filter: FilterValues) => void;
}

export default function ShopHeader({ onSearch, onFilter }: ShopHeaderProps) {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // State tạm cho filter (chưa apply)
  const [tempFilter, setTempFilter] = useState<FilterValues>({
    priceFrom: 0,
    priceTo: 10000000,
    ratingFrom: 0,
    ratingTo: 5,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleApplyFilter = () => {
    onFilter(tempFilter);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    const reset = {
      priceFrom: 0,
      priceTo: 10000000,
      ratingFrom: 0,
      ratingTo: 5,
    };
    setTempFilter(reset);
    onFilter(reset);
    setShowFilter(false);
  };

  return (
    <div className="border-b-2 border-gray-200 pb-3 mb-4 relative">
      {/* Dòng 1: Tiêu đề "Shop" */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Shop</h1>

      {/* Dòng 2: Breadcrumb + Search + Filter */}
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <span className="text-gray-500 text-sm">Shop</span>

        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="px-3 py-1.5 text-sm outline-none w-48 text-gray-700"
            />
            <button className="px-2 py-1.5 bg-white border-l-2 border-gray-300 hover:bg-gray-100">
              <Image
                src="/search.png"
                alt="Search"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>

          {/* Icon Filter */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="p-1.5 border-2 border-gray-300 rounded-md hover:bg-gray-100"
          >
            <Image
              src="/fitler.png"
              alt="Filter"
              width={22}
              height={22}
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="border-b border-gray-200 py-3 text-center font-bold text-gray-800">
            Filter
          </div>

          <div className="p-4 flex flex-col gap-5">
            {/* Giá */}
            <div>
              <p className="font-semibold text-gray-700 mb-3 text-center">
                Giá
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-10">Từ:</span>
                  <select
                    value={tempFilter.priceFrom}
                    onChange={(e) =>
                      setTempFilter({
                        ...tempFilter,
                        priceFrom: Number(e.target.value),
                      })
                    }
                    className="flex-1 ml-4 border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent py-1"
                  >
                    {[0, 100000, 500000, 1000000, 2000000, 5000000].map((v) => (
                      <option key={v} value={v}>
                        {v.toLocaleString("vi-VN")} VNĐ
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-10">Đến:</span>
                  <select
                    value={tempFilter.priceTo}
                    onChange={(e) =>
                      setTempFilter({
                        ...tempFilter,
                        priceTo: Number(e.target.value),
                      })
                    }
                    className="flex-1 ml-4 border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent py-1"
                  >
                    {[1000000, 2000000, 5000000, 10000000, 20000000].map(
                      (v) => (
                        <option key={v} value={v}>
                          {v.toLocaleString("vi-VN")} VNĐ
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Đánh giá */}
            <div>
              <p className="font-semibold text-gray-700 mb-3 text-center">
                Đánh giá
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-10">Từ:</span>
                  <select
                    value={tempFilter.ratingFrom}
                    onChange={(e) =>
                      setTempFilter({
                        ...tempFilter,
                        ratingFrom: Number(e.target.value),
                      })
                    }
                    className="flex-1 ml-4 border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent py-1"
                  >
                    {[0, 1, 2, 3, 4].map((v) => (
                      <option key={v} value={v}>
                        {v} Sao
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-10">Đến:</span>
                  <select
                    value={tempFilter.ratingTo}
                    onChange={(e) =>
                      setTempFilter({
                        ...tempFilter,
                        ratingTo: Number(e.target.value),
                      })
                    }
                    className="flex-1 ml-4 border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent py-1"
                  >
                    {[1, 2, 3, 4, 5].map((v) => (
                      <option key={v} value={v}>
                        {v} Sao
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Nút Apply + Reset */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleApplyFilter}
                className="flex-1 py-2 bg-cyan-400 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors text-sm"
              >
                Apply
              </button>
              <button
                onClick={handleResetFilter}
                className="flex-1 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
