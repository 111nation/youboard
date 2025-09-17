import "./Home.css";
import Btn from "../../components/Buttons/Btn";
import Posts from "../../components/Cards/Posts";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomeBar from "../../components/NavBars/HomeBar";
import { useEffect, useState } from "react";
import { getHomePosts } from "../../results";
import PopUp from "../../components/PopUp/PopUp";

function TopNav(props) {
  let universityPage =
    props.universityPage === undefined ? false : props.universityPage;
  return (
    <div className="top-bar">
      <div className="tab">
        <Btn
          onClick={props.onClick}
          className={!universityPage ? "active" : ""}
        >
          Home
        </Btn>
        <Btn onClick={props.onClick} className={universityPage ? "active" : ""}>
          Your University
        </Btn>
      </div>
      <SearchBar />
    </div>
  );
}

function Home() {
  let [universityPage, setUniversityPage] = useState(false);
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  const switchUniversityPage = () => {
    let oldState = universityPage;
    setUniversityPage(!oldState);
  };

  const getPosts = async () => {
    setLoading(true);
    let posts = await getHomePosts();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  function HomeTab() {
    return (
      <>
        <Posts loading={loading} posts={posts} />
        {!loading && posts.length === 0 && (
          <p className="heading">Be the first to post!</p>
        )}
      </>
    );
  }

  function UniversityTab() {
    return (
      <PopUp
        title="Still working on it!"
        message="This page has not been created yet!"
      >
        <Btn onClick={() => setUniversityPage(false)}>Go Back</Btn>
      </PopUp>
    );
  }

  return (
    <div className="page home-page">
      <TopNav universityPage={universityPage} onClick={switchUniversityPage} />
      {universityPage ? <UniversityTab /> : <HomeTab />}
      <HomeBar index={0} />
    </div>
  );
}

export default Home;
