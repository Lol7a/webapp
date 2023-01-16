import { useEffect, useState } from "react";
import Button from "../ui/Button";
import CartIcon from "./CartIcon";

import classes from "./CartButton.module.scss";
import { useCartContext } from "../../store/cart-cotext";

const CartButton = (props) => {
	const ctx = useCartContext();
	const [btnAnim, setBtnAnim] = useState(false);
	const { products } = ctx;

	const cartProductsNumber = ctx.products.reduce((curNumber, product) => {
		return curNumber + product.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnAnim ? classes.bump : ""}`;

	useEffect(() => {
		if (products.length === 0) {
			return;
		}
		setBtnAnim(true);

		const timer = setTimeout(() => {
			setBtnAnim(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [products]);

	return (
		<Button className={btnClasses} clickHandler={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{cartProductsNumber}</span>
		</Button>
	);
};

export default CartButton;
