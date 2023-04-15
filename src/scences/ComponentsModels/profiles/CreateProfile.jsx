import React, { useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch } from "react-redux";
import { CreateProfile } from "../../../redux/ProfileSlices/CreateProfile";
import "../../ComponentsModels/User/NewUser.css"

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);


  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const CreateProfileHandle = (e) => {
    e.preventDefault();
    console.table(name, email, telephone, adresse, description);
    dispatch(
      CreateProfile({ name, email, telephone, adresse, description,image})
    );
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />

          <form className="MainContainerProfile" onSubmit={CreateProfileHandle}>
            <h2 className="WelcomeText">Créer Un Profile </h2>
            <div className="InputContainerprofile">
              <input
                className="Input"
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="Input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="Input"
                type="text"
                value={telephone}
                placeholder="Télephone"
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
              <input
                className="Input"
                type="text"
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />

              <input
                className="Input"
                type="text"
                placeholder="Descreption"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              
              </div>

            <label>
              Profile Picture:
              <input
                className="Input"
                type="file"
                onChange={handleImageChange}
              />
            </label>
            <div className="ButtonContainer">
              <button className="Button" type="submit">
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
