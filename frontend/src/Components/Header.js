import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";

// react notify :
import { toast } from "react-toastify";

const Header = () => {
  //react notify :
  const notify = () => {
    toast.success("welcome to profile", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  // useEffect(()=>{
  //   if(!userInfo){
  //     navigate( "/login" )
  //   }
  // }, [userInfo, navigate])

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Link to="/">
              <Navbar.Brand>ProShop</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link>
                  <NavLink to="/cart">
                    <i
                      className="fa fa-shopping-cart me-1"
                      aria-hidden="true"
                    ></i>
                    Cart
                  </NavLink>
                </Nav.Link>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    {/* <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> */}
                    <Nav.Link
                      as={Link}
                      href="#"
                      to="/profile"
                      style={{ color: "black", margin: "0 0 0 10px" }}
                      onClick={notify}
                    >
                      Profile
                    </Nav.Link>
                    {/* <Link to= '/profile'>
                        <NavDropdown.Item>
                          Profile
                        </NavDropdown.Item>
                      </Link> */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>
                    <NavLink to="/login">
                      <i className="fa fa-user me-1" aria-hidden="true"></i>Sign
                      In
                    </NavLink>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
