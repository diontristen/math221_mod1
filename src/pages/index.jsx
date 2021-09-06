import React from 'react'
import { Typography, Row, Col, Card } from 'antd';
import { useHistory } from "react-router-dom";



export default function Index() {
    let history = useHistory()


    const changePage = (key) => {
        history.push(`/${key}`)
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                maxWidth: "1600px"
            }}
        >
            <Row
            style={{
                width: "80%"
            }}
                justify="center"
                gutter={12}
            >
                <Col 
                  
                className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <img
                                style={{
                                    width: "100%", maxWidth: "750px", height: "100%"
                                }}
                                alt="example" 
                                src="assets/mp_icon.png" />
                    </div>
                </Col>
                <Col 
                  style={{
                    marginTop: 15
                }}
                className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={24}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Card
                            onClick={() => {changePage('newton')}}
                            hoverable
                            className="img-hover-zoom"
                            style={{ width: "100%", maxWidth: "750px", height: "100%", overflow: "none" }}
                        >
                            <img
                                style={{
                                    width: "100%", maxWidth: "750px", height: "100%"
                                }}
                                alt="example" 
                                src="assets/index_newton.jpg" />
                        </Card>
                    </div>
                </Col>
                <Col 
                  style={{
                    marginTop: 15
                }}
                className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={24}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Card
                            onClick={() => {changePage('gaussSidel')}}
                            hoverable
                            className="img-hover-zoom"
                            style={{ width: "100%", maxWidth: "750px", height: "100%" }}
                        >
                            <img
                                style={{
                                    width: "100%", maxWidth: "750px", height: "100%"
                                }}
                                alt="example" src="assets/index_gauss_sidel.jpg" />
                        </Card>

                    </div>
                </Col>
                <Col 
                  style={{
                    marginTop: 15
                }}
                className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={24}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Card
                            onClick={() => {changePage('lagrange')}}
                            hoverable
                            className="img-hover-zoom"
                            style={{ width: "100%", maxWidth: "750px", height: "100%" }}
                        >
                            <img
                                style={{
                                    width: "100%", maxWidth: "750px", height: "100%"
                                }}
                                alt="example" src="assets/index_lagrange.jpg" />
                        </Card>
                    </div>

                </Col>

            </Row>
        </div>
    )
}
