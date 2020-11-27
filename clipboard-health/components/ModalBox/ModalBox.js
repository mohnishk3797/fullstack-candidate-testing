import React from "react";

const ModalBox = ({ setModalVisibility, jobs, filter }) => {
  const displayJobs = () => {
    return jobs.map(({ key, doc_count }, index) => (
      <div
        className="text-sm mb-2 cursor-pointer"
        key={`section-${key}-${index}`}
        onClick={() => filter()}
      >
        {key} <span className="text-gray-400">{doc_count}</span>
      </div>
    ));
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl 
          transform transition-all sm:my-8 sm:align-middle  sm:w-9/12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:text-left">
                <div
                  className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-300 w-screen pt-4 pb-4 pl-5"
                  id="modal-headline"
                >
                  <div
                    className="inline-block right-5 top-4 absolute"
                    onClick={() => setModalVisibility(false)}
                  >
                    <svg
                      className="h-6 w-6 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  Department
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500">
                    <div className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-2">
                      {displayJobs()}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalBox as default };
