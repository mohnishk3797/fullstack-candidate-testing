import React, { useState } from "react";
import ModalBox from "../ModalBox";

const SideBarSection = ({ title, options, limit}) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  // if limit > 10 then modal box the rest
  const displayOptions = (options, limit) => {
    let result = [];

    if (limit >= 10) {
      result = options.slice(0, 10).map(({ key, doc_count }, index) => (
        <div
          className="text-sm mb-2 cursor-pointer"
          key={`section-${key}-${index}`}
          onClick={() => filter()}
        >
          {key} <span className="text-gray-400">{doc_count}</span>
        </div>
      ));

      result.push(
        <div className="text-sm mb-2 cursor-pointer" key="view-more">
          <span
            className="text-gray-400"
            onClick={() => setModalVisibility(true)}
          >
            Show more
          </span>
          {isModalVisible && <ModalBox setModalVisibility={setModalVisibility} jobs={options.slice(10)} filter={filter} />}
        </div>
      );
    } else {
      result = options.map(({ key, doc_count }, index) => (
        <div
          className="text-sm mb-2 cursor-pointer"
          key={`section-${key}-${index}`}
          onClick={() => filter()}
        >
          {key} <span className="text-gray-400">{doc_count}</span>
        </div>
      ));
    }

    if(result.length === 0) return <div className="text-center">No Filter Types</div>

    return result;
  };
  return (
    <div className="border border-gray-300 bg-white p-3 mr-3 mb-5 mr-5">
      <div className="text-sm uppercase font-semibold mb-4">{title}</div>
      {displayOptions(options, limit)}
    </div>
  );
};

export { SideBarSection as default };
