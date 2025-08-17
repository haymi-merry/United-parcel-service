import type { TAppDispatch, TRootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { fetchRequests, updateRequest } from "@/features/changeAddressSlice";
import { updateShipmentById } from "@/features/shipmentSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddressChangeRequest: React.FC = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const { requests } = useSelector((state: TRootState) => state.addressChange);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  async function handleRequestAction(
    action: "Approve" | "Reject",
    parcelId: string,
    destination: string
  ) {
    if (!parcelId) return;

    if (action === "Approve" && destination) {
      // Update shipment destination
      await dispatch(
        updateShipmentById({
          parcelId,
          shipmentData: { destination },
        })
      );

      // Update request status
      await dispatch(
        updateRequest({
          parcel_id: parcelId,
          new_address: destination,
          status: "Approved",
        })
      );

      Swal.fire({
        icon: "success",
        title: "Approved",
        text: "The address change request has been approved.",
      }).then(() => {
        dispatch(fetchRequests());
      });
    } else {
      // Reject case
      await dispatch(
        updateRequest({
          parcel_id: parcelId,
          new_address: destination,
          status: "Rejected",
        })
      );

      Swal.fire({
        icon: "info",
        title: "Rejected",
        text: "The address change request has been rejected.",
      }).then(() => {
        dispatch(fetchRequests());
      });
    }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#232110] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between border-b border-b-[#4a4621] px-4 sm:px-6 md:px-10 py-3">
          <div className="flex items-center gap-4 text-white mb-4 sm:mb-0">
            <h2 className="text-white text-lg font-bold">
              United Parcel Service
            </h2>
          </div>
          <div className="flex gap-4 sm:gap-8">
            <a className="text-white text-sm hover:underline" href="#">
              Dashboard
            </a>
            <a className="text-white text-sm hover:underline" href="#">
              Shipments
            </a>
            <a className="text-white text-sm hover:underline" href="#">
              Customers
            </a>
            <a className="text-white text-sm hover:underline" href="#">
              Reports
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-5xl py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex flex-col gap-3">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                  Relocation Requests
                </p>
                <p className="text-[#ccc68e] text-sm">
                  Review and manage visitor requests for address changes.
                </p>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:flex overflow-hidden rounded-xl border border-[#6a642f] bg-[#232110]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#353218]">
                    <th className="px-4 py-3 text-left text-white">
                      Parcel ID
                    </th>
                    <th className="px-4 py-3 text-left text-white">
                      Old Address
                    </th>
                    <th className="px-4 py-3 text-left text-white">
                      New Address
                    </th>
                    <th className="px-4 py-3 text-left text-white">Status</th>
                    <th className="px-4 py-3 text-left text-white">Approve</th>
                    <th className="px-4 py-3 text-left text-white">Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.parcel_id}
                      className="border-t border-t-[#6a642f]"
                    >
                      <td className="px-4 py-2 text-[#ccc68e]">
                        {request.parcel_id}
                      </td>
                      <td className="px-4 py-2 text-[#ccc68e]">
                        {request.old_address}
                      </td>
                      <td className="px-4 py-2 text-[#ccc68e]">
                        {request.new_address}
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : request.status === "Pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {request.status}
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() =>
                            handleRequestAction(
                              "Approve",
                              request.parcel_id,
                              request.new_address
                            )
                          }
                        >
                          Approve
                        </Button>
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() =>
                            handleRequestAction(
                              "Reject",
                              request.parcel_id,
                              request.new_address
                            )
                          }
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {requests.map((request) => (
                <div
                  key={request.parcel_id}
                  className="flex flex-col rounded-xl border border-[#6a642f] bg-[#232110] p-4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-white text-sm">Parcel ID</span>
                      <span className="text-[#ccc68e]">
                        {request.parcel_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white text-sm">Old Address</span>
                      <span className="text-[#ccc68e]">
                        {request.old_address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white text-sm">New Address</span>
                      <span className="text-[#ccc68e]">
                        {request.new_address}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white flex-1"
                        onClick={() =>
                          handleRequestAction(
                            "Approve",
                            request.parcel_id,
                            request.new_address
                          )
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white flex-1"
                        onClick={() =>
                          handleRequestAction(
                            "Reject",
                            request.parcel_id,
                            request.new_address
                          )
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressChangeRequest;
