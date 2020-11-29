import groupedData from '../mocks/jobs.json';

export default class JobService {
    constructor() {

    }

    findByFilter({ ...filters }, { department }, { keyword = '' }) {
        const searchExpression = new RegExp(keyword, "i");
        const filteredJobs = groupedData.map((data) => {
            let items = data.items.filter((job) => {
                let found = true
                
                for (let [key, value] of Object.entries(filters)) {
                    if (value != undefined) {
                        found = (job[key] == value) && found
                    }
                }
                if (department != undefined)
                    found = (job.department.indexOf(department) != -1) && found

                let foundValue = Object.values(job).find((element) => {
                    if ((typeof element) === 'string'){
                        return (element.search(searchExpression) > 0)
                    }else if((element instanceof Array)){
                        return (element.join(' ').search(searchExpression) > 0)
                    }

                    return true                        
                })
                
                found = (foundValue > 0) && found
                return found
            });
            return { ...data, items, total_jobs_in_hospital: items.length }
        })

        return filteredJobs
    }
}