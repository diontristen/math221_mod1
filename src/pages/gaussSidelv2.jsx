import React, { useState, useEffect } from 'react'
import { rearrangeData, computeGaussSidel, parseResult, parseColumn } from '../computation/gaussSidelv2'
import LayoutComponent from '../components/Layout'

import { Typography, Layout, Input, Row, Col, Button, Table } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;




let data1 = [
    [
        5,
        3,
        -7,
        0
    ],
    [
        3,
        -5,
        2,
        -8,
    ],
    [
        7,
        5,
        -3,
        16
    ]
]

let data2 = [
    [
        1,
        -5,
        -4
    ],
    [
        7,
        -1,
        6,
    ],
]



export default function GaussSidel() {


    const [noRoots, setNoRoots] = useState(3)
    const [dataPoints, setDataPoints] = useState([])
    const [iterationRule, setIterationRule] = useState('')
    const [decimalPoints, setDecimalPoints] = useState(5)
    const [arrayTable, setArrayTable] = useState([])
    const [roots, setRoots] = useState([])
    const [columnData, setColumnData] = useState([
        {
            title: 'k',
            dataIndex: 'k',
            key: 'k'
        },
        {
            title: 'X1',
            dataIndex: 'X1',
            key: 'X1'
        },
        {
            title: 'X2',
            dataIndex: 'X2',
            key: 'X2'
        },
        {
            title: 'ErX1',
            dataIndex: 'ErX1',
            key: 'ErX1',
        },
        {
            title: 'ErX2',
            dataIndex: 'ErX2',
            key: 'ErX2',

        }

    ])

    const [rowData, setRowData] = useState([])

    const setADataPoint = (value, parentIndex, selfIndex) => {
        let tempDataPoints = dataPoints
        if (value !== '') {
            if (tempDataPoints[parentIndex]) {
                tempDataPoints[parentIndex][selfIndex] = value

            } else {
                tempDataPoints[parentIndex] = []
                tempDataPoints[parentIndex][selfIndex] = value
            }
        } else {
            tempDataPoints[parentIndex].splice(selfIndex)
        }
        setDataPoints(tempDataPoints)

    }


    const roundOffLower = () => {
        return Math.floor(24 / (noRoots + 1))
    }

    const renderAllInputs = () => {
        return [...Array(noRoots).keys()].map((value, index) => (
            <Row
                style={{
                    marginTop: 15
                }}
                gutter={12}>
                {renderInputs(index)}
                <Col key={7}
                    className="gutter-row"
                    xs={roundOffLower()}
                    sm={roundOffLower()}
                    md={roundOffLower()}
                    lg={roundOffLower()}
                    xl={roundOffLower()}
                >
                    <Input
                        onChange={(e) => {
                            setADataPoint(e.target.value, index, noRoots)
                        }}
                    />
                </Col>
            </Row>
        ))
    }

    const renderInputs = (parentIndex) => {
        return [...Array(noRoots).keys()].map((value, index) => (
            <Col key={index}
                className="gutter-row"
                xs={roundOffLower()}
                sm={roundOffLower()}
                md={roundOffLower()}
                lg={roundOffLower()}
                xl={roundOffLower()}
            >
                <div
                    style={{
                        display: "flex"
                    }}
                >
                    <Input
                        onChange={(e) => {
                            setADataPoint(e.target.value, parentIndex, index)
                        }}

                        addonAfter={`X${index + 1}`} />
                    <div
                        style={{
                            marginLeft: 5,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >{index === noRoots - 1 ? '=' : "+"}</div>
                </div>
            </Col>

        ))
    }

    const changeRoot = (e) => {
        let root = parseInt(e.target.value)
        setNoRoots(root)
    }

    const checkInput = () => {
        let validate = true
        let parentSize = dataPoints.length
        if (parentSize !== noRoots) {
            return false
        }


        dataPoints.forEach((value) => {
            if (value.length !== noRoots + 1) {
                validate = false
            }
        })

        return validate
    }


    const solveGaussSidel = () => {
        let validation = checkInput()
        if (validation === true) {
            let reArrangedData1 = rearrangeData(dataPoints)
            let tabulatedResult1 = computeGaussSidel(reArrangedData1, iterationRule, decimalPoints)
            setRoots(tabulatedResult1[tabulatedResult1.length - 1].slice(0, noRoots))

            tabulatedResult1 = parseResult(tabulatedResult1, noRoots)
            let newColumn = parseColumn(tabulatedResult1)
            setColumnData(newColumn)
           
            setRowData(tabulatedResult1)
        }
    }

    const changeRule = (e) => {
        let eA = parseFloat(e.target.value)
        setIterationRule(eA)
    }

    const changeDecimal = (e) => {
        let eA = parseInt(e.target.value)
        setDecimalPoints(eA)
    }

    const displayRoots = () => {
        return roots.map((value, index) => (
            <Col key={index}
                className="gutter-row"
                xs={roundOffLower()}
                sm={roundOffLower()}
                md={roundOffLower()}
                lg={roundOffLower()}
                xl={roundOffLower()}
            >
                <div
                    style={{
                        display: "flex"
                    }}
                >
                   <Text>
                        {`X${index+1}`} = {value}
                   </Text>
                 
                </div>
            </Col>

        ))
    }

    let instruction = `
        Enter the given equation
    `

    return (
        <LayoutComponent>
            <Layout
                style={{
                    margin: 15
                }}
            >
                <div>
                    <Title
                        style={{
                            marginBottom: 1
                        }}
                    >
                        Gauss Sidel
                    </Title>

                    <Text
                        style={{
                            marginTop: 1
                        }}
                    >
                        Just another information about Gauss Sidel
                    </Text>
                </div>
                <Row gutter={12}>
                    <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Text>
                            Enter number of roots to find
                        </Text>
                        <Input onChange={changeRoot} placeholder="3" />
                    </Col>
                </Row>

                <div
                    style={{
                        marginTop: 15
                    }}
                >
                    <Text>
                        Enter the coefficient of the equations.
                    </Text>
                    <Row gutter={12}>
                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div>
                                {renderAllInputs()}
                            </div>
                        </Col>

                    </Row>
                    <Row
                        style={{
                            marginTop: 15
                        }}
                        gutter={12}>
                        <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Iteration Rule
                            </Text>
                            <Input onChange={changeRule} placeholder="0.0001" />
                        </Col>
                        <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Decimal Points
                            </Text>
                            <Input type="number" onChange={changeDecimal} placeholder="5" />
                        </Col>
                    </Row>
                    <Button
                        style={{
                            marginTop: 15
                        }}
                        onClick={solveGaussSidel}
                    >
                        Solve
                    </Button>
                </div>
                <div
                    style={{
                        marginTop: 15
                    }}
                >
                    <Text>
                        The Roots Are:
                    </Text>
                    {displayRoots()}
                </div>
                <div
                    style={{
                        marginTop: 15
                    }}
                >
                    <Text>
                        Tabulated Result
                    </Text>
                    <Table
                        pagination={false}
                        columns={columnData}
                        dataSource={rowData} />
                </div>
            </Layout>
        </LayoutComponent >
    )
}
