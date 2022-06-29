import React, { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Loading } from "../Loading/Loading";
export const Cart = ({
  cart,
  addCart,
  removeCart,
  total,
  navigate,
  deleteCart,
  getCarts,
  loader,
}) => {
  useEffect(() => {
    getCarts();
  }, []);
  const add = (a) => {
    addCart(a);
  };
  const remove = (a) => {
    removeCart(a);
  };
  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <div className="container px-3 my-5 clearfix">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h2>Summary</h2>
              <button
                type="button"
                className="btn btn-lg btn-primary "
                onClick={deleteCart}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered m-0">
                  <thead>
                    <tr>
                      <th className="text-center py-3 px-4">Product Details</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-center py-3 px-4">Quantity</th>
                      <th className="text-right py-3 px-4">Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((items, index) => {
                      return (
                        <tr key={index}>
                          <td className="p-4">
                            <div className="media align-items-center">
                              {items.productName}
                            </div>
                          </td>
                          <td className="text-right font-weight-semibold align-middle p-4">
                            {items.price}
                          </td>
                          <td className="align-middle p-4">
                            <pre>
                              <button
                                type="button"
                                className="btn btn-success position-relative me-3"
                                onClick={() => remove(items._id)}
                              >
                                -
                              </button>
                              Quantity:{items.quantity}
                              <button
                                type="button"
                                className="btn btn-success position-relative ms-3"
                                onClick={() => add(items._id)}
                              >
                                +
                              </button>
                            </pre>
                          </td>
                          <td className="text-right font-weight-semibold align-middle p-4">
                            {items.subTotal}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                  <div className="d-flex">
                    <div className="text-right mt-4">
                      <label className="text-muted font-weight-normal m-0">
                        Total Price
                      </label>
                      <div className="text-large">
                        <strong>{total}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="float-right">
                  <button
                    type="button"
                    className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
                    onClick={() => navigate("/dashboard/")}
                  >
                    Back to shopping
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary mt-2"
                    onClick={() => {
                      if (cart.length > 0) {
                        navigate("/dashboard/payment");
                      } else {
                        alert("please enter some items to the cart");
                      }
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
