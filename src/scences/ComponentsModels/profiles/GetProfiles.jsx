import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles,FeatchProfileByIdSlice } from "../../../redux/ProfileSlices/FetchProfileSlice";

const Users = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.FetchProfilessStore);
  const users = useSelector((state) => console.log(state.FetchProfilessStore));

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);
  console.log("Getprofiles.jsx");

  console.log(profile.profiles); // <-- add this line to check the value of profile.uprofiles

  return (
    <div>
      <h2>Liste des Profiles </h2>
      {profile.loading && <div>Chargement.....</div>}
      {!profile.loading && profile.error ? (
        <div>Erreur: {profile.error}</div>
      ) : null}
      {!profile.loading && profile.profiles && profile.profiles.length ? (
        <ul>
          {profile.profiles.map((profile) => (
            <li key={profile.id}>
              <p>Adresse: {profile.id}</p>
              <p>Adresse: {profile.adresse}</p>
              <p>Adresse: {profile.description}</p>
              <p>Adresse: {profile.name}</p>
              <p>Adresse: {profile.telephone}</p>
              <p>Adresse: {profile.email}</p>
              <p>Adresse: {profile.user_id}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Users;
