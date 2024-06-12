import React from "react";
import { Link } from "react-router-dom";
import addProduct from "../assets/addproduct.png";
import listProduct from "../assets/productlist.png";

const Sidebar = () => {
	return (
		<div className="py-7 flex justify-center gap-x-1 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6">
			<Link to={"/addproduct"}>
				<button className="flexCenter gap-2 rounded-md bg-primary h-14 w-50 medium-14 max-xs:medium-16">
					<img src={addProduct} alt="product" height={50} width={50} />
					<span>Add Product</span>
				</button>
			</Link>
			<Link to={"/listproducts"}>
				<button className="flexCenter gap-2 rounded-md bg-primary h-14 w-50 medium-14 max-xs:medium-16">
					<img src={listProduct} alt="product" height={50} width={50} />
					<span>List Product</span>
				</button>
			</Link>
		</div>
	);
};

export default Sidebar;
