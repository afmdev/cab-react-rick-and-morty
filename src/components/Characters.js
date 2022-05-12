import "../index.css";
import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Characters() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  
  const getData = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character`
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      let pages = actualData.info.pages
      console.log(pages)
      let charactersData = [...actualData.results]
      setData(charactersData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }
useEffect(() => {
getData()
}, [])

return (
  <div className="App">
    {loading && <div>A moment please...</div>}
    {error && (
      <div>{`There is a problem fetching the post data - ${error}`}</div>
    )}
    <div className="container">
      {data &&
        data.map(({ id, name, image }) => (
          <div>
          <Modal id={id} name={name} image={image}/>
          <div className="flip-card" key={id}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={image} alt={name}></img>
              </div>
              <div className="flip-card-back">
                <h3>{name}</h3>
                {/* <a href="https://www.google.es" target="_blank" rel="noreferrer">READ MORE</a> */}
                
                
              </div>
            </div>
            </div>
            </div>
        ))}
    </div>
  </div>
);
}

