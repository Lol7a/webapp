import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Section from "../ui/Section";

import classes from "./AdminContent.module.scss";

const AdminContent = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const orders = JSON.parse(localStorage.getItem("orders"));

		if (orders) {
			setOrders(orders);
		}
	}, []);

	console.log(orders.user.phone);
	// console.log(orders.orderedItems.map((item) => item.name));

	return (
		<Section className={classes.admin}>
			<Card className={classes["admin__card"]}>
				<h1>Orders</h1>
			</Card>
		</Section>
	);
};

export default AdminContent;
