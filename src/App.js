import "./index.css";
import { useState, useEffect, useInsertionEffect } from "react";
import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";



// let myCounter = 0
export default function Characters() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [myCounter, setMyCounter] = useState(0)
  
  
  
let result = []
function handleChange(event) {
    let myValue = event.target.value
    result = data.results.filter((element) => {
      return element.name.includes(myValue)
    })
  setFilter(result)
}
  

const onPrev = (event) => {
  let prevPage = data.info.prev

  if (myCounter > 0  ) {
    myUrl = prevPage
    getData(myUrl)
    setMyCounter(myCounter-1)
    console.log(myCounter);
  } else {
    setDisabled(false)
  }
}
  
  const onNext = (event) => {

  let nextPage = data.info.next
  myUrl = nextPage
  getData(myUrl)
  setDisabled(true)
  setMyCounter(myCounter+1)
  console.log(myCounter);
}
  
  useEffect(() => {
    console.log("mz counter", myCounter);
    if (myCounter === 0) {
      setDisabled(false)
    }
  }, [myCounter])
  
let myUrl = "https://rickandmortyapi.com/api/character/"
  
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
      <Pagination
        onNext={onNext}
        onPrev={onPrev} 
        disabled={disabled} />
    </div>
);
}