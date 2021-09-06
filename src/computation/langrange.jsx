import {
    evaluate, simplify, round, forEach
} from 'mathjs'
import nerdamer from 'nerdamer'
import Polynomial from 'polynomial'


export const computeLagrange = (data, x, decimal) => {
    console.log('data',data)
    let numberOfDataPoints = data.length

    let results = []

    for (let i = 0; i < numberOfDataPoints; i++) {
        let numerator = computeNumerator(data, i, numberOfDataPoints)
        let denominator = computeDenominator(data, i, numberOfDataPoints)
        denominator = round(denominator.text(), decimal)
        let simplified = round(simplifyFraction(data[i][1], denominator, decimal) ,decimal)


        let lagrange = {
            numerator: numerator,
            denominator: denominator,
            simplified,
            equation: Polynomial(numerator).mul(simplified).toString()
        }

        results.push(lagrange)
    }

    let answer = getFinalEquation(results, decimal)
    let final = Polynomial(answer).eval(x)
    final = round(final, decimal)
    console.log('final', final)
    return {
        answer,
        results,
        final
    }
}


const getAnswer = (x, equation) => {
    
}

const getFinalEquation = (data, decimal) => {
    let answer = ""

    data.forEach((item, index) => {
        if (index === 0) {
            answer = item.equation
        } else {
        
            answer = Polynomial(answer).add(item.equation).toString()
        }
    })

    let coeff = Polynomial(answer).coeff
    let equation = parseEquation(coeff, decimal)
    return equation
}

const parseEquation = (coeff, decimal) => {
    let maxOrder = Object.keys(coeff).length - 1
    let result = ''
    Object.values(coeff).reverse().forEach((value, index) => {
        let number = value.toString()
        let operator = number.substring(0,1) === '-' ? '-' : '+'
        number = number.substring(0,1) === '-' ? number.substring(1) : number
        let suffix = ''
          
        if (index !== maxOrder) {
            suffix =  maxOrder - index > 1 ? `x^${maxOrder - index}` : 'x' 
        }
        if (result === '') {
            result = `${round(number,decimal)}${suffix}`
        } else {
            result = `${result}${operator}${round(number,decimal)}${suffix}` 

        }
    })
    return result
}


const computeNumerator = (data, index, total) => {
    let numerator = ''
    for (let i = 0; i < total; i++) {
        if (i !== index) {
            let number = data[i][0].toString()
            let operator = number.substring(0,1) === '-' ? '+' : '-'
            number = number.substring(0,1) === '-' ? number.substring(1) : number
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
