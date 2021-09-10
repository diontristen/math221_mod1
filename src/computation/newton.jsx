import {
   simplify, round
} from 'mathjs'

export const computeNewton = (x0, equation, derivative, error, roundOff) => {
    let simplified = simplify(equation)
    let simplified2 = simplify(derivative)
    let result = []
    let count = 0
    let init = true

    let validate = true

    x0 = parseInt(x0)
    roundOff = parseInt(roundOff)
    error= parseFloat(error)
    
    while (init === true) {
        let x = result.length === 0 ? x0 : result[result.length - 1].x1
        let  fx =  round(simplified.evaluate({ x: x }), roundOff)
        let  fx1 =  round(simplified2.evaluate({ x: x }), roundOff)
        let x1 = round(x - (fx/fx1), roundOff)
        let errorResult = computeError(x, x1, error, roundOff)
        let data = {
            k: count + 1,
            x: x,
            fx: fx,
            fx1: fx1,
            x1: x1,
            er: errorResult === true ? "true" : "false"
        }
        result.push(data)
        count++
        if (errorResult === true) {
            init = false
        }

        if (count === 100) {
            validate = false
            break
        }

    }

    if (validate === false) {
        return {
            status: false,
            result: "Reached maximum iteration (100)."
        }
    }

    return {
        status: true,
        result: result
    }
}


const computeError = (x0,x1, error, roundOff) => {
    return Math.abs(round(x1-x0, roundOff)) <= error ? true : false
}

