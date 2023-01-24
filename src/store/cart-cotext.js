import React, { useContext, useEffect, useReducer } from "react";

const CartContext = React.createContext({
	products: [],
	totalAmount: 0,
	addProduct: (product) => {},
	removeProduct: (id) => {},
	clearCart: () => {},
});

const defaultCartState = {
	products: [],
	totalAmount: 0,
};

const cartFromLocalStorage =
	JSON.parse(localStorage.getItem("cart")) || defaultCartState;

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.product.price * action.product.amount;

		const existingProductIndex = state.products.findIndex(
			(product) => product.id === action.product.id
		);

		const existingCartProduct = state.products[existingProductIndex];
		let updatedProducts;

		if (existingCartProduct) {
			const updatedItem = {
				...existingCartProduct,
				amount: existingCartProduct.amount + action.product.amount,
			};

			updatedProducts = [...state.products];
			updatedProducts[existingProductIndex] = updatedItem;
		} else {
			updatedProducts = state.products.concat(action.product);
		}

		return { products: updatedProducts, totalAmount: updatedTotalAmount };
	}

	if (action.type === "REMOVE") {
		const existingProductIndex = state.products.findIndex(
			(product) => product.id === action.id
		);

		const existingProduct = state.products[existingProductIndex];
		const updatedTotalAmount = state.totalAmount - existingProduct.price;
		let updatedProducts;

		if (existingProduct.amount === 1) {
			updatedProducts = state.products.filter(
				(product) => product.id !== action.id
			);
		} else {
			const updatedProduct = {
				...existingProduct,
				amount: existingProduct.amount - 1,
			};
			updatedProducts = [...state.products];
			updatedProducts[existingProductIndex] = updatedProduct;
		}

		return {
			products: updatedProducts,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "CLEAR") {
		localStorage.removeItem("cart");
		return defaultCartState;
	}

	return cartFromLocalStorage;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		cartFromLocalStorage
	);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartState));
	}, [cartState]);

	const addProductHandler = (product) => {
		dispatchCartAction({ type: "ADD", product: product });
	};

	const removeProductHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR" });
	};

	const context = {
		products: cartState.products,
		totalAmount: cartState.totalAmount,
		addProduct: addProductHandler,
		removeProduct: removeProductHandler,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={context}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCartContext = () => {
	return useContext(CartContext);
};
