import { useEffect, useState } from "react";
import Card from "../ui/Card";
import ProductItem from "./ProductItem";
import Section from "../ui/Section";

import classes from "./AllProducts.module.scss";

const AllProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("http://localhost:8000/products");
			const responseData = await response.json();

			const loadedProducts = [...responseData];

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
