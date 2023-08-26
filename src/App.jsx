import { useState, useEffect } from "react";
import {useRef} from 'react';
import "./App.css";
import axios from "axios";


const App = () => {
  let url = 'https://api.pexels.com/v1/search?query=';
  let api = 'Kfue9JjBG1UO3DTTlO15DiGm6AFjtA31T4nhbCXUlZnouL3O5MPOVI65';
  const inputRef = useRef(null);
  
  const [myData, setMyData] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState("");

  const handleChange = event => {
    let msg=event.target.value
    setMessage(msg);
    console.log('value is:',msg);
  };


  // useEffect(() => {
    
  //   axios.get(
  //     url,
  //     {headers: {
  //         "Authorization" : api
  //       }
  //     }
  //   )
  //     .then(  (response) => { 
  //         setMyData(response.data.photos)
  //         console.log(response.data.photos.src) 
  //       })
  //     .catch((error) => setIsError(error.message));
  // }, []);

  const getApiData = async(urlo) =>{
    try {
      const res=  await axios.get(
        urlo,
        {headers: {
            "Authorization" : api
          }
        }
      );
      setMyData(res.data.photos)
    } catch (error) {
      setIsError(error.message)
    }

  }

  useEffect(()=> {
    getApiData(`${url}`+inputRef.current.value);

  },[]);



  return (
    <>
      <h1>Axios Tutorial</h1>
      {isError !== "" && <h2>{isError}</h2>}
      {/* <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Message: {message}</h2> */}

        <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      />

      <button>Log message</button>
      
        <div className="grid">{
        myData.slice(0,1).map((post) => {
          const { id ,width, height, url ,src} = post;
          return (
            <div key={id} className="card">
              <h2>{width}</h2>
              <p>{height}</p>
              <p>{url}</p>
              <p>{src.medium}</p>
            </div>
          );
        })}
        </div>
        
    
    </>
  );
};

export default App;