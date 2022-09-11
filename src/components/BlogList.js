import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./BlogList.css";
import Loading from "./Loading";
export const BlogList = (props) => {
  const [load, setLoad] = useState(0);
  const [blog, setblog] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBlog();
  }, [blog]);
  const getBlog = async () => {
    const data = await fetch("http://localhost:2001/blog");
    const blog_data = await data.json();
    if (blog_data) {
      setLoad(1);
    }
    setblog(blog_data.blogs);
  };
  const viewBlog = (event, id) => {
    const URL = "/blog/" + id;
    navigate(URL);
  };
  if (!load && !blog) {
    <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="heading">
          <h1>BLOGS</h1>
        </div>
        {blog.map((singleData, index) => {
          const base64String = btoa(
            String.fromCharCode(
              ...new Uint8Array(singleData.blogImage.data.data)
            )
          );
          return (
            <div className="container" key={index}>
              <div className="blog_container">
                <div className="blogImage">
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    width="300"
                    alt=""
                    key={index}
                  />
                </div>
                <div className="blogName">{singleData.blogName}</div>
                <div className="clearfix"></div>
                <div className="rect"></div>
                <div className="clearfix"></div>
                <div className="blogText">
                  {singleData.blogText.substring(0, 35) + "..."}
                </div>
                <div className="clearfix"></div>
                <button
                  className="addCart"
                  onClick={(e) => viewBlog(e, singleData._id)}
                >
                  VIEW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
