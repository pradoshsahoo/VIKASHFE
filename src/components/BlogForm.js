import { useState } from "react";
import "./BlogForm.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
const BlogForm = (props) => {
  const { user } = useAuth0();
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [location, setLocation] = useState();
  const [created, setCreated] = useState(`${user.email}`);
  const [famous, setFamous] = useState();
  const [image, setImage] = useState();

  const [visiting, setVisiting] = useState([
    { id: uuidv4(), placeName: "", placeImage: null },
  ]);

  const changeVisiting = (id, event) => {
    const newVisiting = visiting.map((i) => {
      if (id === i.id) {
        if (event.target.name == "placeImage") {
          i[event.target.name] = event.target.files[0];
        } else i[event.target.name] = event.target.value;
      }
      return i;
    });
    setVisiting(newVisiting);
    event.preventDefault();
  };
  const handleAddFields = (event) => {
    setVisiting([
      ...visiting,
      { id: uuidv4(), placeName: "", placeImage: null },
    ]);
    event.preventDefault();
  };

  const handleRemoveFields = (id) => {
    const values = [...visiting];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setVisiting(values);
  };

  const send = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("blogName", name);
    data.append("blogText", text);
    data.append("blogLocation", location);
    data.append("uploads", image);
    data.append("blogCreatedBy", created);
    console.log(famous);
    let famousarr = famous.split(",");

    famousarr.map((item, index) => {
      data.append(`blogFamousFor[${index}]`, item);
    });
    visiting.map((item, index) => {
      data.append(`blogVisitingPlaces[${index}][placeName]`, item.placeName);
      data.append(`blogVisitingPlaces[${index}][placeImage]`, null);
      data.append("uploads", item.placeImage);
    });
    const message = await axios.post("http://localhost:2001/blog", data);
    console.log(message);
  };

  return (
    <div className="form1-container">
      <Navbar />
      <div className="heading">
        <h1>CREATE</h1>
      </div>
      <form className="form-main">
        <div className="blogdetails">
          <div id="entries">
            <div className="i_p">
              Name:
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Name"
                onChange={(event) => {
                  const { value } = event.target;
                  setName(value);
                }}
              ></input>
            </div>
            <div className="i_p">
              Location:
              <input
                type="text"
                id="Location"
                name="Location"
                placeholder="Location"
                onChange={(event) => {
                  const { value } = event.target;
                  setLocation(value);
                }}
              ></input>
            </div>
            <div className="i_p">
              Author:
              <input
                type="text"
                id="availabilty"
                name="Availabity"
                placeholder="Availability"
                defaultValue={user.email}
                onChange={(event) => {
                  const { value } = event.target;
                  setCreated(value);
                }}
              ></input>
            </div>
            <div className="i_p">
              Village Features:
              <input
                type="text"
                id="Description"
                name="Description"
                placeholder="Description (separated by comma)"
                onChange={(event) => {
                  const { value } = event.target;
                  setFamous(value);
                }}
              ></input>
            </div>

            <div className="i_p">
              Image:
              <br />
              <input
                type="file"
                id="blogimage"
                name="blogimage"
                placeholder="image"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setImage(file);
                }}
              ></input>
            </div>
          </div>
          <div id="writepad">
            <br />
            <textarea
              type="text"
              id="Price"
              name="Price"
              placeholder="Write Here"
              onChange={(event) => {
                const { value } = event.target;
                setText(value);
              }}
            ></textarea>
          </div>
        </div>

        <div className="subheading">
          <h1>TOURIST PLACES</h1>
        </div>
        {visiting.map((each) => {
          return (
            <div className="visiting" key={each.id}>
              <br />
              <br />
              <div className="i_p">
                Place Name:
                <input
                  type="text"
                  id="availabilty"
                  name="placeName"
                  placeholder="Name"
                  onChange={(event) => changeVisiting(each.id, event)}
                ></input>
              </div>
              <div className="i_p">
                Image:
                <input
                  type="file"
                  id="availabilty"
                  name="placeImage"
                  placeholder="Image"
                  onChange={(event) => changeVisiting(each.id, event)}
                ></input>
              </div>

              <button
                className="button"
                title="ADD"
                onClick={(event) => handleAddFields(event)}
              >
                +
              </button>
              <button
                className="button"
                title="REMOVE"
                disabled={visiting.length === 1}
                onClick={() => handleRemoveFields(each.id)}
              >
                −
              </button>
            </div>
          );
        })}

        <input
          type="submit"
          value="SUBMIT"
          className="submit fm"
          onClick={send}
        ></input>
      </form>
    </div>
  );
};
export default BlogForm;
