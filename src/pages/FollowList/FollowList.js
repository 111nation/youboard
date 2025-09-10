import HomeBar from "../../components/NavBars/HomeBar";
import SmallProfile from "../../components/Profiles/SmallProfile";
import TopNav from "../../components/TopNav/TopNav";
import "./FollowList.css";

function FollowList(props) {
	return (
		<>
			<TopNav title={props.title}/>
			<div className="page followlist-page">
				<div className="followlist-wrap">
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
					<SmallProfile />
				</div>
				<HomeBar />
			</div>
		</>
	);
}

export default FollowList;
