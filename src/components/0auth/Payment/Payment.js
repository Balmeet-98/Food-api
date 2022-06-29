import React from "react";
import { Loading } from "../Loading/Loading";

export const Payment = ({ total, orderPlace, id, loader }) => {
  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <div className="container px-3 my-5 clearfix">
          <div className="card">
            <div className="card-header d-flex justify-content-center">
              <h2>Payment</h2>
            </div>
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
                className="btn btn-lg btn-primary mt-2 mb-5"
                onClick={() => {
                  orderPlace(id);
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
