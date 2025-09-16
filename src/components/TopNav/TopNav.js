import { useNavigate } from "react-router-dom";
import "./TopNav.css";

function TopNav(props) {
  const navigate = useNavigate();
  const onBackClick = () => navigate(-1);

  return (
    <div className="topnav">
      <svg
        onClick={onBackClick}
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12H18M6 12L11 7M6 12L11 17"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="subheading">{props.title}</p>
    </div>
  );
}

export default TopNav;
