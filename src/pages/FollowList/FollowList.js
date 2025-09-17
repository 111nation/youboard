import { useEffect, useState } from "react";
import HomeBar from "../../components/NavBars/HomeBar";
import SmallProfile from "../../components/Profiles/SmallProfile";
import TopNav from "../../components/TopNav/TopNav";
import "./FollowList.css";
import { useParams } from "react-router-dom";
import { currentUser, User, USER_ERRORS } from "../../user";
import { followers, following, numFollowers } from "../../follow";
import PopUp from "../../components/PopUp/PopUp";
import Btn from "../../components/Buttons/Btn";
import Loader from "../../components/PopUp/Loader/Loader";

const errorPopUp = (title, msg) => {
  return (
    <PopUp title={title} message={msg}>
      <Btn onClick={() => window.history.back()}>Go Back</Btn>
    </PopUp>
  );
};

function FollowList(props) {
  const { user } = useParams();
  let [accounts, setAccounts] = useState([]);
  let [stats, setStats] = useState([]);
  let [popup, setPopUp] = useState(<></>);
  let [loader, setLoader] = useState(<></>);

  const loadFollowers = async () => {
    setLoader(<Loader />);
    let result = await User.getFromUsername(user.substring(1));
    let list = await (props.title === "Followers"
      ? followers(result.uid)
      : following(result.uid));

    // Get follower count for each user
    let stats = await Promise.all(list.map((user) => numFollowers(user.uid)));

    setLoader(<></>);
    setAccounts(list);
    setStats(stats);
  };

  useEffect(() => {
    loadFollowers().catch((e) => {
      // Failed to load user
      switch (e.code) {
        case USER_ERRORS.USER_DATA_NOT_FOUND:
          return setPopUp(
            errorPopUp(
              "User not found!",
              user + " hasn't joined youboard, yet!",
            ),
          );
        default:
          return setPopUp(errorPopUp("Errors!", "Failed to fetch account :("));
      }
    });
  }, []);

  return (
    <>
      {popup}
      <TopNav title={props.title} />
      <div className="page followlist-page">
        {loader}
        <div className="followlist-wrap">
          {accounts.map((user, i) => (
            <SmallProfile
              key={i}
              username={user.username}
              followers={stats[i]}
              icon={user.icon}
            />
          ))}
        </div>
      </div>
<HomeBar
          index={
            currentUser && user.substring(1) === currentUser.username ? 2 : -1
          }
        />
    </>
  );
}

export default FollowList;
