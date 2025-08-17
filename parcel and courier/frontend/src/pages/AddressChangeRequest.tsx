import type { TAppDispatch, TRootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { fetchRequests } from "@/features/changeAddressSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddressChangeRequest: React.FC = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const { requests } = useSelector((state: TRootState) => state.addressChange);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  console.log(requests);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#232110] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex flex-col sm:flex-row items-center justify-between whitespace-nowrap border-b border-solid border-b-[#4a4621] px-4 sm:px-6 md:px-10 py-3">
          <div className="flex items-center gap-4 text-white mb-4 sm:mb-0">
            <i className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              United Parcel Service
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row flex-1 justify-end gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-9">
              <a
                className="text-white text-sm font-medium leading-normal hover:underline"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-white text-sm font-medium leading-normal hover:underline"
                href="#"
              >
                Shipments
              </a>
              <a
                className="text-white text-sm font-medium leading-normal hover:underline"
                href="#"
              >
                Customers
              </a>
              <a
                className="text-white text-sm font-medium leading-normal hover:underline"
                href="#"
              >
                Reports
              </a>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs8B3YTOOeqV0o0AlSoLKFIwToYxWTKHyTUQ7HgrFIHYR_Uqc5k69IaYaQZSGUjS1bPm9ypkCgNhCsY5TlCff3CF5Zs_gFcDXg3GYr3IB7bCRSJwsji_TfFhH-AhTfCjpRnqNONCwFk36Oufpba-B23OEc3HAKxWkKFWKpPe45VHlVHbcvTzoxOhbief5oo2dIcAYVP8EXmW-2Pfts7mJZrgzO1g-Pda5ApCgx6XkmVZRWpDEbamOjlHmpkhY81SfdNh3SZcuY1s0t")',
              }}
            ></div>
          </div>
        </header>
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-5xl py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex flex-col gap-3">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  Relocation Requests
                </p>
                <p className="text-[#ccc68e] text-sm font-normal leading-normal">
                  Review and manage visitor requests for address changes.
                </p>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="hidden md:flex overflow-hidden rounded-xl border border-[#6a642f] bg-[#232110]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#353218]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Parcel ID
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Old Address
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        New Address
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Approve
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                        Reject
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index} className="border-t border-t-[#6a642f]">
                        <td className="h-[72px] px-4 py-2 text-[#ccc68e] text-sm font-normal leading-normal">
                          {request.parcel_id}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#ccc68e] text-sm font-normal leading-normal">
                          {request.old_address}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#ccc68e] text-sm font-normal leading-normal">
                          {request.new_address}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#ccc68e] text-sm font-normal leading-normal">
                          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Approve
                          </Button>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#ccc68e] text-sm font-bold leading-normal tracking-[0.015em]">
                          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden flex flex-col gap-4">
                {requests.map((request, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-xl border border-[#6a642f] bg-[#232110] p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-medium">
                          Parcel ID
                        </span>
                        <span className="text-[#ccc68e] text-sm">
                          {request.parcel_id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-medium">
                          Old Address
                        </span>
                        <span className="text-[#ccc68e] text-sm">
                          {request.old_address}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-medium">
                          New Address
                        </span>
                        <span className="text-[#ccc68e] text-sm">
                          {request.new_address}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex-1">
                          Approve
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex-1">
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
    </div>
  );
};

export default AddressChangeRequest;
