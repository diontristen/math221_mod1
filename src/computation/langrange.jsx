import {
    evaluate, simplify, round
} from 'mathjs'
import nerdamer from 'nerdamer'
import { roundOff } from '../util/parser'

export const computeLagrange = (data) => {
    let numberOfDataPoints = data.length

    let results = []

    for (let i = 0; i < numberOfDataPoints; i++) {
        let numerator = computeNumerator(data, i, numberOfDataPoints)
        // console.log('[numerator]: ', numerator.text())
        let denominator = computeDenominator(data, i, numberOfDataPoints)
        denominator = round(denominator.text(), 5)
        // console.log('[denominator]: ', denominator.text())
        let simplified = round(simplifyFraction(data[i][1], denominator) ,5)
        // console.log('[simplified]: ', simplified)



        let lagrange = {
            numerator: numerator.text(),
            denominator: denominator,
            simplified,
            test: nerdamer(`(${numerator})*${simplified}`).text()
        }

        results.push(lagrange)
    }

    let answer = ""

    results.forEach((item, index) => {
        if (index === 0) {
            answer = item.test
        } else {
            answer = nerdamer.expand(`(${answer})+(${item.test})`).text()
        }
    })
        
    console.log('[ANSWER]: ', answer)
    return results
}


const computeNumerator = (data, index, total) => {
    let numerator = ''
    for (let i = 0; i < total; i++) {
        if (i !== index) {
            numerator = numerator + `(x-${data[i][0]})`
        }
    }
    numerator = nerdamer.expand(numerator)
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

const simplifyFraction = (numerator, denominator) => {
    return round(numerator / parseFloat(denominator), 5)
}
