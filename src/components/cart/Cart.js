import Card from "../ui/Card";
import Section from "../ui/Section";
import CartItem from "./CartItem";

import classes from "./Cart.module.scss";
import Button from "../ui/Button";
import Wrapper from "../helpers/Wrapper";
import { Link } from "react-router-dom";
import { useCartContext } from "../../store/cart-cotext";

const Cart = (props) => {
	const ctx = useCartContext();
	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
	const hasProducts = ctx.products.length > 0;

	const cartProductAddHandler = (product) => {
		ctx.addProduct({ ...product, amount: 1 });
	};

	const cartProductRemoveHandler = (id) => {
		ctx.removeProduct(id);
	};

	const cartList = (
		<ul className={classes["cart__list"]}>
			{ctx.products.map((product) => (
				<CartItem
					key={product.id}
					id={product.id}
					name={product.name}
					description={product.description}
					image={product.image}
					price={product.price}
					amount={product.amount}
					onAdd={cartProductAddHandler.bind(null, product)}
					onRemove={cartProductRemoveHandler.bind(null, product.id)}
				/>
			))}
		</ul>
	);

	const cartActions = (
		<div className={classes.actions}>
			<Link to="/">
				<Button isEmpty={true} className={classes["btn--alt"]}>
					Continue Shopping
				</Button>
			</Link>
			{hasProducts && (
				<Link to="/shopping-cart/checkout">
					<Button className={classes.btn}>Checkout</Button>
				</Link>
			)}
		</div>
	);

	const cartContent = (
		<Wrapper>
			{cartList}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{cartActions}
		</Wrapper>
	);

	return (
		<Section className={classes.cart}>
			<Card className={classes["cart__card"]}>{cartContent}</Card>
		</Section>
	);
};

export default Cart;
