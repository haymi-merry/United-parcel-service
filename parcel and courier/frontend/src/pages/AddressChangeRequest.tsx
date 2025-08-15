import React from "react";

const AddressChangeRequest: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#232110] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#4a4621] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
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
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-white text-sm font-medium leading-normal"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-white text-sm font-medium leading-normal"
                href="#"
              >
                Shipments
              </a>
              <a
                className="text-white text-sm font-medium leading-normal"
                href="#"
              >
                Customers
              </a>
              <a
                className="text-white text-sm font-medium leading-normal"
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
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                  Relocation Requests
                </p>
                <p className="text-[#ccc68e] text-sm font-normal leading-normal">
                  Review and manage visitor requests for address changes.
                </p>
              </div>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#6a642f] bg-[#232110]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#353218]">
                      <th className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Visitor Name
                      </th>
                      <th className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Original Address
                      </th>
                      <th className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        New Address
                      </th>
                      <th className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Message
                      </th>
                      <th className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-600 px-4 py-3 text-left text-white w-60  text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#6a642f]">
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                        Sophia Carter
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-240 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        123 Maple Street, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-360 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        456 Oak Avenue, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-480 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        Moving closer to family.
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-600 h-[72px] px-4 py-2 w-60 text-[#ccc68e] text-sm font-bold leading-normal tracking-[0.015em]">
                        Approve | Reject
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#6a642f]">
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                        Ethan Bennett
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-240 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        789 Pine Lane, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-360 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        101 Cedar Road, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-480 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        Relocating for work.
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-600 h-[72px] px-4 py-2 w-60 text-[#ccc68e] text-sm font-bold leading-normal tracking-[0.015em]">
                        Approve | Reject
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#6a642f]">
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                        Olivia Hayes
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-240 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        222 Elm Street, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-360 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        333 Birch Drive, Anytown, USA
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-480 h-[72px] px-4 py-2 w-[400px] text-[#ccc68e] text-sm font-normal leading-normal">
                        Personal reasons.
                      </td>
                      <td className="table-b78ed1c0-767a-4a74-9879-240dda548288-column-600 h-[72px] px-4 py-2 w-60 text-[#ccc68e] text-sm font-bold leading-normal tracking-[0.015em]">
                        Approve | Reject
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container (max-width: 120px) {
                    .table-b78ed1c0-767a-4a74-9879-240dda548288-column-120 { display: none; }
                  }
                  @container (max-width: 240px) {
                    .table-b78ed1c0-767a-4a74-9879-240dda548288-column-240 { display: none; }
                  }
                  @container (max-width: 360px) {
                    .table-b78ed1c0-767a-4a74-9879-240dda548288-column-360 { display: none; }
                  }
                  @container (max-width: 480px) {
                    .table-b78ed1c0-767a-4a74-9879-240dda548288-column-480 { display: none; }
                  }
                  @container (max-width: 600px) {
                    .table-b78ed1c0-767a-4a74-9879-240dda548288-column-600 { display: none; }
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressChangeRequest;
