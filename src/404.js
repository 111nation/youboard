import {useParams} from "react-router-dom";

function RedirectErrorPage() {
	const { error } = useParams();

	if (error) 
		return <p className="heading">{error}</p>;

	return <p className="heading">Not found :(</p>;
}

export default RedirectErrorPage;
