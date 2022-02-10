import './App.css';
import { useState, useEffect } from "react"; 
import axios from "axios"; 

function App() {

  const [usersData, setUsersData] = useState([]); 
  const [userName, setUserName] = useState(''); 
  const [userAge, setUserAge] = useState(0); 
  const [userUserName, setUserUserName] = useState(''); 

  useEffect(() => { 
    axios.get("http://localhost:3001/getUsers").then((res) => { 
      setUsersData(res.data);
    })
  }, []);

  const createUserHandler = () => { 
    axios.post("http://localhost:3001/createUser", {name: userName, age: userAge, username: userUserName}).then((res)=> { 
      setUsersData([...usersData, {name: userName, age: userAge, username: userUserName}]);
    })
    setUserName('');
    setUserAge(0);
    setUserUserName('');
  }

  return (
    <div>
      <div> 
        <input type="text" onChange={(event) => setUserName(event.target.value)} value={userName} placeholder='Name...'></input>
        <input type="number" onChange={(event) => setUserAge(event.target.value)} value={userAge} placeholder='Age...'></input>
        <input type="text" onChange={(event) => setUserUserName(event.target.value)} value={userUserName} placeholder='Username...'></input>
        <button onClick={createUserHandler}>Create User</button>
      </div>
      <div className="App">
        {usersData.map((user) => { 
          return ( 
            <div key={user._id}>
              <h1> Name: {user.name}</h1>
              <h1> Age: {user.age}</h1>
              <h1> Username: {user.username}</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
