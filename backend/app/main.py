from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from .data.products import products
import os

app = FastAPI(title="Mobile Shopping API", version="1.0.0")

# CORS Configuration - lấy danh sách origin từ biến môi trường, phân tách bằng dấu phẩy
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
	CORSMiddleware,
	allow_origins=CORS_ORIGINS,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
	max_age=86400,
)


@app.get("/products")
async def get_products(
	search: Optional[str] = Query(None, description="Tìm kiếm theo tên hoặc mô tả"),
	min_price: Optional[int] = Query(None, description="Giá tối thiểu"),
	max_price: Optional[int] = Query(None, description="Giá tối đa"),
	rating: Optional[int] = Query(None, description="Đánh giá sao tối thiểu"),
	page: int = Query(1, ge=1, description="Trang hiện tại"),
	page_size: int = Query(10, ge=1, le=100, description="Số sản phẩm mỗi trang"),
):
	filtered = products
	
	# Search
	if search:
		search_lower = search.lower()
		filtered = [p for p in filtered if search_lower in p["name"].lower() or search_lower in p["description"].lower()]
	
	# Filter by price
	if min_price is not None:
		filtered = [p for p in filtered if p["price"] >= min_price]
	if max_price is not None:
		filtered = [p for p in filtered if p["price"] <= max_price]
	
	# Filter by rating
	if rating is not None:
		filtered = [p for p in filtered if p["rating"] >= rating]
	
	# Pagination
	total = len(filtered)
	start = (page - 1) * page_size
	end = start + page_size
	
	return {
		"items": filtered[start:end],
		"total": total,
		"page": page,
		"page_size": page_size,
	}


@app.get("/products/{product_id}")
async def get_product_by_id(product_id: int):
	product = next((p for p in products if p["id"] == product_id), None)
	if not product:
		raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")
	return product


