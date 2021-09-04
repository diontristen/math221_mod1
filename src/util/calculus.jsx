import {
    derivative, simplify,
  } from 'mathjs'

  export const firstDerivative = (equation, variable) => {
    let firstDerivationResult = derivative(equation, variable)

    let result = traverseOperation(firstDerivationResult)
    console.log('result' ,result)
    return result
}




const traverseOperation = (node) => {
    console.log(node)
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

    console.log(result , v)
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
