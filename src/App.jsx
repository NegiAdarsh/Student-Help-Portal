import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  let url = 'https://api.pexels.com/v1/search?query=coding';
  let api = 'Kfue9JjBG1UO3DTTlO15DiGm6AFjtA31T4nhbCXUlZnouL3O5MPOVI65';
  
  const [myData, setMyData] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = event => {
    let msg=event.target.value
    setMessage(msg);
    console.log('value is:',msg);
  };


  useEffect(() => {
    axios.get(
      url,
      {headers: {
          "Authorization" : api
        }
      }
    )
      .then(  (response) => { 
          setMyData(response.data.photos)
          console.log(response.data.photos.src) 
        })
      .catch((error) => setIsError(error.message));
  }, []);

  

  return (
    <>
      <h1>Axios Tutorial</h1>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Message: {message}</h2>
      

        <div className="grid">{
        myData.map((post) => {
          const { id ,width, height, url ,src} = post;
          return (
            <div key={id} className="card">
              <h2>{width}</h2>
              <p>{height}</p>
              <p>{url}</p>
              <p>{src.original}</p>
            </div>
          );
        })}
        </div>
    
    </>
  );
};

export default App;