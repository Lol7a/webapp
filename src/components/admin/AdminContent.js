import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Section from "../ui/Section";
import Button from "../ui/Button";

import classes from "./AdminContent.module.scss";

const AdminContent = () => {
	const [orders, setOrders] = useState();
	const [date, setDate] = useState();
	const [lang, setLang] = useState("gb");

	useEffect(() => {
		const order = JSON.parse(localStorage.getItem("orders"));

		if (order) {
			setOrders(order);
			setDate({
				gb: new Date(order.user.orderTime).toLocaleDateString("en-GB"),
				us: new Date(order.user.orderTime).toLocaleDateString("en-US"),
			});
		}
	}, []);

	const toggleDateHandler = () => {
		lang === "gb" ? setLang("us") : setLang("gb");
	};

	return (
		<Section className={classes.admin}>
			<Card className={classes["admin__card"]}>
				<h1>Orders:</h1>

				{orders && (
					<div>
						<h3>{orders.user.fullName}</h3>
						<div className={classes["admin__content"]}>
							<span>{orders.user.email}</span>
							{orders.orderedItems.map((item) => (
								<span key={item.id}>
									{item.name} - amount: {item.amount}
								</span>
							))}
							<span>{date[lang]}</span>
							<Button clickHandler={toggleDateHandler}>Toggle Date</Button>
						</div>
					</div>
				)}
			</Card>
		</Section>
	);
};

export default AdminContent;
