import { useState } from "react";
import Button from "../ui/Button";
import classes from "./AdminContent.module.scss";

const OrderItem = ({ order }) => {
	const [lang, setLang] = useState("gb");
	const dates = {
		gb: new Date(order.user.orderTime).toLocaleDateString("en-GB"),
		us: new Date(order.user.orderTime).toLocaleDateString("en-US"),
	};

	const toggleDateHandler = () => {
		lang === "gb" ? setLang("us") : setLang("gb");
	};

	return (
		<div key={order.id}>
			<h3>{order.user.fullName}</h3>
			<div className={classes["admin__content"]}>
				<span>{order.user.email}</span>
				{order.orderedItems.map((item) => (
					<span key={item.id}>
						{item.name} - amount: {item.amount}
					</span>
				))}

				<span key={dates.id}>{dates[lang]}</span>
				<Button clickHandler={toggleDateHandler}>Toggle Date</Button>
			</div>
		</div>
	);
};

export default OrderItem;
