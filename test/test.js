const assert = require('assert');
const { fetchJobs } = require('../pages/api/jobs');
const { seedData } = require('./seed');
describe('Jobs API', function() {
  it('Should fetch jobs with out any error', () => {
    try {
      fetchJobs(seedData.default);
      assert.ok(true)
    } catch (error) {
      assert.ok(false)
    }
  });
  it('Should have 120 jobs with default fields', () => {
    let jobs = fetchJobs(seedData.default);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 120)
  });
  it('Should have 83 jobs with "hospital" keyword search', () => {
    let jobs = fetchJobs(seedData.onlySearch);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 83)
  });
  it('Should have "LPN Charge Nurse" job title for first record with "hospital" keyword search', () => {
    let jobs = fetchJobs(seedData.onlySearch);
    assert.equal(jobs[0].job_title, "LPN Charge Nurse")
  });
  it('Should have 8 jobs for first record with "hospital" keyword search', () => {
    let jobs = fetchJobs(seedData.onlySearch);
    assert.equal(jobs[0].total_jobs_in_hospital, 8)
  });
  it('Should have 22 jobs for "Per-Diem" job type filter', () => {
    let jobs = fetchJobs(seedData.onlyFilter);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 22)
  });
  it('Should have 12 jobs for "Per-Diem" job type filter and "hospital text" ', () => {
    let jobs = fetchJobs(seedData.textAndFilter);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 12)
  });
  it('Should have 11 jobs for "Per-Diem" job type and "Night Shift" work schedule filters', () => {
    let jobs = fetchJobs(seedData.multipleFilters);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 11)
  });
  it('Should have 8 jobs for "Per-Diem" job type and "Night Shift" work schedule filters and "hospital" text', () => {
    let jobs = fetchJobs(seedData.multipleFiltersWithText);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 8)
  });
  it('Should have first job item title as "Chief Nursing Officer" with Job Title Asc Sort', () => {
    let jobs = fetchJobs(seedData.onlySortWithAsc);
    assert.equal(jobs[0].items[0].job_title, "Chief Nursing Officer")
  });
  it('Should have first job item title as "RN Intensive Care Unit" with Job Title Desc Sort', () => {
    let jobs = fetchJobs(seedData.onlySortWithDesc);
    assert.equal(jobs[0].items[0].job_title, "RN Intensive Care Unit")
  });
  it('Should have first job item title as "Pediatric Nurse" with Job Title Desc Sort, "Per-Dim" Job Type and "hospital" text', () => {
    let jobs = fetchJobs(seedData.sortWithTextAndFilter);
    assert.equal(jobs[0].items[0].job_title, "Pediatric Nurse")
  });
  it('Should have first 12 jobs with Created Desc Sort, "Per-Dim" Job Type and "hospital" text', () => {
    let jobs = fetchJobs(seedData.sortWithTextAndFilter);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 12)
  });
  it('Should have first job item title as "Pediatric Nurse" with Created Desc Sort, "Per-Dim" Job Type and "hospital" text', () => {
    let jobs = fetchJobs(seedData.sortWithTextAndFilter);
    let count = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
    assert.equal(count, 12)
  });
});