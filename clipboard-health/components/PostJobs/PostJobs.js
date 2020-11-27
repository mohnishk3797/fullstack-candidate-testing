import PostJobDetail from "../PostJobDetail";

const PostJobs = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job, index) => <PostJobDetail key={`post-job-detail-${index}`} job={job} />)}
    </div>
  );
};

export { PostJobs as default };
