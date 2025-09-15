function PostCard(props) {
  const handleClick = () => {
    if (!props.id) return;

    window.location.href = "/post/" + props.id;
  };

  let className = "post-card " + (props.image ? "loaded" : "");

  return (
    <div onClick={handleClick} className={className}>
      {!props.image ? <div className="image-loader"></div> : ""}
      <img src={props.image} loading="lazy" />
    </div>
  );
}

export default PostCard;
