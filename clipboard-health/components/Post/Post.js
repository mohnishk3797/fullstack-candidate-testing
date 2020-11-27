import React, { useState } from "react";
import { ShortName } from "../../utils/utils.functions";
import PostJobs from "../PostJobs";

const Post = ({ post }) => {
  const { total_jobs_in_hospital, name, items } = post;
  const [isListVisible, setListVisibility] = useState(false);
  return (
    <>
      <div className="relative flex mb-4 cursor-pointer" onClick={() => setListVisibility(isListVisible ? false : true)}>
        <span className="relative rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg h-10 w-10 flex items-center justify-center bg-gray-400 text-white text-lg">
          {ShortName(name)}
        </span>
        <span className="ml-5 flex items-center text-gray-500">{total_jobs_in_hospital} jobs for {name}</span>
      </div>
      {isListVisible && <PostJobs jobs={items} />}
    </>
  );
};

export { Post as default };
