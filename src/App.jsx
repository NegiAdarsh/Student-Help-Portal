import { useState, useEffect } from "react";
import {useRef} from 'react';
import "./App.css";
import axios from "axios";


const App = () => {
  let url = 'https://api.pexels.com/v1/search?query=';
  let api = 'Kfue9JjBG1UO3DTTlO15DiGm6AFjtA31T4nhbCXUlZnouL3O5MPOVI65';
  const inputRef = useRef(null);
  
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");


  function handleClick() {
    getApiData(`${url}`+inputRef.current.value);
  }


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


  return (
    <>
      <h1>Axios Tutorial</h1>
      {isError !== "" && <h2>{isError}</h2>}

        {/* <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      /> */}
      
      {/* <button onClick={handleClick}>Find</button> */}
      <div class="input-group">
        <input ref={inputRef}
          type="text" id="message"
          name="message" 
          class="form-control rounded"
          placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" />

        <button type="button" class="btn btn-dark" onClick={handleClick}>Find</button>
      </div>
 
            <div className="row">
            {
             
                  myData.slice(0,1).map((post) => {
                  const { id ,width, height, url ,src} = post;
                  return (
                    <div key={id}>
                        {/* <h2>{width}</h2>
                        <p>{height}</p>
                        <p>{url}</p>
                        <p>{src.medium}</p> */}
                        <img src={src.medium} className="searched-img"/>
                    </div>
                  );
                  })
               
          }
          </div>
   
        
        
    
    </>
  );
};

export default App;