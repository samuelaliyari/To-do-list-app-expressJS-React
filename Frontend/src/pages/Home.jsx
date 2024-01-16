import Navbar from "../components/Navbar";
import TodoCategory from "../components/TodoCategory";
import "./Home.scss";

const Home = () => {
	return (
		<section className='home'>
			<Navbar />
			<main>
				<TodoCategory />
			</main>
		</section>
	);
};

export default Home;
