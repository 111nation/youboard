import "./Home.css";
import Btn from "../../components/Buttons/Btn";
import Posts from "../../components/Cards/Posts";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomeBar from "../../components/NavBars/HomeBar";
import {auth} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";

function TopNav() {
	return (
		<div className="top-bar">
			<div className="tab">
				<Btn className="active">Home</Btn>
				<Btn>University of Pretoria</Btn>
			</div>
			<SearchBar />
		</div>
	);
}

function Home () {
	// If user not logged in take them to login page
	onAuthStateChanged(auth, (user) => {
		if (!user) window.location.href = "/login";
	});

	return (
		<div className="page home-page">
			<TopNav />
			<Posts />
			<HomeBar index={0}/>
		</div>
	);
}

export default Home;
