import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../store/cart-cotext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Section from "../ui/Section";

import classes from "./ThankYouMessage.module.scss";

const ThankYouMessage = (props) => {
	const ctx = useCartContext();
	const navigate = useNavigate();
	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

	const continueHandler = () => {
		ctx.clearCart();
		navigate("/");
	};

	return (
		<Section className={classes["thank-you"]}>
			<Card className={classes["thank-you__card"]}>
				<span className={classes["thank-you__title"]}>
					<h1>Thank you </h1>
					for shopping with us!
				</span>

				<div className={classes["thank-you__content"]}>
					<ul>
						{ctx.products.map((product) => (
							<li key={product.id}>
								<h3>{product.name}</h3>
								<span>Qty: {product.amount}</span>
							</li>
						))}
					</ul>

					<div className={classes.total}>
						<span>Total Amount</span>
						<span>{totalAmount}</span>
					</div>
				</div>
				<div className={classes.actions}>
					<Button clickHandler={continueHandler}>Continue Shopping</Button>
				</div>
			</Card>
		</Section>
	);
};

export default ThankYouMessage;
