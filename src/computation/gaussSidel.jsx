import { roundOff } from "../util/parser"


export const rearrangeData = (data) => {

    let indexA, indexB, indexC
    let newData
    indexA = sorter(data, 'a', [])
    indexB = sorter(data, 'b', [indexA])
    indexC = sorter(data, 'c', [indexA, indexB])

    newData = [data[indexA], data[indexB], data[indexC]]

    return newData
}

export const computeGaussSidel = (data, error) => {
    let x1,x2,x3 
    let errorX1, errorX2, errorX3
    let x1Formula = data[0]
    let x2Formula = data[1]
    let x3Formula = data[2]
    let init = true
    let tabulatedResult = []


    x1 = x2 = x3 = 0
    errorX1 = errorX2 = errorX3 = false

    //  initialization
    
    let count = 0
    while (init === true) {

        x1 = computeX1(x1Formula, x2 ,x3)
        x2 = computeX2(x2Formula, x1 ,x3)
        x3 = computeX3(x3Formula, x1 ,x2)
        if (count !== 0) {
            errorX1 = computeError(tabulatedResult[tabulatedResult.length - 1].x1, x1, error)
            errorX2 = computeError(tabulatedResult[tabulatedResult.length - 1].x2, x2, error)
            errorX3 = computeError(tabulatedResult[tabulatedResult.length - 1].x3, x3, error)

        }
        tabulatedResult.push({
            x1,
            x2,
            x3,
            errorX1,
            errorX2,
            errorX3
        })
        if (errorX1 === true && errorX2 === true && errorX3 === true) {
            init = false
        }
        count++
    }
    return tabulatedResult
}


const computeError = (x0,x1, error) => {
    return Math.abs(roundOff(x1-x0)) < error ? true : false
}

const computeX1 = (formula, x2, x3) => {
    return roundOff((formula.d - (formula.b*x2) - (formula.c*x3))/formula.a)
}
const computeX2 = (formula, x1, x3) => {
    return roundOff((formula.d - (formula.a*x1) - (formula.c*x3))/formula.b)
}
const computeX3 = (formula, x1, x2) => {
    return roundOff((formula.d - (formula.a*x1) - (formula.b*x2))/formula.c)
}





const sorter = (data, position, exceptionIndex) => {
    let properIndex = 0
    let currentData = data[0]
    for (let i = 1; i < data.length; i++) {
        if (Math.abs(currentData[position]) < Math.abs(data[i][position]) && !exceptionIndex.includes(i)) {
            currentData = data[i][position]
            properIndex = i
        }

    }

    return properIndex
}