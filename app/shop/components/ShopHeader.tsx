"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { Button, Input, Modal, Select } from "antd";

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearch(value);
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
    <div className="mb-4 relative">
      {/* Breadcrumb + Search + Filter */}
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
          <span className="text-gray-500 text-sm">Shop</span>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            placeholder="Search..."
            size="middle"
            className="w-56"
            suffix={
              <Image
                src="/search.png"
                alt="Search"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
            }
          />

          <Button
            onClick={() => setShowFilter(true)}
            className="p-1.5 border-2 border-gray-300 rounded-md"
          >
            <Image
              src="/fitler.png"
              alt="Filter"
              width={20}
              height={20}
              className="w-4 h-4 object-contain"
            />
          </Button>
        </div>
      </div>
     
      <Modal
        title="Filter"
        open={showFilter}
        onCancel={() => setShowFilter(false)}
        footer={null}
        width={320}
      >
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold text-gray-700 mb-3 text-center">Giá</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600 w-10">Từ:</span>
                <Select
                  value={tempFilter.priceFrom}
                  onChange={(value) =>
                    setTempFilter({ ...tempFilter, priceFrom: value })
                  }
                  className="flex-1"
                  size="small"
                  options={[0, 100000, 500000, 1000000, 2000000, 5000000].map(
                    (v) => ({
                      value: v,
                      label: `${v.toLocaleString("vi-VN")} VNĐ`,
                    }),
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600 w-10">Đến:</span>
                <Select
                  value={tempFilter.priceTo}
                  onChange={(value) =>
                    setTempFilter({ ...tempFilter, priceTo: value })
                  }
                  className="flex-1"
                  size="small"
                  options={[1000000, 2000000, 5000000, 10000000, 20000000].map(
                    (v) => ({
                      value: v,
                      label: `${v.toLocaleString("vi-VN")} VNĐ`,
                    }),
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-3 text-center">
              Đánh giá
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600 w-10">Từ:</span>
                <Select
                  value={tempFilter.ratingFrom}
                  onChange={(value) =>
                    setTempFilter({ ...tempFilter, ratingFrom: value })
                  }
                  className="flex-1"
                  size="small"
                  options={[0, 1, 2, 3, 4].map((v) => ({
                    value: v,
                    label: `${v} Sao`,
                  }))}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600 w-10">Đến:</span>
                <Select
                  value={tempFilter.ratingTo}
                  onChange={(value) =>
                    setTempFilter({ ...tempFilter, ratingTo: value })
                  }
                  className="flex-1"
                  size="small"
                  options={[1, 2, 3, 4, 5].map((v) => ({
                    value: v,
                    label: `${v} Sao`,
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <Button
              type="primary"
              className="flex-1"
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
            <Button className="flex-1" onClick={handleResetFilter}>
              Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
