const domain = "http://localhost:3000/api/jobs";

export const getAllJobs = async () => {
    try {
      const options = {
        headers: {
          Accept: 'application/json',
        },
      };
      const response = await fetch(domain, options);
      return await response.json();
    } catch (error) {
      return {};
    }
};
