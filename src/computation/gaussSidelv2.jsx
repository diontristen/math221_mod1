import { roundOff } from "../util/parser"


/**
 * 
 * @param {array} data - given matrix
 */
export const rearrangeData = (data) => {
    let nRows = data.length
    let nCol = data[0].length - 1
    let x, y
    let newData = []
    let exclusion = []
    x = y = 0
    for (let i = 0; i < nCol; i++) {
        let index = 0
        for (let j = 0; j < nRows; j++) {
            if (Math.abs(data[index][i]) < Math.abs(data[j][i]) && exclusion.includes(j) === false) {
                index = j
            }
        }
        newData.push(data[index])
        exclusion.push(index)
    }

    return newData
}

export const computeGaussSidel = (data, error) => {
    let nRows = data.length
    let nCol = data[0].length - 1

    let count = 0
    let tabulated = []
    let newData = Array(nCol).fill(0)
    let newError = Array(nCol).fill(false)
    let init = true
    while (init === true) {
        for (let j = 0; j < nCol; j++) {
            let result = compute(j, newData, data[j])
            newData[j] = result
            if (count !== 0) {
                let errorResult = computeError(tabulated[count -1][j], result, error)
                newError[j] = errorResult
            }
        }
          
        let finishIteration = newError.filter(bResult => bResult === true).length === nCol ? false: true
        if (finishIteration === false) {
            init = false
        }
        let tabulatedResult = [...newData].concat([...newError])
        tabulated.push(tabulatedResult)
        count++
    }
    return tabulated

}

const compute = (index, variables, constants) => {
    let c = constants[constants.length - 1]
    let divisor = constants[index]
    let difference = c
    for (let i = 0; i < variables.length; i++) {
        if (index !== i) {
            let product = variables[i] * constants[i]
            difference = difference - product
        }
    }

    return roundOff(difference / divisor)
}


const computeError = (x0,x1, error) => {
    return Math.abs(roundOff(x1-x0)) < error ? true : false
}