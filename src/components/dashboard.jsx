import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import mqtt from 'mqtt';
import HookMqtt from '../service/hook'

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const Dashboard = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [history, setHistory] = useState([]);

  

  return (
    <div>
      <section>
        <h1><center>Maps</center></h1>
        <div className="maps-box" style={{ height: '600px' }}>
          <div className="details" id="map" style={{ height: '580px' }}>
            <MapContainer
              center={position}
              zoom={100}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} />
              <RecenterAutomatically lat={position[0]} lng={position[1]} />
              {history.map((pos, idx) => (
                <Marker key={idx} position={pos} />
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="app">
          <HookMqtt/>
        </div>
      </section>
    
    </div>
  );
};

export default Dashboard;
