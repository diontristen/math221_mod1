import {
    derivative, simplify,evaluate
  } from 'mathjs'

  export const firstDerivative = (equation, variable) => {
    let firstDerivationResult = derivative(equation, variable)

    let result = traverseOperation(firstDerivationResult)
    console.log('result' ,result)
    return result
}



export const evaluateEquation = (data) => {
    let answer
    data.forEach((item, index) => {
        if (index === 0) {
            answer = `(${item.test})`
        } else {
            answer = `${answer}+(${item.test})`
        }
    })
    console.log('ans', answer)
    let x = simplify(answer)
    let result = traverseOperation(x)
    console.log('result' ,result)
    // return result  
}

const traverseOperation = (node) => {
    switch (node.type) {
        case 'OperatorNode':
            return operationNode(node) 
        case 'ConstantNode':
            return  constantNode(node)
        case 'SymbolNode':
            return symbolNode(node)
        case 'FunctionNode':
            return functionNode(node)
        default:
            console.log('unkown', node.type)
            return 'n/a'
    }
}


const operationNode = (node) => {
    let result = []
    let v = ''
    // console.log(node)
    node.args.forEach((node) => {
        result.push(traverseOperation(node))
    })

    result.forEach((element, index) => {
        if (index === 0) {
            v =  `${v}${element}`
        } else if (result.length - 1 === index) {
            v = `${v}${node.op}${element}`
        } else {
            v = `${v}${node.op}${element}`
        }
    })

    return v 
}

const constantNode = (args) => {
    let constant = args.value
    return constant.toString()
}

const symbolNode = (symbol) => {
    let variable = symbol.name
    return variable
}

const functionNode = (symbol) => {
    let variable = symbol.name
    return variable
}
