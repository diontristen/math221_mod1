import React, { useEffect } from 'react'
import { computeLagrange } from '../computation/langrange'
import {
    evaluate, simplify, 
} from 'mathjs'


/**
 * 
 * default data - given data points / should be rearranged
 * [
 *  [x0,y0],
 *  [x1,y1],
 *  [x2,y2],
 * ]
 */
let data = [
    [5,120],
    [-1,-6],
    [-3,-32],
    [2,3]
]


export default function  LagrangePage() {

    useEffect(() => {
        let result = computeLagrange(data)
        console.log(result)
    }, [])

    return (
        <div>
            Lagrange
        </div>
    )
}
