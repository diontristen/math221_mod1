import React, { useEffect } from 'react'
import { computeLagrange } from '../computation/langrange'
import {
    evaluate, simplify, 
} from 'mathjs'
import LayoutComponent from '../components/Layout'

import { Typography, Layout, Input, Row, Col, Divider } from 'antd';

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
let data = [
    [5,120],
    [-1,-6],
    [-3,-32],
    [2,3]
]


export default function  LagrangePage() {

    useEffect(() => {
        let result = computeLagrange(data, 5)
        console.log(result)
    }, [])


    const changeInput = (input) => {
        let result = []
        let splittedInput = input.split('\n')
        splittedInput.forEach((value, index) => {
            let decomposedInput = value.split(' ')
            let filteredInput = decomposedInput.filter((el) => {
                return el.length && el == +el
            })
            console.log(filteredInput)
        })
    }

    let instruction = `
        Enter the given matrix
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
            <div>

                <Row gutter={12}>
                    <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Text>
                            {instruction}
                        </Text>
                        <TextArea
                            onChange={(e) =>
                                changeInput(e.target.value)
                            }
                            rows={5} />
                    </Col>
                    <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextArea
                            onChange={(e) =>
                                changeInput(e.target.value)
                            }
                            rows={5} />
                    </Col>
                </Row>
            </div>

        </Layout>
    </LayoutComponent>
    )
}
