import React from "react";
// import { Button, ButtonGroup } from "react-bootstrap";
import "../index.css";

function Pagination(props) {
const onNext = props.onNext

return (
    <div className="Pagination">
        <button type="button">Prev</button>
        <button type="button" onClick={onNext}>Next</button>
    </div>);
}
export default Pagination;