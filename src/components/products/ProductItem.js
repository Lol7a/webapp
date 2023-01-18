import { Link } from "react-router-dom";
import { useCartContext } from "../../store/cart-cotext";
import Button from "../ui/Button";
import Card from "../ui/Card";

import classes from "./ProductItem.module.scss";

const ProductItem = (props) => {
	const ctx = useCartContext();
	const price = `$${props.price.toFixed(2)}`;

	const addToCartHandler = () => {
		ctx.addProduct({
			id: props.id,
			name: props.name,
			price: props.price,
			amount: 1,
		});
	};

	return (
		<li>
			<Card className={classes.product}>
				<div>
					<img src={props.image} alt={props.name} className={classes.img} />
					<h5>{props.name}</h5>
					<p className={classes.description}>{props.description}</p>
					<span className={classes.price}>{price}</span>
				</div>
				<div className={classes.actions}>
					<Link to={`/home/${+props.id + 1}`} id={props.id}>
						View Details
					</Link>
					<Button clickHandler={addToCartHandler} id={props.id}>
						Add to Cart
					</Button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
