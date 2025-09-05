function PostCard() {
	const handleClick = () => {
		function randomIntFromInterval(min, max) { // min and max included 
		  return Math.floor(Math.random() * (max - min + 1) + min);
		}

		const rndInt = randomIntFromInterval(0, 100000);

		window.location.href = "/post/" + String(rndInt);
	}

	return <div onClick={handleClick} className="post-card"></div>;
}

export default PostCard;
