import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import PostView from "./pages/PostView";
import Profile from "./pages/Profile";
import FollowList from "./pages/FollowList";
import Btn from "./components/Buttons/Btn";
import FollowBtn from "./components/Buttons/FollowBtn";
import VisitBtn from "./components/Buttons/VisitBtn";
import SaveBtn from "./components/Buttons/SaveBtn";
// Components
import SearchBar from "./components/SearchBar/SearchBar";
import BackBtn from "./components/Buttons/BackBtn";
import NavBar from "./components/NavBars/NavBar";
import SaveBar from "./components/NavBars/SaveBar";
import HomeBar from "./components/NavBars/HomeBar";
import Posts from "./components/Cards/Posts";
import BigProfile from "./components/Profiles/BigProfile";
import SmallProfile from "./components/Profiles/SmallProfile";
import Post from "./components/Post/Post";


function App() {
	return (<>
		<BackBtn />
		<Post />
		<SaveBar />
	</>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
