import React, { useState } from "react";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../redux/ProfileSlices/UpdateProfile_Slice";
import { uploadProfileImage } from "../../../redux/ProfileSlices/Upload_ImagesSlice";
import "../User/editProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(); //take the id from  the router

  // const Configurations = useSelector((state) => state.Featch_Configurations_Store);
  // console.log("Configurations:", Configurations);
  // const tabConfigurations = Configurations.TabConfiguration;
  // console.log("tabConfigurations",tabConfigurations)

  const profile = useSelector((state) => state.FetchProfilessStore);
  console.log("profile:", profile);

  const Tab_profile = profile.profiles;
  console.log("Tab_profile:", Tab_profile);

  const existingProfile = Tab_profile.filter((f) => f.id == id);

  console.log("existingProfile:", existingProfile);

  const { name, description, adresse, email, telephone,image } = existingProfile[0];
  const [uname, setUname] = useState(name);
  const [udescription, setUdscription] = useState(description);
  const [uadresse, setUadresse] = useState(adresse);
  const [uemail, setUemail] = useState(email);
  const [utelephone, setUtelephone] = useState(telephone);
  const [imageFile, setImageFile] = useState(image);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();



  const Update_Profile = (e) => {
    e.preventDefault();
    console.table(uname, udescription, uadresse, uemail, utelephone);
    dispatch(
      editProfile({
        id: id,
        name: uname,
        description: udescription,
        adresse: uadresse,
        email: uemail,
        telephone: utelephone,
        image:imageFile,
      })
    );
          setTimeout(() => Navigate("/dashboard"), 200); // redirect after 3 seconds

  };


  // const Update_Profile = (e) => {
  //   e.preventDefault();
  //   console.table(uname, udescription, uadresse, uemail, utelephone);
  //   if (!imageFile) return;
  //   setUploading(true);
  //   axios
  //     .put(
  //       "http://localhost:5000/profiles",
  //       {
  //         id: id,
  //         name: uname,
  //         description: udescription,
  //         adresse: uadresse,
  //         email: uemail,
  //         telephone: utelephone,
  //         image:"",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       const image = new FormData();
  //       console.log(res.data);
  //       image.append("image", imageFile);
  //       axios
  //         .put(
  //           "http://localhost:5000/profile/upload/image/" + res.data.id,
  //           image
  //         )
  //         .then((res) => {
  //           // notify(); // display toast notification
  //           setOpen(false);
  //           // Notification code
  //         })
  //         .catch((err) => console.log("error"));

  //       axios
  //         .post(
  //           "http://localhost:5000/logs",
  //           JSON.stringify({
  //             action: `${
  //               jwt_decode(localStorage.getItem("token")).username
  //             } created an profile for ${
  //               jwt_decode(localStorage.getItem("token")).username
  //             }`,
  //           }),
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     })
  //     .catch((err) => {});
  // };

  
  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />

          <div class="form-container">
            <p class="title1">Update Profile</p>

            <form class="form1">
              <div class="input-group">
                <input
                  id="file"
                  type="file"
                  // value={imageFile}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    // setImageFile(file);
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const imageSrc = reader.result;
                      const svgElement = document.getElementById("svg");
                      svgElement.innerHTML = `<image xlink:href="${imageSrc}" height="24" width="24"/>`;
                    };
                  }}
                />
                <label class="avatar" for="file">
                  <span>
                    {" "}
                    <svg
                      id="svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill="#ffffff"
                          d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z"
                          opacity="0.1"
                        ></path>{" "}
                        <path
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                        ></path>{" "}
                        <path
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"
                        ></path>{" "}
                        <path
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"
                        ></path>{" "}
                        <path
                          stroke-width="2"
                          stroke="#ffffff"
                          d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </label>
                {/* <button onClick={Upload_Image()}>upload Image</button> */}
              </div>
              <div class="input-group">
                <label for="username">Name:</label>
                <input
                  type="text"
                  value={uname}
                  placeholder="Update Name"
                  onChange={(e) => setUname(e.target.value)}
                  required
                />
              </div>
              <div class="input-group">
                <label for="password">Description:</label>
                <input
                  type="text"
                  value={udescription}
                  placeholder="Update description"
                  onChange={(e) => setUdscription(e.target.value)}
                  required
                />
              </div>
              <div class="input-group">
                <label for="username">Adresse:</label>
                <input
                  type="text"
                  value={uadresse}
                  placeholder="Update Adresse"
                  onChange={(e) => setUadresse(e.target.value)}
                  required
                />
              </div>
              <div class="input-group">
                <label for="username">Email</label>
                <input
                  type="text"
                  value={uemail}
                  placeholder="Update Email"
                  onChange={(e) => setUemail(e.target.value)}
                  required
                />
              </div>
              <div class="input-group">
                <label for="username">Telephone:</label>
                <input
                  type="text"
                  value={utelephone}
                  placeholder="Update Telephone"
                  onChange={(e) => setUtelephone(e.target.value)}
                  required
                />
              </div>
              <button class="sign" onClick={Update_Profile}>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
