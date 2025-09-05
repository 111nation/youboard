import {useParams} from "react-router-dom";
import HomeBar from "../../components/NavBars/HomeBar";
import SmallProfile from "../../components/Profiles/SmallProfile";
import "./FollowList.css";

function FollowList(props) {
	return (
		<div className="page followlist-page">
			<div className="followlist-wrap">
				<p className="heading">{props.heading}</p>
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
	);
}

export default FollowList;
