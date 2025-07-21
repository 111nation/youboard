import NavBar from "./NavBar";
import "./NavBar.css";

function HomeBar() {
	return (
	<NavBar>
		<svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_15_3)">
			<rect width="24" height="24"/>
			<path d="M9 21H4C3.44772 21 3 20.5523 3 20V12.4142C3 12.149 3.10536 11.8946 3.29289 11.7071L11.2929 3.70711C11.6834 3.31658 12.3166 3.31658 12.7071 3.70711L20.7071 11.7071C20.8946 11.8946 21 12.149 21 12.4142V20C21 20.5523 20.5523 21 20 21H15M9 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21" stroke-linejoin="round"/>
			</g>
			<defs>
			<clipPath id="clip0_15_3">
			<rect width="24" height="24"/>
			</clipPath>
			</defs>
		</svg>

		<svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8814 4.5H9.11862L7.46862 7.03125H3.75L3 7.78125V18.75L3.75 19.5H20.25L21 18.75V7.78125L20.25 7.03125H16.5314L14.8814 4.5ZM8.28138 8.53125L9.93138 6H14.0686L15.7186 8.53125H19.5V18H4.5V8.53125H8.28138ZM9.75 12.75C9.75 11.5074 10.7574 10.5 12 10.5C13.2426 10.5 14.25 11.5074 14.25 12.75C14.25 13.9926 13.2426 15 12 15C10.7574 15 9.75 13.9926 9.75 12.75ZM12 9C9.92893 9 8.25 10.6789 8.25 12.75C8.25 14.8211 9.92893 16.5 12 16.5C14.0711 16.5 15.75 14.8211 15.75 12.75C15.75 10.6789 14.0711 9 12 9Z"/>
		</svg>
	</NavBar>
	);
}

export default HomeBar;
