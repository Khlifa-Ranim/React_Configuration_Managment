import React, { useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch } from "react-redux";
import { CreateProfile } from "../../../redux/ProfileSlices/CreateProfile";
import { uploadProfileImage } from "../../../redux/ProfileSlices/Upload_ImagesSlice";
import "../../ComponentsModels/User/NewUser.css";

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uid, setUid] = useState(1); // replace with the actual user ID

  const dispatch = useDispatch();

  const CreateProfileHandle = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    console.table(name, email, telephone, adresse, description, imageFile);
    if (!imageFile) return;
    setUploading(true);

    fileReader.onload = async () => {
      const fileData = fileReader.result;
      const { url } = await dispatch(uploadProfileImage({ uid, imageFile }));
      console.log(uid, imageFile);

      setUploading(false);
      const imageUrl = url;
      console.log(imageUrl);
      dispatch(
        CreateProfile({
          name,
          email,
          telephone,
          adresse,
          description,
          imageFile: fileData,
          imageUrl,
        })
      );
    };

    fileReader.readAsDataURL(imageFile);
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
                // value={image}
                onChange={(e) => setImageFile(e.target.files[0])}
                // accept="image/*"
              />
            </label>
            {/* {image && <img className="preview" src={image} alt="profile preview" />}
            <button className="Button" type="button" onClick={handleUploadClick} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button> */}

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
