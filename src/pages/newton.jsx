import React, { useState } from 'react'
import nerdamer from 'nerdamer/all'
import { computeNewton } from '../computation/newton'

export default function NewtonPage() {


    const[input, setInput] = useState('')
    const[input2, setInput2] = useState('')
    const [output, setOutput] = useState('')

    const derive = () => {
        // let result = firstDerivative(input, 'x')
        // let result = computeNewton(2, input, input2, 0.0001)
        let result = computeNewton(1, '4*(log(x)/log(e))-x', '(4/x-1)', '0.0001')
        setOutput(result)
        console.log(result)
    }
    return (
        <div>
            Newton
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
