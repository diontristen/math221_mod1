import React, { useState, useEffect } from 'react'
import { rearrangeData, computeGaussSidel } from '../computation/gaussSidelv2'  


let data1 = [
    [
        5,
        3,
        -7,
        0
    ],
    [
        3,
        -5,
        2,
        -8,
    ],
    [
        7,
        5,
        -3,
        16
    ]
]

let data2 = [
    [
        1,
        -5,
        -4
    ],
    [
        7,
        -1,
        6,
    ],
]


let error = 0.0001

export default function GaussSidel() {


    useEffect(() => {
        console.log('==============1=================')
        let reArrangedData1 = rearrangeData(data1)
        console.log(reArrangedData1)
        let tabulatedResult1 = computeGaussSidel(reArrangedData1, error)
        console.log(tabulatedResult1)
        console.log('==============2=================')
        let reArrangedData2 = rearrangeData(data2)
        console.log(reArrangedData2)
        let tabulatedResult2 = computeGaussSidel(reArrangedData2, error)
        console.log(tabulatedResult2)

  
    }, [])


    return (
        <div>
            GaussSidel
        </div>
    )
}
