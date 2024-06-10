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
  const [odometerValues, setOdometerValues] = useState({
    ph: 0,
    accelX: 0,
    accelY: 0,
    accelZ: 0,
    temp: 0,
    turbidity: 0
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setHistory((prevHistory) => [...prevHistory, [latitude, longitude]]);
        },
        (error) => {
          console.error("Error getting the geolocation", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Maps is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const options = {
      host: '3a6152cff8674790bcad3c3c23ee9a34.s1.eu.hivemq.cloud',
      port: 8884,
      protocol: 'wss',
      username: 'admin',
      password: 'Water123456'
    };

    const client = mqtt.connect(options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('testtopic/react', (err) => {
        if (err) {
          console.error('Subscription error:', err);
        }
      });
    });

    client.on('error', (error) => {
      console.error('MQTT Connection Error:', error);
    });

    client.on('message', (message) => {
      const parsedMessage = JSON.parse(message.toString());
      console.log(parsedMessage);
      setOdometerValues({
        ph: parsedMessage.ph,
        accelX: parsedMessage.accelX,
        accelY: parsedMessage.accelY,
        accelZ: parsedMessage.accelZ,
        temp: parsedMessage.temp,
        turbidity: parsedMessage.turbidity
      });
      console.log('Updated odometerValues:', odometerValues); // Tambahkan baris ini untuk debugging
    });

    return () => {
      client.end();
    };
  }, []);

  const { ph, accelX, accelY, accelZ, temp, turbidity } = odometerValues;

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

        {/* <div className="box-feeds row d-flex justify-content-center mx-auto">
          <div className='col mx-auto'>
            <h1><center>Accel X</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={accelX}
                      text={`${accelX} m/s²`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className='col mx-auto'>
            <h1><center>Accel Y</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={accelY}
                      text={`${accelY} m/s²`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="box-feeds row d-flex justify-content-center mx-auto">
          <div className='col mx-auto'>
            <h1><center>Accel Z</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={accelZ}
                      text={`${accelZ} m/s²`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className='col mx-auto'>
            <h1><center>pH Sensor</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={ph}
                      text={`${ph} pH`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="box-feeds row d-flex justify-content-center mx-auto">
          <div className='col mx-auto'>
            <h1><center>Temperature Sensor</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={temp}
                      text={`${temp} °C`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className='col mx-auto'>
            <h1><center>Turbidity Sensor</center></h1>
            <Card className="card mx-auto">
              <Card.Body>
                <Card.Text>
                  <div className="box-odometer">
                    <CircularProgressbar
                      value={turbidity}
                      text={`${turbidity} NTU`}
                      styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'red',
                        trailColor: 'black'
                      })}
                    />
                  </div><br />
                  <h5><center>Date ada disini</center></h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div> */}
        <div className="app">
          <HookMqtt/>
        </div>
      </section>
    
    </div>
  );
};

export default Dashboard;
