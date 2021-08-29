import { Link } from "react-router-dom";

function Card({ link, picture, title, subtitle }) {
  return (
    <Link
      to={link ? link : "#"}
      className={"card-image col-3 d-flex align-items-end"}
      style={{ backgroundImage: `url(${picture})` }}
    >
      <div className="name-card-text">
        <div className="fw-bolder">{title}</div>
        {subtitle}
      </div>
    </Link>
  );
}
export default Card;
