import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import Bounce from 'react-reveal/Bounce';

const MessageBox = ({ message, setMessage , value}) => {

  const [statusVal, setStatusVal] = useState(0)


  useEffect(() => {
    if (statusVal == 100) {
      setMessage({ ...message, isMessage: false })
    } else {
      const timeout = setTimeout(() => {
        setStatusVal(statusVal + 1);
      }, 50);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [statusVal]);


  return (
    <Bounce right>

      <div className={`row alert alert-${message.color}`} role="alert" variant={message.color}>
        <div className="col-12">

          <div className="row">

            <div className="col">
              <span>Alert</span>
              <br />
              <span>{message.message}</span>
            </div>

            <div className="col-1 px-2">
              <span className="close fs-5 " style={{ cursor: "pointer" }} aria-label="Close" onClick={() => setMessage({ message: "", setMessage: false })}>
                <span aria-hidden="true" >×</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="progress">
            <div
              className={`progress-bar bg-${message.color}`}
              role="progressbar"
              aria-valuenow={100}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${statusVal}%` }}
            />
          </div>
        </div>



      </div>
    </Bounce>

  )
}

export default MessageBox