import React, { useState } from 'react'
import { rearrangeData, computeGaussSidel, parseResult, parseColumn } from '../computation/gaussSidelv2'
import LayoutComponent from '../components/Layout'

import { Typography, Layout, Input, Row, Col, Button, Table, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;



export default function GaussSidel() {


    const [noRoots, setNoRoots] = useState(3)
    const [dataPoints, setDataPoints] = useState([])
    const [iterationRule, setIterationRule] = useState(0.0001)
    const [decimalPoints, setDecimalPoints] = useState(5)
    const [rearrangeDataResult, setRearrangeDataResult] = useState([])
    const [roots, setRoots] = useState([])
    const [solved, setSolved] = useState(false)
    const [errorInput, setErrorInput] = useState(false)
    const [rowData, setRowData] = useState([])
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
            title: 'X3',
            dataIndex: 'X3',
            key: 'X3'
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

        },
        {
            title: 'ErX3',
            dataIndex: 'ErX3',
            key: 'ErX3',

        }

    ])




    const roundOffLower = () => {
        return Math.floor(24 / (noRoots + 1))
    }

    const renderAllInputs = () => {
        return [...Array(noRoots).keys()].map((value, index) => (
            <Row
                style={{
                    marginTop: index === 0 ? 0 : 15
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
                        type="number"
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


    const renderRearrangeDataParent = () => {
        return rearrangeDataResult.map((value, index) => (

            <Space direction="horitzonal">
                Equation {index + 1} <ArrowRightOutlined /> {renderRearrangeData(value)}
            </Space>
        ))
    }

    const renderRearrangeData = (data) => {
        return data.map((value, index) => (
            <Text>{value}{index === noRoots ? "" : `X${noRoots - index}`} {index === noRoots ? "" : index === noRoots - 1 ? "=" : "+"}</Text>
        ))
    }


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
        setErrorInput(false)

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
            console.log('rearrange', reArrangedData1)
            setRearrangeDataResult(reArrangedData1)
            let tabulatedResult1 = computeGaussSidel(reArrangedData1, iterationRule, decimalPoints)
            setRoots(tabulatedResult1[tabulatedResult1.length - 1].slice(0, noRoots))

            tabulatedResult1 = parseResult(tabulatedResult1, noRoots)
            let newColumn = parseColumn(tabulatedResult1)
            setColumnData(newColumn)

            setRowData(tabulatedResult1)
            setSolved(true)
        } else {
            setErrorInput(true)
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
                        {`X${index + 1}`} = {value}
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

                    <Space
                        size={0.5}
                        direction="vertical">
                        <Text
                            style={{
                                marginTop: 1,
                                marginBottom: 0
                            }}
                        >
                            Solving systems of linear equations using
                            Gauss Seidel method .

                        </Text>
                        <Text
                            strong
                            type="success"
                            italic
                            style={{
                                marginTop: 0,
                                fontSize: "12px"
                            }}
                        >
                            Note: Solve polynomial equations only

                        </Text>
                    </Space>
                </div>
                <Row
                    style={{
                        marginTop: 15
                    }}
                    gutter={12}>
                    <Col className="gutter-row" xs={4} sm={4} md={4} lg={4} xl={4}>
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
                    <Space direction="vertical">
                        <Text
                            style={{
                                marginBottom: 0
                            }}
                        >
                            Enter the coefficient of the equations in simplified form.

                        </Text>
                        <Text
                            italic
                            style={{
                                marginTop: 0,
                                fontSize: "12px"
                            }}
                        >
                            *Note: Fractions and square roots needs to be simplified.
                                    <br/>
                                    Example: <br/>
                                    √4 should be entered as 2,
                                    <br />
                                    4/2 should be entered as 2,
                                    <br/>
                                    2/4 should be entered as 0.5
                        </Text>
                        <Text
                            hidden={!errorInput}
                            style={{
                                marginBottom: 0
                            }}
                            type="danger"
                        >
                            Make sure to fill out all inputs to solve the for the roots.
                        </Text>

                    </Space>

                    <Row gutter={12}>

                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div>
                                {noRoots > 0 && renderAllInputs()}
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
                    hidden={!solved}
                    style={{
                        marginTop: 15
                    }}
                >
                    <Space direction="vertical">
                        <Title
                            level={5}
                        >
                            Rearrange the equation:
                        </Title>
                        {solved && renderRearrangeDataParent()}
                    </Space>
                    <br />
                    <div
                        style={{
                            marginTop: 15
                        }}
                    >
                        <Title
                            level={5}
                        >
                            The Roots are the following:
                        </Title>
                        {displayRoots()}

                    </div>
                </div>
                <div
                    hidden={!solved}
                    style={{
                        marginTop: 15
                    }}
                >
                    <Title
                        level={5}
                    >
                        Tabulated Result
                    </Title>
                    <Table
                        pagination={false}
                        columns={columnData}
                        dataSource={rowData} />
                </div>
            </Layout>
        </LayoutComponent >
    )
}
