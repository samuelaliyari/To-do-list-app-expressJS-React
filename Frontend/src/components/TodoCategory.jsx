import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoCard from "./TodoCard";
import "./TodoCategory.scss";
const TodoCategory = () => {
	const [categoryArr, setCategoryArr] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/data")
			.then((res) => res.json())
			.then((data) => setCategoryArr(data.result))
			.catch((err) => console.log(err));
	}, []);

	const deleteCategory = (id) => {
		return () => {
			fetch(`http://localhost:3000/api/data/${id}/deletecategory`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => setCategoryArr(data.result));
		};
	};
	return (
		<section className='category'>
			{categoryArr.map((category) => (
				<div key={category.id}>
					<Link to={`/category/${category.id}`}>
						{category.title}
					</Link>
					<h6
						title='DELETE'
						onClick={deleteCategory(category.id)}>
						❌
					</h6>
				</div>
			))}
		</section>
	);
};

export default TodoCategory;
