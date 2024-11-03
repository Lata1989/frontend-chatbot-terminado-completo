import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Verify } from "./pages/Verify";
import { Chat } from "./pages/Chat";
import { UserData } from "./context/UserContext";
import { LoadingBig } from "./components/Loading";

export const App = () => {
  const { user, isAuth, loading } = UserData();
  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={isAuth ? <Home /> : <Login />} /> */}
            <Route path="/" element={isAuth ? <Chat /> : <Login />} />
            {/* <Route path="/login" element={isAuth ? <Home /> : <Login />} /> */}
            <Route path="/login" element={isAuth ? <Chat /> : <Login />} />
            {/* <Route path="/verify" element={isAuth ? <Home /> : <Verify />} /> */}
            <Route path="/verify" element={isAuth ? <Chat /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

// export default App;
/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/