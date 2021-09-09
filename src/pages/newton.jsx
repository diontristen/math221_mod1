import React, { useState } from 'react'
import { computeNewton } from '../computation/newton'
import LayoutComponent from '../components/Layout'
import Polynomial from 'polynomial'

import { Typography, Layout, Input, Row, Col, Button, Table, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export default function NewtonPage() {

    const [initial, setInitial] = useState(5)
    const [equation, setEquation] = useState('')
    const [derivation, setDerivation] = useState('')
    const [iterationRule, setIterationRule] = useState(0.0001)
    const [solved, setSolved] = useState(false)
    const [roundOff, setRoundOff] = useState(5)
    const [rowData, setRowData] = useState([])
    const [roots, setRoots] = useState([])
    const [error, setError] = useState('')
    const [columnData, setColumnData] = useState([
        {
            title: 'k',
            dataIndex: 'k',
            key: 'k'
        },
        {
            title: 'X',
            dataIndex: 'x',
            key: 'x'
        },
        {
            title: 'f(x)',
            dataIndex: 'fx',
            key: 'fx'
        },
        {
            title: "f'(x)",
            dataIndex: 'fx1',
            key: 'fx'
        },
        {
            title: 'X1',
            dataIndex: 'x1',
            key: 'x1'
        },
        {
            title: 'Er',
            dataIndex: 'er',
            key: 'er',
        },


    ])


    const derive = () => {
        let result = Polynomial(equation).derive()
        setDerivation(result.toString())
    }

    const changeEquation = (e) => {
        let equation = e.target.value
        setEquation(equation)
        setError('')
    }

    const validate = () => {
        if (equation === '' ||
            derivation === '' ||
            initial === '' ||
            iterationRule === '' ||
            roundOff === ''
        ) {
            setError("Please make sure to fill out all input")
            setRoots("")
            setRowData([])
            setSolved(false)
            return false
        }
    }



    const solveNewton = () => {
        let validation = validate()

        if (validation === false) {
            return false
        }
        let result = computeNewton(initial, equation, derivation, iterationRule, roundOff)
        if (result.status === true) {
            setSolved(true)
            let root = result.result[result.result.length - 1]
            setRoots(root.x)
            setRowData(result.result)
        } else {
            setError(result.result)
        }
    }


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
                        Newton Method
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
                            Root of an equation using Newton Method
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
                <Text
                    type="danger"
                    style={{
                        display: error === '' ? "none" : "block"
                    }}
                >
                    {error}
                </Text>
                <div>
                    <Row
                        style={{
                            marginTop: 15
                        }}
                        gutter={12}>
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div style={{display:'grid', marginBottom: '10px'}}>
                                <Text
                                    strong
                                >
                                    Input the f(x) equation below. You can use ^ to indicate the exponent of x.
                                </Text>
                                <Text
                                    italic
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
                            </div>
                            <Row
                                gutter={12}
                            >
                                <Col className="gutter-row" xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            height: "100%"
                                        }}
                                    >
                                        <Text
                                            strong
                                        >
                                            f(x)
                                        </Text>
                                    </div>
                                </Col>
                                <Col className="gutter-row" xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <Text>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                height: "100%"
                                            }}
                                        >
                                            <Text
                                                strong
                                            >
                                                =
                                            </Text>
                                        </div>
                                    </Text>
                                </Col>
                                <Col className="gutter-row" xs={18} sm={18} md={18} lg={18} xl={18}>
                                    <Input
                                        style={{
                                            flex: "1"
                                        }}
                                        onChange={changeEquation}
                                        placeholder="3" />
                                </Col>
                            </Row>
                            <Row
                                style={{
                                    marginTop: 15
                                }}
                                gutter={12}
                            >
                                <Col className="gutter-row" xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            height: "100%"
                                        }}
                                    >
                                        <div class="fraction">
                                            <span class="fup">d</span>
                                            <span class="bar">/</span>
                                            <span class="fdn">dx</span>
                                        </div>
                                        <Text
                                            strong
                                        >
                                            f(x)
                                        </Text>
                                    </div>
                                </Col>
                                <Col

                                    className="gutter-row" xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <Text>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                height: "100%"
                                            }}
                                        >
                                            <Text
                                                strong
                                            >
                                                =
                                            </Text>
                                        </div>
                                    </Text>
                                </Col>
                                <Col className="gutter-row" xs={18} sm={18} md={18} lg={18} xl={18}>
                                    <div
                                        style={{
                                            display: "flex"
                                        }}
                                    >
                                        <Input
                                            style={{
                                                flex: "1"
                                            }}
                                            value={derivation}
                                            onChange={(e) => {
                                                setDerivation(e.target.value)
                                                setError('')
                                            }}
                                            placeholder="3" />
                                        <Button
                                            onClick={derive}
                                            disabled={equation === '' ? true : false}
                                        >
                                            Try to get first derivation
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginTop: 15
                        }}
                        gutter={12}>
                        <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Inital X Value
                            </Text>
                            <Input onChange={(e) => {
                                setInitial(e.target.value)
                                setError('')

                            }} type="number" placeholder="4" />
                        </Col>
                        <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Iteration Rule
                            </Text>
                            <Input onChange={(e) => {
                                setIterationRule(e.target.value)
                                setError('')

                            }} placeholder="0.0001" />
                        </Col>
                        <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Decimal Points
                            </Text>
                            <Input type="number" onChange={(e) => {
                                setRoundOff(e.target.value)
                                setError('')

                            }} placeholder="5" />
                        </Col>
                    </Row>
                </div>
                <div
                    style={{
                        marginTop: 15
                    }}
                >
                    <Space direction="vertical">

                        <Button
                            onClick={solveNewton}
                        >
                            Solve
                        </Button>
                    </Space>
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
                        Root of the Equations:
                    </Title>
                    <Text>
                        X = {roots}
                    </Text>
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
