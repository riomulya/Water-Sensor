import {Routes, Route} from 'react-router-dom';

import NavigationBar from "./components/NaviagtionBar";
import FooterBar from "./components/FooterBar";

import login from "./components/login";
import home from "./components/home";
import dashboard from "./components/dashboard";
import feeds from "./components/feeds";
import about from "./components/about";

import accelX from "./components/accelX";
import accelY from "./components/accelY";
import accelZ from "./components/accelZ";
import phSensor from "./components/phSensor";
import temperSensor from "./components/temperSensor";
import turdibSensor from "./components/temperSensor"

function App() {
  return <div>
    <NavigationBar />

    <Routes>
      <Route path="/" Component={home} />
      <Route path="/home" Component={home} />
      <Route path="/login" Component={login} />
      <Route path="/dashboard" Component={dashboard} />
      <Route path="/feeds" Component={feeds} />
      <Route path="/about" Component={about} />

      <Route path="/accelX" Component={accelX} />
      <Route path="/accelY" Component={accelY} />
      <Route path="/accelZ" Component={accelZ} />
      <Route path="/phSensor" Component={phSensor} />
      <Route path="/temperSensor" Component={temperSensor} />
      <Route path="/turdibSensor" Component={turdibSensor} />
    
    </Routes>
   
    <FooterBar/>
  </div>
}

export default App
