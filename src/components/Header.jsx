import { NavLink } from "react-router-dom";

const Header = ({ setSearchText }) => {
  return (
    <>
      <nav>
        <div className="d-flex justify-content-between">
          <NavLink className="navbar-brand meetup-logo" to="/">
            meetup
          </NavLink>
          <input
            className="form-control w-auto"
            type="text"
            placeholder="🔍 Search by title and t..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <hr />
      </nav>
    </>
  );
};

export default Header;
