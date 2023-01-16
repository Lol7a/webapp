import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Section from "../ui/Section";

import classes from "./CartCheckout.module.scss";

const isEmpty = (value) => value.trim() === "";

const CartCheckout = (props) => {
	const current = new Date().toISOString().split("T")[0];
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

	const submitHandler = (event) => {
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
		const enteredCreditCardValid = !isEmpty(enteredCreditCard);
		const enteredPhoneValid = !isEmpty(enteredPhone);
		const enteredEmailValid = !isEmpty(enteredEmail);

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
	};

	const cancelHandler = () => {
		navigate("/shopping-cart");
	};

	// const confirmHandler = () => {};

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
						<input type="date" id="birthday" max={current} ref={birthdayRef} />
						{!formValidity.birthday && <p>Please enter your birthday!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.gender ? "" : classes.invalid
						}`}
					>
						<label htmlFor="gender">Your Gender</label>
						<input type="radio" id="gender" name="gender" ref={genderRef} />
						<label>Male</label>
						<input type="radio" id="gender" name="gender" ref={genderRef} />
						<label>Female</label>
						{!formValidity.gender && <p>Please enter your gender!</p>}
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
						<input type="text" id="phone" ref={phoneRef} />
						{!formValidity.phone && <p>Please enter your phone number!</p>}
					</div>

					<div
						className={`${classes.control} ${
							formValidity.email ? "" : classes.invalid
						}`}
					>
						<label htmlFor="email">Your Email</label>
						<input type="text" id="email" ref={emailRef} />
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