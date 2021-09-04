import {
    evaluate, simplify, 
} from 'mathjs'
import { roundOff } from "../util/parser"

export const computeNewton = (x0, equation, derivative, error) => {
    let simplified = simplify(equation)
    let simplified2 = simplify(derivative)
    console.log()
    let result = []

    let count = 0
    let init = true
    while (init === true) {
        let x = result.length === 0 ? x0 : result[result.length - 1].x1
        let  fx =  roundOff(simplified.evaluate({ x: x }))
        let  fx1 =  roundOff(simplified2.evaluate({ x: x }))
        let x1 = roundOff(x - (fx/fx1))
        let errorResult = computeError(x, x1, error)
        let data = {
            x: x,
            fx: fx,
            fx1: fx1,
            x1: x1,
            error: errorResult
        }
        result.push(data)
        count++
        if (errorResult === true) {
            init = false
        }

        if (count === 100) {
            console.log('[ERROR] : ', 'Max Iteration')
            break
        }

    }
    console.log(result)
}


const computeError = (x0,x1, error) => {
    return Math.abs(roundOff(x1-x0)) < error ? true : false
}

