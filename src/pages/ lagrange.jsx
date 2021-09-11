import React, {  useState } from 'react'
import { computeLagrange } from '../computation/langrange'
import {
    evaluate, simplify, 
} from 'mathjs'
import LayoutComponent from '../components/Layout'

import { Typography, Layout, Input, Table, Col, Button, Space, Row, Form } from 'antd';
import { set } from 'nerdamer';

const { Title, Text } = Typography;
const { TextArea } = Input;

/**
 * 
 * default data - given data points / should be rearranged
 * [
 *  [x0,y0],
 *  [x1,y1],
 *  [x2,y2],
 * ]
 */
let data1 = [
    [5,120],
    [-1,-6],
    [-3,-32],
    [2,3]
]


export default function  LagrangePage() {

    const [data, setData] = useState([])
    const[decimal, setDecimal] =useState()
    const[valx, setValx] = useState()
    const[equation, setEquation] = useState()
    const[x, setX] = useState()
    const[fxn, setFxn] = useState()
    const [solved, setSolved] = useState(false)
    const [error, setError] = useState()

    const onCalculate = () => {
       try {
        let result = computeLagrange(data, 5, decimal, valx)
        setEquation(result.answer)
        setX(result.final)
        setFxn(result.fx)
        setSolved(true)
       } catch (error) {
           alert(error)
       }
    }

    const changeDecimal = (e) => {
        let eA = parseInt(e.target.value)
        setDecimal(eA)
    }

    const changeValX = (e) => {
        let eA = parseInt(e.target.value)
        setValx(eA)
    }

    const changeInput = (input) => {
        let result = []
        let splittedInput = input.split('\n')
        splittedInput.forEach((value, index) => {
            let decomposedInput = value.split(' ')
            let filteredInput = decomposedInput.filter((el) => {
                return el.length && el == +el
            })
            var input = filteredInput.slice(0,2).map(function(val) {
                return val;
            });
            result.push(input)
        })
        var inputData = result.map(function(val) {
            return val;
        });
        setData(inputData)
    }

    let instruction = `Enter the given in this format:` 
    let note = `*It will only accept the first 2 numbers per line separated by space.
    `

    const columns = [
        {
          title: 'x',
          dataIndex: 'x',
          key: 'x',
          width: '50%'
        },
        {
          title: 'f(x)',
          dataIndex: 'fxn',
          key: 'fxn',
          width: '50%'
        },
    ]

    const example = [
        {
          key: '1',
          x: 5,
          fxn: 3,
        },
        {
            key: '2',
            x: 8,
            fxn: 3
        },
        {
            key: '3',
            x: 9,
            fxn: 4
        },
        {
            key: '4',
            x: 8,
            fxn: 7
        },
      ];
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
                    Lagrange
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
                        Lagrange method .

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
            <div>
                    <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Text style={{whiteSpace: 'break-spaces'}}>
                            {instruction}
                        </Text>
                        <Table dataSource={example} columns={columns} pagination={false} size='small' style={{width: '20vh'}} />
                        <Text>{error}</Text>
                        <div style={{display: 'grid'}}>
                            <Text
                                        italic
                                        strong
                                    >
                                        Note: 
                                    </Text>
                            <Text italic>
                                    *Fractions and square roots needs to be simplified.
                                        <br/>
                                        Example: <br/>
                                        √4 should be entered as 2,
                                        <br />
                                        4/2 should be entered as 2,
                                        <br/>
                                        2/4 should be entered as 0.5
                            </Text>
                            <Text>
                                {note}
                            </Text>
                        </div>
                        
                        <Form onFinish={onCalculate} initialValues={{remember: true}}>
                            <Form.Item name="data"
                             rules={[
                                {
                                  required: true,
                                  message: 'This field is required',
                                },
                                ]}>

                            <TextArea
                                placeholder="Input your data"
                                onChange={(e) =>
                                    changeInput(e.target.value)
                                }
                                rows={5}/>
                            </Form.Item>
                            <Form.Item name="decimal"
                             rules={[
                                {
                                  required: true,
                                  message: 'This field is required!',
                                },
                                ]}>
                                    <Input type="number" onChange={changeDecimal} placeholder="Number of decimal point (max of 5)" />
                            </Form.Item>
                            <Form.Item name="valx"
                                 rules={[
                                    {
                                      required: true,
                                      message: 'This field is required!',
                                    },
                                    ]}                            
                            >
                                    <Input type="number" onChange={changeValX}  placeholder="Value of x" />
                            </Form.Item>
                            <Form.Item>
                            <Button htmlType='submit' style={{marginTop: 15}}>Calculate</Button>
                            </Form.Item>
                        </Form>
                        
                    </Col>
                <div
                hidden={!solved}
                style={{display:'grid', marginTop: 15}}>
                    <Text italic>Answers:</Text>
                    <Text>Equation : {equation}</Text>
                    <Text>Value of x = {x} </Text>
                    <Text>f(x) of the given x = {fxn} </Text>
                </div>
            </div>
        </Layout>
    </LayoutComponent>
    )
}
