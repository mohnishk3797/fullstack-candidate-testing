export const ShortName = (name) => {
    const [first, second] = name.split(" ");
    return `${first.charAt(0).toUpperCase()}${second.charAt(0).toUpperCase()}`;
};

export const FilterByJob = (jobType, haystack) => haystack.filter(({ job_type }) => job_type === jobType);
export const SearchByJobType = (word, haystack) => haystack.map((row) => row.filter(({department}) => department.includes(word)));
export const SearchByTitle = (word, haystack) => haystack.map((row) => row.title.includes(word));

// sorting

export const sortResults = (prop, asc, array) => {
    return array.sort((a, b) => {
        if (asc)  return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
}