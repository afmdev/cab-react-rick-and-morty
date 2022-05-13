import "./index.css";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";

export default function Characters() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState([])
  
  
let result = []
function handleChange(event) {
    let myValue = event.target.value
    result = data.results.filter((element) => {
      return element.name.includes(myValue)
    })
  setFilter(result)
}
  
  
function onNext(event) {
  let newPage = data.info.next
  myUrl = newPage
  getData(myUrl)
}

  
let myUrl = "https://rickandmortyapi.com/api/character/?page=1"
  
const getData = async (url) => {
  try {
    const response = await fetch(myUrl);
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    let actualData = await response.json();
    const myData = actualData.results
    setData(actualData)
    setFilter(myData)
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
//eslint-disable-next-line
}, [])

  return (
  
    <div className="App">
      <Searchbar handleChange={handleChange} />

      <div className="Content">
        {loading && <div>A moment please...</div>}

        {error && (<div>{`There is a problem fetching the post data - ${error}`}</div>)}

        {filter && filter.map(({ id, name, image, species, status }) => (
            <div key={id}>
              <Modal id={id} name={name} image={image} species={species} status={status} />
              <div className="flip-card" key={id}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={image} alt={name}></img>
                  </div>
                  <div className="flip-card-back">
                    <h3>{name}</h3>
                  </div>
                </div>
                </div>
              </div>
          ))}
      </div>
      <Pagination onNext={onNext}/>
    </div>
);
}

