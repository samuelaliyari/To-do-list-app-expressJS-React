import { useEffect, useState } from "react";
import "./TodoCard.scss";
const TodoCard = ({ todo, deleteTask, categoryId }) => {
	const [task, settask] = useState({});

	useEffect(() => {
		settask(todo);
	}, []);
	const changeStat = (id) => {
		return () => {
			fetch(
				`http://localhost:3000/api/data/${categoryId}/${id}/changestat`,
				{ method: "PATCH" },
			)
				.then((res) => res.json())
				.then((data) => {
					const list = data.result.find(
						(list) => list.id.toString() === categoryId,
					);
					const task = list.todos.find((task) => task.id === id);
					settask(task);
				});
		};
	};

	return (
		<article
			className={
				task.priority === "high"
					? "todoCard high"
					: task.priority === "low"
					? "todoCard low"
					: "todoCard"
			}
			style={
				task.status
					? {
							backgroundColor: "#70fd72b4",
							textDecoration: "line-through",
					  }
					: null
			}>
			<input
				type='checkbox'
				name={task.task}
				id=''
				onChange={changeStat(task.id)}
				checked={task.status || false}
			/>
			<div>
				<h2>{task.task}</h2>
				<h3>{task.comment} </h3>
				<h4>{task.link}</h4>
				<h5>{task.deadline}</h5>
			</div>
			<h6 onClick={deleteTask(todo.id)}>❌</h6>
		</article>
	);
};

export default TodoCard;
