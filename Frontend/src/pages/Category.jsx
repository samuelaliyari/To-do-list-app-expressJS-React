import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import "./Category.scss";

const Category = () => {
	const [list, setList] = useState([]);
	const [taskStat, setTaskStat] = useState();
	const [task, setTask] = useState({
		task: "",
		priority: "",
		status: false,
		comment: "",
		link: "",
		deadline: "",
	});

	const categoryId = useParams().categoryId;

	const deleteTask = (id) => {
		return () => {
			fetch(
				`http://localhost:3000/api/data/${categoryId}/${id}/deletetask`,
				{ method: "DELETE" },
			)
				.then((res) => res.json())
				.then((data) => findCategory(data));
		};
	};

	const findCategory = (fetchData) => {
		const relatedList = fetchData.result?.filter(
			(category) => category.id.toString() === categoryId,
		);
		setList(relatedList[0]);
	};

	useEffect(() => {
		fetch("http://localhost:3000/api/data")
			.then((res) => res.json())
			.then((data) => findCategory(data));
	}, [categoryId]);

	useEffect(() => {
		console.log(taskStat);
	}, [taskStat]);

	useEffect(() => {
		console.log(taskStat);
	}, [list, task, taskStat]);

	const addTask = () => {
		fetch(`http://localhost:3000/api/data/addtask/${categoryId}`, {
			method: "PUT",
			body: JSON.stringify({ ...task, id: Date.now() }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => findCategory(data))
			.catch((err) => console.log(err));
	};

	return (
		<section className='categoryList'>
			<Navbar />
			<main>
				<div>
					<form onSubmit={() => event.preventDefault()}>
						<input
							type='text'
							placeholder='Task Title'
							onChange={(e) =>
								setTask({ ...task, task: e.target.value })
							}
						/>
						<select
							name=''
							id=''
							onChange={(e) =>
								setTask({ ...task, priority: e.target.value })
							}>
							<option
								value=''
								defaultChecked>
								Priority
							</option>
							<option value='high'>High</option>
							<option value='low'>Low</option>
						</select>
						<input
							type='text'
							placeholder='Add your Comment'
							onChange={(e) =>
								setTask({ ...task, comment: e.target.value })
							}
						/>
						<input
							type='text'
							placeholder='Add related link'
							onChange={(e) =>
								setTask({ ...task, link: e.target.value })
							}
						/>

						<input
							type='datetime-local'
							name=''
							id=''
							onChange={(e) =>
								setTask({
									...task,
									deadline: e.target.value.replace("T", "  "),
								})
							}
						/>
						<button onClick={addTask}>Add Task</button>
					</form>
				</div>
				<section>
					{list.todos?.map((todo) => (
						<TodoCard
							key={todo.id}
							todo={todo}
							categoryId={categoryId}
							deleteTask={deleteTask}
						/>
					))}
				</section>
			</main>
		</section>
	);
};

export default Category;
