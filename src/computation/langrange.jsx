import {
    evaluate, simplify, round, multiply
} from 'mathjs'
import nerdamer from 'nerdamer'
import Polynomial from 'polynomial'


Polynomial.trace = true;
export const computeLagrange = (data, x, decimal, valx) => {
    let numberOfDataPoints = data.length

    let results = []

    for (let i = 0; i < numberOfDataPoints; i++) {
        let numerator = computeNumerator(data, i, numberOfDataPoints)
        let denominator = computeDenominator(data, i, numberOfDataPoints)
        denominator = round(denominator.text(), decimal)
        let simplified = round(simplifyFraction(data[i][1], denominator, decimal), decimal)

        let lagrange = {
            numerator: numerator,
            denominator: denominator,
            simplified,
            equation: getEquation(numerator, simplified, decimal)
        }

        results.push(lagrange)
    }

    let answer = getFinalEquation(results, decimal)
    let final = Polynomial(answer).eval(x)
    final = round(final, decimal)
    let fx = computeFxn(answer, valx, decimal)
    console.log('fx', fx)
    return {
        answer,
        results,
        final,
        fx
    }
}


const getEquation = (numerator, simplified, decimal) => {
    let newNumerator = Polynomial(numerator)
    let newCoeffs = newNumerator.coeff
    let newEquationArray = []
    Object.values(newCoeffs).forEach((value, index) => {
        let solve = round(value * simplified, decimal)
        newEquationArray.push(solve)
    })
    let coeff = Object.assign({}, newEquationArray)
    return parseEquation(coeff, decimal)
}

const getFinalEquation = (data, decimal) => {
    let answer = ""
    console.log('answer' ,data)
    data.forEach((item, index) => {
        let tempEquation = Polynomial(item.equation).coeff
        let equation = parseEquation(tempEquation, decimal)

        if (index === 0) {
            answer = equation
        } else {
            let tempAnswer = Polynomial(answer).add(equation)
            answer = parseEquation(tempAnswer.coeff, decimal)

        }
    })
    // console.log('dion ', answer)

    // let coeff = Polynomial(answer).coeff
    // let equation = parseEquation(coeff, decimal)


    let x = Polynomial(answer)
   // console.log('dion' ,x.coeff)
  
    return answer
}

const parseEquation = (coeff, decimal) => {
    let maxOrder = Object.keys(coeff).length - 1
    let result = ''
    Object.values(coeff).reverse().forEach((value, index) => {
        let number = value.toString()
        let operator = number.substring(0, 1) === '-' ? '-' : '+'
        if (index !== 0) {
            number = number.substring(0, 1) === '-' ? number.substring(1) : number
        }

        let suffix = ''
        if (index !== maxOrder) {
            suffix = maxOrder - index > 1 ? `x^${maxOrder - index}` : 'x'
        }
        if (result === '') {
            result = `${round(number, decimal)}${suffix}`
        } else {
            result = `${result}${operator}${round(number, decimal)}${suffix}`

        }
    })
    return result
}


const computeNumerator = (data, index, total) => {
    let numerator = ''
 //   console.log('total', total)
    for (let i = 0; i < total; i++) {
        if (i !== index) {
            let number = data[i][0].toString()
            let operator = number.substring(0, 1) === '-' ? '+' : '-'
            number = number.substring(0, 1) === '-' ? number.substring(1) : number
            if (numerator === '') {
                numerator = `x${operator}${number}`
            } else {
                numerator = Polynomial(numerator).mul(`x${operator}${number}`).toString()

            }
        }
    }

    return numerator
}

const computeDenominator = (data, index, total) => {
    let denominator = ''
    for (let i = 0; i < total; i++) {
        if (i !== index) {
            denominator = denominator + `(${data[index][0]}-${data[i][0]})`
        }
    }
    denominator = nerdamer.expand(denominator)
    return denominator
}

const simplifyFraction = (numerator, denominator, decimal) => {
    return round(numerator / parseFloat(denominator), decimal)
}

const computeFxn = (data , val, decimal) => {
    console.log('data', data)
    let x = simplify(data)
    console.log('fx', x)
    let answer = round(x.evaluate({x : val}), decimal)
   // console.log(answer)
    return answer
}
