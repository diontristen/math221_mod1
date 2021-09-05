import {
    evaluate, simplify, round
} from 'mathjs'

export const computeNewton = (x0, equation, derivative, error, roundOff) => {
    let simplified = simplify(equation)
    let simplified2 = simplify(derivative)
    let result = []
    let count = 0
    let init = true
    while (init === true) {
        let x = result.length === 0 ? x0 : result[result.length - 1].x1
        let  fx =  round(simplified.evaluate({ x: x }), roundOff)
        let  fx1 =  round(simplified2.evaluate({ x: x }), roundOff)
        let x1 = round(x - (fx/fx1), roundOff)
        let errorResult = computeError(x, x1, error, roundOff)
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


const computeError = (x0,x1, error, roundOff) => {
    return Math.abs(round(x1-x0, roundOff)) < error ? true : false
}

