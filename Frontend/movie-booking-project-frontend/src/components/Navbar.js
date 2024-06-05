import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout() {
    if (user && user.token) {
      axios
        .post(
          "http://127.0.0.1:8000/api/logout/",
          {},
          {
            headers: { Authorization: " Token " + user.token },
          }
        )
        .then(() => {
          dispatch(removeUser());
          navigate("/login");
        })
        .catch((error) => {
          console.log("Logout error");
        });
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <h4>MOVIES</h4>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                to={"/"}
                className="nav-link"
                activeClassName="active"
              >
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/list"}
                className="nav-link"
                activeClassName="active"
              >
                MOVIE LIST
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/Pre"}
                className="nav-link"
                activeClassName="active"
              >
                MY BOOKINGS
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={Logout}
                >
                  LOGOUT
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to={"/login"}
                  className="nav-link"
                  activeClassName="active"
                >
                  LOGIN
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
