import { useState } from 'react'

import './Counter.css'
function Counter(props) {

let name = props.name
//     read    write     initial
const [value,setValue] = useState(props.value || 0)
function increment(){
    setValue(value + 1)
    // console.log(value)
}
function decrment(){
    setValue(value - 1)
    // console.log(value)
}

    return (
<div className="counter-container">
    <h3 className="counter-title">{name || "counter"}</h3> 
    <button className="btn btn-danger" onClick={decrment}>-</button>
    <span className="value">{value}</span>
    <button className="btn btn-success" onClick={increment}>+</button>
</div>
)
}

export default Counter