import React from 'react';
import {useState} from 'react';
import './App.css';
import * as Realm from "realm-web";


const app = new Realm.App({ id: "APPID" });


// Create a component that displays the given user's details
const UserDetail = ({ user }: { user: Realm.User }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};

// Create a component that lets an anonymous user log in
type LoginProps = {
  setUser: (user: Realm.User) => void;
};


const Login = ({ setUser }: LoginProps) => {
  const loginAnonymous = async () => {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};



// Esta función holaTADW simplemente muestra un texto.
// Debe crearse en MongoDB Atlas
/*  
const Saludar = () => {
  const [texto, setTexto] = useState("");
  const getsaludo = async () => {
    const s = await app.currentUser?.functions.holaTADW();
    setTexto(s.result);
  };
  getsaludo();
  return <h2>{texto}</h2>;
};
 */


// Esta función unaPeli() muestra el plot de una película
// Debe definirse en MongoDB 
/* 
const UnaPeli = () => {
  const [texto, setTexto] = useState("");
  const getPeli = async () => {
    const s = await app.currentUser?.functions.unaPeli();
    console.log(s);
    setTexto(s.fullplot);
    
  };
  getPeli();
  return <h2>Plot: {texto}</h2>;
};
 */





const App = () => {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState<Realm.User | null>(app.currentUser);

  // If a user is logged in, show their details. Otherwise, show the login screen.
  return (
    <div className="App">
      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
};

export default App;
