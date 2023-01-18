import { useEffect, useState } from "react";
import Card from "../ui/Card";
import ProductItem from "./ProductItem";
import Section from "../ui/Section";

import classes from "./AllProducts.module.scss";

const AllProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(
				"https://my-json-server.typicode.com/Lol7a/webapp/products"
			);
			const responseData = await response.json();

			const loadedProducts = [];

			for (const key in responseData) {
				loadedProducts.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
					image: responseData[key].image,
				});
			}

			setProducts(loadedProducts);
		};

		fetchProducts();
	}, []);

	const productsList = products.map((product) => {
		return (
			<ProductItem
				key={product.id}
				id={product.id}
				name={product.name}
				description={product.description}
				image={product.image}
				price={product.price}
			/>
		);
	});

	return (
		<Section className={classes.products}>
			<Card className={classes["products__card"]}>
				<ul>{productsList}</ul>
			</Card>
		</Section>
	);
};

export default AllProducts;
