import "./Home.css";
import Btn from "../../components/Buttons/Btn";
import Posts from "../../components/Cards/Posts";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomeBar from "../../components/NavBars/HomeBar";

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
	return (
		<div className="page home-page">
			<TopNav />
			<Posts />
			<HomeBar index={0}/>
		</div>
	);
}

export default Home;
