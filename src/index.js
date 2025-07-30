import React, {useState} from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
import LogIn from "./pages/LogIn/LogIn";

function App() {
	return <LogIn create={true}/>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
