import React, { useEffect, useState } from 'react'
import { computeLagrange } from '../computation/langrange'
import {
    evaluate, simplify, 
} from 'mathjs'
import LayoutComponent from '../components/Layout'

import { Typography, Layout, Input, Row, Col, Button, Space } from 'antd';

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
    const[equation, setEquation] = useState()
    const[x, setX] = useState()

    const onCalculate = () => {
        console.log('data',data)
        let result = computeLagrange(data, 5, decimal)
        setEquation(result.answer)
        setX(result.final)
        console.log('result',result)
    }

    const changeDecimal = (e) => {
        let eA = parseInt(e.target.value)
        setDecimal(eA)
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

    let instruction = `Enter the given in tis format: \n
        x  f(x) \n
        5  2 \n
        3  2 \n
        1  2 \n
    ` 
    let note = `Take Note: \n
    *It will only accept the first 2 numbers per line separated by space.
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
                        <Text italic>
                            {note}
                        </Text>
                        <TextArea
                            onChange={(e) =>
                                changeInput(e.target.value)
                            }
                            rows={5}/>
                    </Col>
                <Col className="gutter-row" xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Text>
                                Decimal Point
                            </Text>
                            <Input type="number" onChange={changeDecimal} placeholder="5" />
                </Col>
                <Button style={{marginTop: 15}} onClick={onCalculate}>Calculate</Button>
                <div style={{display:'grid', marginTop: 15}}>
                    <Text italic>Answers:</Text>
                    <Text>x = {x}</Text>
                    <Text>Equation : {equation}</Text>
                </div>
            </div>
        </Layout>
    </LayoutComponent>
    )
}
