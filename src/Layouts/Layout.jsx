// eslint-disable-next-line react/prop-types
import PropTypes from "prop-types";

import Pizzalogo from "../assets/images/pizza1.png";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import CartIcon from "../assets/images/cart.svg";
import { useEffect } from "react";
import { getCartDetails } from "../Redux/Slices/CartSlice";
function Layout({ children, scrollToServices, scrollToMenu, scrollToAbout }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  async function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  async function fetchCartDetails() {
    const res = await dispatch(getCartDetails());
    if (res?.payload?.isUnauthorized) {
      dispatch(logout());
    }
  }

  const { cartsData } = useSelector((state) => state.cart);

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartDetails();
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="pl-2">Pizza Corner</p>
          <img src={Pizzalogo} className="h-13 w-12 md:h-16 md:w-16" alt="Pizza logo" />
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4">
            <li
              className="hover:text-[#FF9110] cursor-pointer"
              onClick={scrollToMenu}
            >
              {" "}
              <p>Menu </p>
            </li>

            <li
              className="hover:text-[#FF9110] cursor-pointer"
              onClick={scrollToServices}
            >
              {" "}
              <p>Services </p>
            </li>

            <li
              className="hover:text-[#FF9110] cursor-pointer"
              onClick={scrollToAbout}
            >
              {" "}
              <p>About </p>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex gap-2 pl-1 text-center text-wrap">
            <li className="hover:text-[#FF9110]">
              {isLoggedIn && role === "ADMIN" ? (
                <Link to="/admin/addProduct">Add Pizza</Link>
              ) : null}
            </li>

            <li className="hover:text-[#FF9110]">
              {isLoggedIn ? (
                <Link onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to={"/auth/signup"}>SignUp</Link>
              )}
            </li>
            <li className="hover:text-[#FF9110]">
              {!isLoggedIn && <Link to={"/auth/login"}>Login</Link>}
            </li>

            {isLoggedIn && (
              <Link to={"/cart"}>
                <li className="pr-1">
                  <img src={CartIcon} className="w-8 h-8 inline" />{" "}
                  <p className="text-black inline">
                    {cartsData?.items?.length}
                  </p>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </nav>

      {children}

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  scrollToServices: PropTypes.func.isRequired,
  scrollToMenu: PropTypes.func.isRequired,
  scrollToAbout: PropTypes.func.isRequired,
};
export default Layout;
