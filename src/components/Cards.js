import { Link } from "react-router-dom";

function Card({ link, item, title, subtitle }) {
  return (
    <Link
      to={link ? link : "#"}
      className={item + " card-image col-3 d-flex align-items-end"}
    >
      <div className="name-card-text">
        <div className="fw-bolder">{title}</div>
        {subtitle}
      </div>
    </Link>
  );
}
export default Card;
