import { Product } from "../interfaces/product";

export interface ProductResponse {
	instrument : Product;
}

export interface ProductListResponse {
	instruments : Product[];
}