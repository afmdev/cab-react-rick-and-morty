import React from "react";
// import { Button, ButtonGroup } from "react-bootstrap";
import "../index.css";

function Pagination(props) {
const onPrev = props.onPrev
const onNext = props.onNext
const disabled = props.disabled   


return (
    <div className="Pagination">
        <button
            type="button"
            onClick={onPrev}
            disabled={!disabled}>Prev</button>
        
        <button type="button" onClick={onNext} >Next</button>
    </div>);
}
export default Pagination;