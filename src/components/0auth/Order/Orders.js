import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { Loading } from "../Loading/Loading";
export const Orders = ({ order, orderSummary, loader }) => {
  useEffect(() => {
    orderSummary();
  }, []);
  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        order.map((items, index) => {
          return (
            <div className="container" key={index}>
              <div className="accordion">
                <Accordion allowToggle className="light">
                  <AccordionItem>
                    <h2 className="accordion-header">
                      <AccordionButton className="accordion-button text-dark bg-light">
                        <span className="me-2 ">Order Id:</span> {items.orderId}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <div className="table-responsive">
                        <table className="table table-bordered m-0">
                          <thead>
                            <tr>
                              <th className="text-center py-3 px-4">
                                Product Details
                              </th>
                              <th className="text-right py-3 px-4">Price</th>
                              <th className="text-right py-3 px-4">
                                Sub Total
                              </th>
                              <th className="text-center py-3 px-4">
                                Payment Status
                              </th>
                              <th className="text-right py-3 px-4">
                                Delivery Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.items.map((item2, index2) => {
                              return (
                                <tr key={index2}>
                                  <td className="p-4">
                                    <div className="media align-items-center">
                                      {item2.productName}
                                    </div>
                                  </td>
                                  <td className="text-right font-weight-semibold align-middle p-4">
                                    <pre>
                                      {item2.price} x {item2.quantity}
                                    </pre>
                                  </td>
                                  <td className="align-middle p-4">
                                    <pre> {item2.subTotal} </pre>
                                  </td>
                                  <td className="text-center align-middle px-0">
                                    {items.paid}
                                  </td>
                                  <td className="align-middle p-4">
                                    {items.status}
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
                                <strong>{items.total}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" mb-4">
                          <a
                            href={`https://food-app-hai.herokuapp.com${items.invoice}`}
                            target="_blank"
                            className="btn btn-outline-success"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
