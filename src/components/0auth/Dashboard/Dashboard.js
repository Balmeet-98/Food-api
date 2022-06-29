import React, { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import $ from "jquery";
import "../Dashboard/Dashboard.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
import { Home } from "../Home/Home";
import { Cart } from "../Cart/Cart";
import { Orders } from "../Order/Orders";
import { Payment } from "../Payment/Payment";
import { Config } from "../Helper/Config";
export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [view, setView] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState([]);
  const [order, setOrder] = useState([]);
  const [Id, setId] = useState(0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getProducts();
    getCarts();
  }, []);

  useEffect(() => {
    searched();
  }, [input]);

  const getCarts = async () => {
    setLoader(true);
    try {
      const url = await Config()
        .get(`/user/getAllCarts`)
        .then((result) => {
          setId(result.data.data.results._id);
          setCart(result.data.data.results.items);
          setTotal(result.data.data.results.total);
          setLoader(false);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const getProducts = async (a) => {
    setLoader(true);
    try {
      const url = await Config()
        .post(`/user/getAllProducts`, {
          limit: 3,
          page: a,
        })
        .then((result) => {
          setData(result.data.data.products);
          setPageCount(result.data.data.pageCount);
          setLoader(false);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const searched = async () => {
    if (input.length > 0) {
      setLoader(true);
      try {
        const url = await Config()
          .post(`/user/getAllProducts`, {
            search: input,
          })
          .then((result) => {
            setView(result.data.data.products);
            setLoader(false);
          });
      } catch (e) {
        console.log(e);
        setLoader(false);
      }
    }
  };

  const addCart = async (a) => {
    try {
      const url = await Config()
        .post(`/user/addToCart`, {
          productId: a,
        })
        .then((result) => {
          setCart(result.data.data.items);
          setTotal(result.data.data.total);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const removeCart = async (a) => {
    const url = await Config()
      .delete(`/user/removeItemsFromCart/${a}`)
      .then((result) => {
        setCart(result.data.data.items);
        setTotal(result.data.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCart = async () => {
    const url = await Config()
      .delete(`/user/clearCart`)
      .then((result) => {
        setCart(result.data.data.items);
        setTotal(result.data.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const orderPlace = async (a) => {
    setLoader(true);
    try {
      const url = await Config()
        .post(`/user/placeOrder`, {
          _id: a,
        })
        .then((result) => {
          getCarts();
          navigate("/dashboard/");
          alert("Your order is placed");
          setLoader(false);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const orderSummary = async () => {
    setLoader(true);
    try {
      const url = await Config()
        .post(`/user/placedOrder`, {})
        .then((result) => {
          setOrder(result.data.data.reverse());
          setLoader(false);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    $("#wrapper").toggleClass("menuDisplayed");
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1 ms-5 my-3">
          <i>
            <b>Food Cart</b>
          </i>
        </span>

        <div className="form-inline d-flex mt-2">
          <button
            type="button"
            className="btn btn-outline-success position-relative me-5"
            onClick={() => navigate("/dashboard/cart")}
          >
            <GrCart />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          </button>
          <input
            type="search"
            id="form1"
            className="form-control me-2"
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-outline-success me-3"
            onClick={searched}
          >
            Search
          </button>
        </div>
      </nav>

      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li>
              <a onClick={() => navigate("/dashboard/")}>Products </a>
            </li>
            <li>
              <a onClick={() => navigate("/dashboard/orders")}>Orders</a>
            </li>
            <li>
              <a onClick={() => navigate("/dashboard/about")}>About </a>
            </li>
            <li>
              <a onClick={() => navigate("/dashboard/contact")}>Contact </a>
            </li>
            <li>
              <a onClick={logOut}>Log Out</a>
            </li>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <button className="btn" id="menu-toggle" onClick={handleClick}>
                  <span className="glyphicon glyphicon-menu-hamburger">
                    <BsList />
                  </span>
                </button>
                <div className="text-center" id="scroll-bar">
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <Home
                          input={input}
                          data={data}
                          view={view}
                          addCart={addCart}
                          pageCount={pageCount}
                          getProducts={getProducts}
                          loader={loader}
                        />
                      }
                    />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/about" element={<About />} />
                    <Route
                      exact
                      path="/payment"
                      element={
                        <Payment
                          total={total}
                          getCarts={getCarts}
                          navigate={navigate}
                          orderPlace={orderPlace}
                          id={Id}
                          loader={loader}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/orders"
                      element={
                        <Orders
                          order={order}
                          orderSummary={orderSummary}
                          loader={loader}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/cart"
                      element={
                        <Cart
                          cart={cart}
                          addCart={addCart}
                          removeCart={removeCart}
                          getCarts={getCarts}
                          total={total}
                          navigate={navigate}
                          deleteCart={deleteCart}
                          orderPlace={orderPlace}
                          loader={loader}
                        />
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
