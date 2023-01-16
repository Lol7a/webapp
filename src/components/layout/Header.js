import { Link, useNavigate } from "react-router-dom";
import CartButton from "../cart/CartButton";
import Wrapper from "../helpers/Wrapper";

import classes from "./Header.module.scss";

const Header = () => {
	const navigate = useNavigate();

	const submitHandler = () => {
		navigate("/shopping-cart");
	};

	return (
		<Wrapper>
			<header className={classes.header}>
				<Link to="/">The Web Shop App</Link>
				<CartButton onClick={submitHandler} />
			</header>
		</Wrapper>
	);
};

export default Header;
