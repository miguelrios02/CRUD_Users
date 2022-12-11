import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import FormUsers from "./components/FormUsers";
import UserCard from "./components/UserCard";

const BASE_URL = "https://users-crud.academlo.tech/";

function App() {
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState();
  const [isShowForm, setIsShowForm] = useState(false);

  const getAllUsers = () => {
    const URL = `${BASE_URL}users/`;
    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const createUser = (data) => {
    const URL = `${BASE_URL}users/`;
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
        hanleChangeShowModal()
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    const URL = `${BASE_URL}users/${id}/`;
    axios
      .delete(URL)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };
  const updateUser = (id, data) => {
    const URL = `${BASE_URL}users/${id}/`;
    axios
      .patch(URL, data)
      .then((res) => {
        console.log(res);
        getAllUsers();
        setUpdate();
        hanleChangeShowModal();
      })
      .catch((err) => console.log(err));
  };
const handleClikNewUser=(()=>{
  setUpdate()
  hanleChangeShowModal()
})
  const hanleChangeShowModal = () =>{
    setIsShowForm(!isShowForm)
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="App">
      <div className="header-container">
        <h1 className="header__title">Curd Users</h1>
        <button onClick={handleClikNewUser} className="header__btn">
          <i className="bx bx-plus"></i>Create new user
        </button>
      </div>

      <FormUsers
        createUser={createUser}
        update={update}
        updateUser={updateUser}
        isShowForm={isShowForm}
        hanleChangeShowModal={hanleChangeShowModal}
      />

      <div className="users__container">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            setUpdate={setUpdate}
            hanleChangeShowModal={hanleChangeShowModal}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
