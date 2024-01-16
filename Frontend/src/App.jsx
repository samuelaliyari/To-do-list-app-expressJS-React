import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import Category from "./pages/Category";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/addcategory'
						element={<AddCategory />}
					/>
					<Route
						path='/category/:categoryId'
						element={<Category />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
