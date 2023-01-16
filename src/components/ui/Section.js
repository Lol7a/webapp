import classes from "./Section.module.scss";

const Section = (props) => {
	return (
		<section className={`${classes.section} ${props.className}`}>
			{props.children}
		</section>
	);
};

export default Section;
