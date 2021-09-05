import React, { useState } from 'react'
import nerdamer from 'nerdamer/all'
import { computeNewton } from '../computation/newton'

export default function NewtonPage() {

    const[initial, setInitial] = useState('')
    const[input, setInput] = useState('')
    const[input2, setInput2] = useState('')
    const [output, setOutput] = useState('')
    const [roundOff, setRoundOff] = useState('5')

    const derive = () => {
        let result = computeNewton(parseInt(initial), input, input2, 0.0001, parseInt(roundOff))
        setOutput(result)
        console.log(result)
    }
    return (
        <div>
            Newton
            <input
                onChange={(e) => {
                    setInitial(e.target.value)
                }}
            >
            </input>
            <input
                onChange={(e) => {
                    setInput(e.target.value)
                }}
            >
            </input>
            <input
                onChange={(e) => {
                    setInput2(e.target.value)
                }}
            >
            </input>
            <input
                onChange={(e) => {
                    setRoundOff(e.target.value)
                }}
            >
            </input>
            <button
                onClick={derive}
            >
                Derive Now
            </button>
            <br/>
            <p>
                Answer: {output}
            </p>
        </div>
    )
}
