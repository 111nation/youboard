import "./Home.css";
import Btn from "../../components/Buttons/Btn";
import Posts from "../../components/Cards/Posts";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomeBar from "../../components/NavBars/HomeBar";
import {useState} from "react";

function TopNav(props) {
	let universityPage = props.universityPage === undefined ? false : props.universityPage;
	return (
		<div className="top-bar">
			<div className="tab">
				<Btn onClick={props.onClick} className={!universityPage ? "active" : ""}>Home</Btn>
				<Btn onClick={props.onClick} className={universityPage ? "active" : ""}>Your University</Btn>
			</div>
			<SearchBar />
		</div>
	);
}

function Home () {
	let [universityPage, setUniversityPage] = useState(false);

	const switchUniversityPage = () => {
		let oldState = universityPage;
		setUniversityPage(!oldState);
	}

	return (
		<div className="page home-page">
			<TopNav universityPage={universityPage} onClick={switchUniversityPage}/>
			<Posts />
			<HomeBar index={0}/>
		</div>
	);
}

export default Home;
