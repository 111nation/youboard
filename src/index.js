import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
import PostView from "./pages/PostView/PostView";

function App() {
	return (<>
		<PostView />
	</>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
