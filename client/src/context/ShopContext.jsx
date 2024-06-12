import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
	let cart = {};
	for (let i = 0; i < 300; i++) {
		cart[i] = 0;
	}
	return cart;
};

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(getDefaultCart());
	const [all_products, setAllproducts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/allproducts")
			.then((res) => res.json())
			.then((data) => setAllproducts(data));
		fetch("http://localhost:4000/getcart", {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"auth-token": `${localStorage.getItem("auth-token")}`,
				"Content-Type": "application/json",
			},
			body: "",
		})
			.then((res) => res.json())
			.then((data) => setCartItems(data));
	}, []);

	const addToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		if (localStorage.getItem("auth-token")) {
			fetch("http://localhost:4000/addtocart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemId: itemId }),
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
		}
	};
	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if (localStorage.getItem("auth-token")) {
			fetch("http://localhost:4000/removefromcart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemId: itemId }),
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
		}
	};
	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = all_products.find(
					(product) => product.id === Number(item),
				);
				totalAmount += itemInfo.new_price * cartItems[item];
			}
		}
		return totalAmount;
	};
	const getTotalCartItems = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				totalAmount += cartItems[item];
			}
		}
		return totalAmount;
	};

	const contextValue = {
		getTotalCartAmount,
		all_products,
		cartItems,
		addToCart,
		removeFromCart,
		getTotalCartItems,
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
