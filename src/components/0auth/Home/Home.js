import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import "../Home/Home.css"
export const Home = ({ input, data, view, addCart, getProducts, pageCount,loader }) => {
  const [page,setPage]=useState([]);
  useEffect(() => {
    pagination();
  },[pageCount]);
  let arr = [];
  const pagination = () => {
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
      setPage(arr);
    }
  };
  return (
    <>
      <h1 className="text-center">Food Cart</h1>
      <h2 className="small text-center">Your food is just one click away...</h2>
      <div className="container text-center d-flex">
      {loader? <Loading/>:
        input.length >= 1
          ? view.map((items, index) => {
              return (
                <div
                  className="card my-5 mx-5"
                  id="home-card1"
                  key={index}
                >
                  <img
                    className="card-img-top"
                    id="home-img-card1"
                    src={items.image}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{items.productName}</h5>
                    <p className="card-text">{items.description}</p>
                    <h2>
                      <b>$ {items.price} /-</b>
                    </h2>
                    <a
                      className="btn btn-success"
                      onClick={() => addCart(items._id)}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              );
            })
          : data.map((items, index) => {
              return (
                <div
                  className="card my-5 mx-5"
                  id="home-card2"
                  key={index}
                >
                  <img
                    className="card-img-top"
                    id="home-img-card2"
                    src={items.image}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{items.productName}</h5>
                    <p className="card-text">{items.description}</p>
                    <h2>
                      <b>$ {items.price} /-</b>
                    </h2>
                    <a
                      className="btn btn-success"
                      onClick={() => addCart(items._id)}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="container d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {page.map((items, index) => {
              return (
                <li className="page-item" key={index}>
                  <a className="page-link" onClick={() => getProducts(index+1)}>
                    {items}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};
