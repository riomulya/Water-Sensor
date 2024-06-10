import React, { createContext, useEffect, useState } from 'react'
import Connection from './Connection'
import Publisher from './Publisher'
import Subscriber from './Subscriber'
import Receiver from './Receiver'
import mqtt from 'mqtt'
import { Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export const QosOption = createContext([])
// https://github.com/mqttjs/MQTT.js#qos
const qosOption = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
]

const HookMqtt = () => {
  const [client, setClient] = useState(null)
  const [isSubed, setIsSub] = useState(false)
  const [payload, setPayload] = useState({})
  const [connectStatus, setConnectStatus] = useState('Connect')
  
  const [accelX, setAccelX] = useState(0)
  const [accelY, setAccelY] = useState(0)
  const [accelZ, setAccelZ] = useState(0)
  const [ph, setPh] = useState(0)
  const [temp, setTemp] = useState(0)
  const [turbidity, setTurbidity] = useState(0)

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting')
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected')
        console.log('connection successful')
      })

      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })

      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })

      client.on('message', (topic, message) => {
        const payload = JSON.parse(message.toString())
        setPayload(payload)
        
        // Update state with the received values
        setAccelX(payload.accelX)
        setAccelY(payload.accelY)
        setAccelZ(payload.accelZ)
        setPh(payload.ph)
        setTemp(payload.temp)
        setTurbidity(payload.turbidity)
        
        console.log(`received message: ${message} from topic: ${topic}`)
      })
    }
  }, [client])

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus('Connect')
          console.log('disconnected successfully')
        })
      } catch (error) {
        console.log('disconnect error:', error)
      }
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log(`Subscribe to topics: ${topic}`)
        setIsSub(true)
      })
    }
  }

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        console.log(`unsubscribed topic: ${topic}`)
        setIsSub(false)
      })
    }
  }

  return (
    <>
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      />
      <QosOption.Provider value={qosOption}>
        <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
        <Publisher publish={mqttPublish} />
      </QosOption.Provider>
      {/* <Receiver payload={payload} onChange={()=>console.log(payload)} /> */}
      <div className="box-feeds row d-flex justify-content-center mx-auto">
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
        </div>
    </>
  )
}

export default HookMqtt
