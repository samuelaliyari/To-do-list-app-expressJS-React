import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./AddCategory.scss";
const AddCategory = () => {
	const [categoryTitle, setCategoryTitle] = useState("");

	const addCategory = () => {
		event.preventDefault();
		fetch("http://localhost:3000/api/data/addnewcategory", {
			method: "POST",
			body: JSON.stringify({ title: categoryTitle }),
			headers: { "Content-Type": "application/json" },
		});
	};

	useEffect(() => {
		console.log(categoryTitle);
	}, [categoryTitle]);
	return (
		<section className='addCategory'>
			<Navbar />
			<form>
				<input
					type='text'
					placeholder='Name your new Category'
					onChange={(e) => setCategoryTitle(e.target.value)}
					value={categoryTitle}
				/>
				<button onClick={addCategory}>Add</button>
			</form>
		</section>
	);
};

export default AddCategory;
