import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import { get as _get, map as _map, isEmpty as _isEmpty } from "lodash";
import { useState, useEffect } from "react";
import withQuery from "with-query";
import {
  InputGroup,
  FormControl,
  Row,
  Col,
  Card,
  ListGroup,
  Container,
  Accordion,
  Button,
} from "react-bootstrap";

import "../styles/sidebar.css";
import "../styles/customStyle.css";
import JobList from "../components/jobList";
import Footer from "./layouts/footer";

export default function MyApp({ Component, pageProps }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState({ sortBy: "", orderBy: "" });
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const sortList = async (key, order) => {
    const request = await fetch(
      withQuery("http://localhost:3000/api/filter", {
        search: filterValue,
        sortBy: key,
        orderBy: order,
      })
    );
    const json = await request.json();
    setJobs(json.items);
    setTotalJobs(json.totalJobs);
    setSortValue({ sortBy: key, orderBy: order });
  };

  useEffect(async () => {
    const filterTypes = await fetch("http://localhost:3000/api/job");
    const request = await fetch(
      withQuery("http://localhost:3000/api/filter", {
        search: "",
        sortBy: "",
        orderBy: "",
      })
    );
    const jsonJobs = await request.json();
    const jsonFilterTypes = await filterTypes.json();
    setJobs(jsonJobs.items);
    setTotalJobs(jsonJobs.totalJobs);
    setFilters(jsonFilterTypes.filters);
  }, []);

  return (
    <div className="lighGreyBG">
      <Header />
      <Container className="mt-3 mt-5 pt-4" fluid>
        <Row>
          <Col className="lighGreyBG" sm={12}>
            <div className="form-group pt-3 input_container has-search">
              <span className="input_img">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-search"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="form-control input-search-bar"
                placeholder="Search for any job, title, keywords or company"
                onChange={async (e) => {
                  const searchString = e.target.value;
                  const request = await fetch(
                    withQuery("http://localhost:3000/api/filter", {
                      search: searchString,
                      sortBy: _get(sortValue, "sortBy", ""),
                      orderBy: _get(sortValue, "orderBy", ""),
                    })
                  );
                  const json = await request.json();
                  console.log("got respons", json);
                  setFilterValue(searchString);
                  setTotalJobs(json.totalJobs);
                  setJobs(json.items);
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Card className="mx-auto mt-2 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">JOB TYPE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "job_type", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 pt-0 pb-1">
                      {filter.key}{" "}
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">DEPARTMENT</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "department", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                      {filter.key}{" "}
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">WORK SCHEDULE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "work_schedule", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                      {filter.key}{" "}
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
            <Card className="mx-auto mt-3 mb-3 border-0 pt-2 pb-2">
              <strong className="ml-20">EXPERIENCE</strong>
              <ListGroup variant="flush">
                {_map(_get(filters, "experience", []), (filter, indx) => (
                  <div key={indx}>
                    <ListGroup.Item className="border-0 border-0 pt-0 pb-1">
                      {filter.key}{" "}
                      <span className="light-grey-text">
                        {filter.doc_count}
                      </span>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col className="mt-2 mb-3" sm={8}>
            <JobList jobs={jobs} sortList={sortList} totalJobs={totalJobs} />
          </Col>
        </Row>
      </Container>
      <Card>
        <Footer />
      </Card>
    </div>
  );
}
