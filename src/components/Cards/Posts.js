import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import "./Posts.css";
import { Post } from "../../post";

function Posts(props) {
  if (props.loading) {
    return (
      <div className="posts-container">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    );
  }

  let posts = props.posts || [];

  return (
    <div className="posts-container">
      {posts.map((post, i) => (
        <PostCard image={URL.createObjectURL(post.file)} key={i} id={post.id} />
      ))}
    </div>
  );
}

export default Posts;
