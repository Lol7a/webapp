import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useCartContext } from "../../store/cart-cotext";

import classes from "./ProductDetail.module.scss";

const ProductDetail = () => {
	const ctx = useCartContext();
	const [product, setProduct] = useState();
	const params = useParams();

	let { productId } = params;

	useEffect(() => {
		const fetchProduct = async (productId) => {
			const response = await fetch(
				`http://localhost:8000/products/${productId}`
			);

			const responseData = await response.json();

			const loadedProduct = {
				...responseData,
			};

			setProduct(loadedProduct);
		};

		fetchProduct(productId);
	}, [productId]);

	const addToCartHandler = () => {
		ctx.addProduct({
			id: product.id,
			name: product.name,
			price: product.price,
			amount: 1,
		});
	};

	return (
		<Section className={classes.detail}>
			{product && (
				<Card key={product.id} className={classes["detail__card"]}>
					<div className={classes["detail__content"]}>
						<img
							src={product.image}
							alt={product.name}
							className={classes.img}
						/>
						<h5>{product.name}</h5>
						<p className={classes.description}>{product.description}</p>
						<span className={classes.price}>{`$${product.price.toFixed(
							2
						)}`}</span>
					</div>
					<div className={classes["detail__actions"]}>
						<Link to="/">
							<Button
								isEmpty={true}
								className={classes["btn--alt"]}
								id={product.id}
							>
								Continue Shopping
							</Button>
						</Link>

						<Button clickHandler={addToCartHandler}>Add to Cart</Button>
					</div>
				</Card>
			)}
		</Section>
	);
};
export default ProductDetail;
