const Header = () => {
  return (
    <nav className="bg-white p-4 mx-auto uppercase ">
      <div className="grid gap-4 grid-cols-3">
        <a href="/" className="cursor-pointer font-semibold py-2 text-blue-500">Health Explore</a>
        <div className="flex items-stretch space-x-10 align-middle py-2 text-sm">
          <div className="cursor-pointer">Profile</div>
          <div className="cursor-pointer">Jobs</div>
          <div className="cursor-pointer">Professional Network</div>
          <div className="cursor-pointer">Lounge</div>
          <div className="cursor-pointer">Salary</div>
        </div>
        <div className="flex items-stretch space-x-10 align-right justify-end text-sm">
          <a href="#go" className="border border-current rounded p-2 inline-block text-blue-500">
            Create Job
          </a>
          <div className="relative rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white text-lg">
            JB
            <div className="border-2 border-white bg-red-500 rounded-full h-5 w-5 flex items-center justify-center text-white absolute inset-x-0 -top-1 left-7 text-xs ">
              2
            </div>
          </div>
          <div className="py-2">Logout</div>
        </div>
      </div>
    </nav>
  );
};
export { Header as default };
