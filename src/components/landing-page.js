import React from "react";
import "./landing-page.css";
import { Navbar } from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import section1 from "../images/Untitled-1.jpg";
import section2 from "../images/2.jpg";
import section3 from "../images/3.jpg";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
export function Homepage() {
  const { loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="landing">
        <div className="home">
          <Navbar />
          <div className="head-1">
            <div className="text--1">
              <a>
                THE FUTURE OF<br></br>
                ODISHA LIES <br></br>
                IN ITS <span className="village">VILLAGES</span>
                <br></br>
                <hr></hr>
              </a>
            </div>
            <div className="text--2">
              An initiative to learn , explore and help the villages and{" "}
              <br></br>
              its people. The village with it's indigenous talents makes{" "}
              <br></br>
              it the major potential of economic growth and development.
            </div>
            <div className="button-getStarted">
              <h1>
                <button onClick={() => loginWithRedirect()}>Get Started</button>
              </h1>
            </div>
          </div>
        </div>

        <div className="section-1 section">
          <img src={section1} alt="Loading.." className="section1" />
          <button class="btn" onClick={() => navigate("/blog")}>
            BLOGS
          </button>
        </div>
        <div className="section-2 section">
          <img src={section2} alt="Loading.." className="section2" />
          <button class="btn" onClick={() => navigate("/products")}>
            PRODUCTS
          </button>
        </div>
        <div className="section-3 section">
          <img src={section3} alt="Loading.." className="section3" />
          <button class="btn" onClick={() => navigate("/services")}>
            SERVICES
          </button>
        </div>
      </div>
    );
  }
}
