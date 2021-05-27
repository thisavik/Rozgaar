import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import { CircularProgress } from '@material-ui/core';
import "./JobsFeed.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getJobs, getAllJobs } from '../../actions/job'; 


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const JobsFeed = () => {
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]); 
  const [error, setError] = useState("");
  const [locerr, setLocationError] = useState(""); 
  const [goodTogo, setGoodToGo] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {    
    const dummy = async () => {
      return await setJobs(await getAllJobs());
    }
    dummy();
  }, [location])

  const validateLocation = (checklocation) =>{ 
        if(!checklocation.includes(",")){
          setLocationError("please enter a valid Location");
          setGoodToGo(false);
        }else{
          setLocationError("");
          setGoodToGo(true);
        }
};

  const handleChange = ({ target: { name, value } }) =>{
      //console.log(name,value); 
      if(name === 'job'){
        setJob(value);
      }
      if(name === 'location'){
        validateLocation(value); 
        setLocation(value);
      } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    //console.log("location check" + locerr); 
    
    if(!goodTogo || locerr!=""){
      setError("Please fill correct details :(");
      return;
    }
    
    setJobs([]); 
    setError(""); 

    const data = await getJobs(job, location);
    
    if(data?.error) {
      setError(data?.error);
      return;
    } 
    
    setJobs(data?.result);
    console.log(jobs);
    dispatch({ type: "FETCH_JOB", data})  
  }
  return (
    <div className="container" style={{ marginTop: "-70px" }}>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6} sm={6}>
            <FormGroup>
              <div className="ikons">
                <Label for="jobcategory">
                  <h3>
                    <b>JOB CATEGORY</b>
                  </h3>
                </Label>
                <Input
                  type="text"
                  name="job"
                  id="jobcategory"
                  placeholder="Job-Category"
                  required
                  //value={job}
                  //onChange={(e) => setJob(e.target.value)}
                  onChange={handleChange}
                />
                <i className="ikon">
                  <svg
                    width="1.4em"
                    height="1.8em"
                    viewBox="0 0 16 16"
                    className="bi bi-bag-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 4h14v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm7-2.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z" />
                  </svg> 
                </i>
              </div>
            </FormGroup> 
          </Col>
          <Col md={6} sm={6}>
            <FormGroup>
              <div className="ikons">
                <Label for="location">
                  <h3>
                    <b>LOCATION</b>
                  </h3>
                </Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="City, State e.g. Kolkata, West Bengal" 
                  required
                  //value={location}
                  //onChange={(e) => setLocation(e.target.value)}
                  onChange={handleChange}
                />
                <i className="ikon">
                  <svg
                    width="1.5em"
                    height="1.8em"
                    viewBox="0 0 16 16"
                    className="bi bi-geo-alt"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                  </svg>
                </i>
                <span style={{color:'red'}}>{locerr}</span>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" size="lg" style={{backgroundColor : "#c000d1"}}>
          Find Jobs
        </Button>
      </Form>
      {error 
        ? <h1>{error}</h1>
        : !jobs?.length 
        ? <CircularProgress /> 
        : <div>
            <h1>{jobs.length} {jobs.length === 1 ? `job` : `jobs`} found</h1>
            <Row>
              {jobs.map((job) => (
                <Col className="col-lg-6 col-md-6 col-sm-12 col-xs-12" key={job._id}>
                  <Card body className="mb-4 mt-4 cr" style={{ textAlign: "center" }}>
                  <CardTitle tag="h5">Job Type: {capitalizeFirstLetter(job?.jobTypeId?.jobTitle)}</CardTitle>
                  <CardText>
                    Address: {` `} 
                      {capitalizeFirstLetter(job?.locationId?.city)}, 
                      {` `} 
                      {capitalizeFirstLetter(job?.locationId?.state)}
                  </CardText>
                  <CardText>Salary: {job?.salary}</CardText>
                  <CardText>Skill: {capitalizeFirstLetter(job?.skillsReq[0].skillName)}</CardText>
                  <Link to="/JobsFeed/FindJob">
                    <Button type="button" color="primary" size="lg" className="btnsz">
                    Apply Now
                    </Button>
                  </Link>
                  </Card>
                </Col>
              ))} 
            </Row>
          </div>
      } 
    </div>
  );
};

export default JobsFeed;
