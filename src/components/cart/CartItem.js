import Button from "../ui/Button";

import classes from "./CartItem.module.scss";

const CartItem = (props) => {
	const price = `$${props.price.toFixed(2)}`;

	return (
		<li className={classes["cart__item"]}>
			<div>
				<h2>{props.name}</h2>
				<div className={classes.summary}>
					<span className={classes.price}>{price}</span>
					<span className={classes.amount}>x {props.amount}</span>
				</div>
			</div>

			<div className={classes["cart__actions"]}>
				<Button isEmpty={true} clickHandler={props.onRemove}>
					-
				</Button>
				<Button isEmpty={true} clickHandler={props.onAdd}>
					+
				</Button>
			</div>
		</li>
	);
};

export default CartItem;
