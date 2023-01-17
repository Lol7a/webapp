import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import CartProvider from "./store/cart-cotext";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";

const App = () => {
	return (
		<CartProvider>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/shopping-cart/*" element={<ShoppingCart />} />
					<Route path="/shopping-cart/checkout" element={<Checkout />} />
					<Route path="/thank-you" element={<ThankYou />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</main>
		</CartProvider>
	);
};

export default App;
