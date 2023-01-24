import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Section from "../ui/Section";

import classes from "./AdminContent.module.scss";
import OrderItem from "./OrderItem";

const AdminContent = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await fetch("http://localhost:8000/orders");
			const responseData = await response.json();

			console.log(responseData);

			const loadedOrders = [...responseData];

			if (loadedOrders.length > 0) {
				setOrders(loadedOrders);
			}

			console.log(loadedOrders);
		};
		fetchOrders();
	}, []);

	return (
		<Section className={classes.admin}>
			<Card className={classes["admin__card"]}>
				<h1>Orders:</h1>

				<ul>
					{orders.map((order) => (
						<li key={order.id}>
							<OrderItem order={order} />
						</li>
					))}
				</ul>
			</Card>
		</Section>
	);
};

export default AdminContent;
