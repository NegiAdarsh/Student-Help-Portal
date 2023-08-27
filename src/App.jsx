import { useState, useEffect } from "react";
import {useRef} from 'react';
import "./App.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import background from './assets/background.mp4';



const App = () => {
  let url = 'https://api.pexels.com/v1/search?query=';
  let api = 'Kfue9JjBG1UO3DTTlO15DiGm6AFjtA31T4nhbCXUlZnouL3O5MPOVI65';
  let dictUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  let antsynUrl='https://api.api-ninjas.com/v1/thesaurus?word=';
  const inputRef = useRef(null);
  
  const [myData, setMyData] = useState([]);
  const[myDictData, setMyDictData] = useState([]);
  const [mySynData,setMySynData]=useState([]);
  const [isError, setIsError] = useState("");


  function handleClick() {
    setIsError("");
    setMyDictData(null);
    getApiData(`${url}`+inputRef.current.value);

    getDictData(`${dictUrl}`+inputRef.current.value);

    getSaData(`${antsynUrl}`+inputRef.current.value);

    

  }

  const  getDictData = async(url2) =>{
    try {
      const res2 = await axios.get(url2);
      setMyDictData(res2.data[0].meanings[0].definitions);
      console.log(res2.data[0].meanings[0].definitions);

    } catch (error) {
      setIsError(error.message)

    }
  }

  const  getSaData = async(url3) =>{
    try {
      const res3 = await axios.get(url3);
      setMySynData(res3.data);
      console.log(res3.data.synonyms);
      // for(let synonym of mySynData)
      // {
      //   console.log(synonym);
      // }

    } catch (error) {
      setIsError(error.message)
    }
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

      

        {/* <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      /> */}
      
      {/* <button onClick={handleClick}>Find</button> */}
      {/* <div class="input-group">
        <input ref={inputRef}
          type="text" id="message"
          name="message" 
          class="form-control rounded"
          placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" />

        <button type="button" class="btn btn-dark" onClick={handleClick}>Find</button>
      </div> */}
 
      <div className="video-div">
        <video src={background} loop muted autoPlay  />
      </div>
          
      
    
        <div class="input-group">
          <input ref={inputRef}
            type="text" id="message"
            name="message" 
            class="form-control"
            placeholder="Search for a word" aria-label="Search"
            aria-describedby="search-addon" />
          
          <button type="button" class="btn btn-outline-success" onClick={handleClick}><i class="fa-solid fa-2x fa-magnifying-glass"></i></button>
      </div>
      {isError !== "" && <h2>No result found </h2>}
    
      <Row>
        <Col xs={12} md={6} lg={6}>
        <div>
        {
        myDictData!= null && myDictData.slice(0,5).map((value) => {
          const { id ,definition,example} = value;
          return (
            <div key={id} className="def">
                {/* <h2>{width}</h2>
                <p>{height}</p>
                <p>{url}</p>
                <p>{src.medium}</p> */}
                <p>{definition || "No Definition found"}</p>
                <p>{example|| "No Example found"}</p>
                <br />
                <br />
            </div>
          );
          })
      }
      </div>
        </Col>

        <Col xs={12} md={6} lg={6}>
        <div>
            {

                  myData.slice(0,2).map((post) => {
                  const { id ,width, height, url ,src} = post;
                  return (
                    <div key={id}>
                        {/* <h2>{width}</h2>
                        <p>{height}</p>
                        <p>{url}</p>
                        <p>{src.medium}</p> */}
                        <img src={src.landscape} className="searched-img" />
                    </div>
                  );
                  })
               
          }
          </div></Col>
          
      </Row>
      <div class="antonym">
          { 
          mySynData.antonyms != "" && mySynData.antonyms?.length > 0 && mySynData.antonyms?.[0] != "" &&
          <h1 className="special-heading" >Antonym for your words are :</h1> }
          {
            mySynData.antonyms != "" && mySynData.antonyms?.length > 0 && mySynData.antonyms?.[0] != "" && mySynData.antonyms?.slice(0,15).map((value)=>{
              return(
                <div className="syns">
                  {value}

                </div>
              )

            })
          }
      </div>

      <div className="synonym">

        {
         
         mySynData.synonyms != "" && mySynData.synonyms?.length > 0 && mySynData.synonyms?.[0] != "" &&
          <h1 className="special-heading" >Synonym for your words are :</h1>
        }
        
          {
            mySynData.synonyms != "" && mySynData.synonyms?.length > 0 && mySynData.synonyms?.[0] != "" && mySynData.synonyms?.slice(0,15).map((value)=>{
              return(
                <div class="syns">
                  {value}

                </div>
              )

            })
          }
          

      </div>
      <footer>
          <p>Subscribe to our newsletter by clicking on bell icon</p>
          <a href=""><i class="fa-solid social-icon fa-2x fa-bell"></i></a>
          <i class="fa-brands fa-facebook social-icon fa-2x"></i>
          <i class="fa-brands fa-instagram social-icon fa-2x"></i>
          <i class="fa-brands fa-twitter social-icon fa-2x"></i>
          <a href="mailto:adarshn6467@gmail.com"><i class="fa-solid fa-envelope social-icon fa-2x"></i></a>

          <p >© Student Help Portal 2023</p>

      </footer>
      
        
        
    
    </>
  );
};

export default App;