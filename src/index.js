import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Search from "./pages/Search/Search";
import FollowList from "./pages/FollowList/FollowList";
import Profile from "./pages/Profile/Profile";
import Post from "./pages/PostView/PostView";
import RedirectErrorPage from "./404";
import {currentUser} from "./user";
import Upload from "./pages/Upload/Upload";
import Settings from "./pages/Settings/Settings";
import PopUp from "./components/PopUp/PopUp";

function App() {
	if (!currentUser) window.location.href = "/login";

	return (
		<>
		<BrowserRouter>
			{/* ROUTES */ }
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/404/:error" element={<RedirectErrorPage />} />
				<Route path="/404" element={<RedirectErrorPage />} />
				<Route path="/:user" element={<Profile />} />
				<Route path="/login" element={<LogIn create={false}/>} />
				<Route path="/search/:query" element={<Search />} />
				<Route path="/:user/followers" element={<FollowList title="Followers"/>} />
				<Route path="/:user/following" element={<FollowList title="Following"/>} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</BrowserRouter>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App />
);
