import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

function App() {
	/*
	if (!userLoggedIn()) {
		window.location.href = "/login";
	}
	*/

	return (
		<BrowserRouter>
			{/* ROUTES */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LogIn create={false}/>} />
			</Routes>
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App />
);
