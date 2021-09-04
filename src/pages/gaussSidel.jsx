import React, { useState, useEffect } from 'react'
import { rearrangeData, computeGaussSidel } from '../computation/gaussSidel'  

 
let data = [
    {
        a: 5,
        b: 3,
        c: -7,
        d: 0
    },
    {
        a: 3,
        b: -5,
        c: 2,
        d: -8,
    },
    {
        a: 7,
        b: 5,
        c: -3,
        d: 16
    }
]

let error = 0.0001

export default function GaussSidel() {

    const [arrangedData, setArrangeData] = useState(data)

    useEffect(() => {
        let reArrangedData = rearrangeData(data)
        setArrangeData(reArrangedData)
        let tabulatedResult = computeGaussSidel(reArrangedData, error)
        console.log(tabulatedResult)
    }, [])

 
    return (
        <div>
            GaussSidel
        </div>
    )
}
