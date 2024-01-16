import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<header>
			<nav>
				<div>
					<img
						src=''
						alt=''
					/>
					<h1>My Todo App</h1>
				</div>
				<div>
					<ul>
						<li>
							<NavLink to='/'>HOME</NavLink>
						</li>
						<li>
							<NavLink to='/addcategory'>ADD CATEGORY</NavLink>
						</li>
						<li>
							<NavLink to='/'>FILTER TASKS</NavLink>
						</li>
						<li>
							<NavLink to='/'></NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
