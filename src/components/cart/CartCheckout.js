import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../store/cart-cotext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Section from "../ui/Section";

import classes from "./CartCheckout.module.scss";

const isEmpty = (value) => value.trim() === "";
const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
const isPhoneValid = (phone) =>
	/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
const isCreditCardValid = (creditCard) =>
	/^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/.test(
		creditCard
	);

const CartCheckout = (props) => {
	const ctx = useCartContext();
	const current = new Date();
	const navigate = useNavigate();
	const [formValidity, setFormValidity] = useState({
		fullName: true,
		birthday: true,
		gender: true,
		creditCard: true,
		phone: true,
		email: true,
	});

	const fullNameRef = useRef();
	const birthdayRef = useRef();
	const genderRef = useRef();
	const creditCardRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();

	const submitHandler = async (event) => {
		event.preventDefault();

		const enteredFullName = fullNameRef.current.value;
		const enteredBirthday = birthdayRef.current.value;
		const enteredGender = genderRef.current.value;
		const enteredCreditCard = creditCardRef.current.value;
		const enteredPhone = phoneRef.current.value;
		const enteredEmail = emailRef.current.value;

		const enteredFullNameValid = !isEmpty(enteredFullName);
		const enteredBirthdayValid = !isEmpty(enteredBirthday);
		const enteredGenderValid = !isEmpty(enteredGender);
		const enteredCreditCardValid =
			!isEmpty(enteredCreditCard) && isCreditCardValid(enteredCreditCard);
		const enteredPhoneValid =
			!isEmpty(enteredPhone) && isPhoneValid(enteredPhone);
		const enteredEmailValid =
			!isEmpty(enteredEmail) && isEmailValid(enteredEmail);

		setFormValidity({
			fullName: enteredFullNameValid,
			birthday: enteredBirthdayValid,
			gender: enteredGenderValid,
			creditCard: enteredCreditCardValid,
			phone: enteredPhoneValid,
			email: enteredEmailValid,
		});

		const formIsValid =
			enteredFullNameValid &&
			enteredBirthdayValid &&
			enteredGenderValid &&
			enteredCreditCardValid &&
			enteredPhoneValid &&
			enteredEmailValid;

		if (!formIsValid) {
			return;
		} else {
			navigate("/thank-you");
		}

		await fetch("http://localhost:8000/orders", {
			method: "POST",
			body: JSON.stringify({
				user: {
					fullName: enteredFullName,
					birthday: enteredBirthday,
					gender: enteredGender,
					creditCard: enteredCreditCard,
					phone: enteredPhone,
					email: enteredEmail,
					orderTime: new Date(),
				},
				orderedItems: ctx.products,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			});
	};

	const cancelHandler = () => {
		navigate("/shopping-cart");
	};

	return (
		<Section className={classes.checkout}>
			<Card className={classes["checkout__card"]}>
				<form className={classes.form} onSubmit={submitHandler}>
					<div
						className={`${classes.control} ${
							formValidity.fullName ? "" : classes.invalid
						}`}
					>
						<label htmlFor="full-name">Your Full Name</label>
						<input type="text" id="full-name" ref={fullNameRef} />
						{!formValidity.fullName && <p>Please enter your full name!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.birthday ? "" : classes.invalid
						}`}
					>
						<label htmlFor="birthday">Your Birthday</label>
						<input
							type="date"
							id="birthday"
							name="birthday"
							max={current}
							ref={birthdayRef}
						/>
						{!formValidity.birthday && <p>Please enter your birthday!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.gender ? "" : classes.invalid
						}`}
					>
						<label htmlFor="gender">Your Gender</label>
						<div className={classes.radio}>
							<label>Male</label>
							<input
								type="radio"
								id="male"
								name="gender"
								value="male"
								required
								ref={genderRef}
							/>
							<label>Female</label>
							<input
								type="radio"
								id="female"
								name="gender"
								value="female"
								required
								ref={genderRef}
							/>
							{!formValidity.gender && <p>Please enter your gender!</p>}
						</div>
					</div>

					<div
						className={`${classes.control} ${
							formValidity.creditCard ? "" : classes.invalid
						}`}
					>
						<label htmlFor="credit-card">Your Credit Card</label>
						<input type="text" id="credit-card" ref={creditCardRef} />
						{!formValidity.creditCard && <p>Please enter your credit card!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.phone ? "" : classes.invalid
						}`}
					>
						<label htmlFor="phone">Your Phone Number</label>
						<input type="text" id="phone" name="phone" ref={phoneRef} />
						{!formValidity.phone && <p>Please enter your phone number!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.email ? "" : classes.invalid
						}`}
					>
						<label htmlFor="email">Your Email</label>
						<input type="email" id="email" ref={emailRef} />
						{!formValidity.email && <p>Please enter your email!</p>}
					</div>

					<div className={classes.actions}>
						<Button isEmpty={true} clickHandler={cancelHandler}>
							Cancel
						</Button>
						<Button type="submit" className={classes.submit}>
							Confirm
						</Button>
					</div>
				</form>
			</Card>
		</Section>
	);
};

export default CartCheckout;
