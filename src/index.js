import React, {useState} from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
import Home from "./pages/Home/Home";

function App() {
	return <Home />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
