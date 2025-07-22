import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
// Pages
import Search from "./pages/Search/Search";
function App() {
	return (<>
		<Search />
	</>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
