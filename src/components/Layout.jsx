import React, { useState, useEffect } from 'react'
import { Layout, Menu, Typography } from 'antd';
import { useHistory } from "react-router-dom";
const { Text } = Typography

const { Content, Footer, Sider } = Layout;




export default function LayoutComponent({ children }) {
    let history = useHistory()
    const [collapsed, setCollapsed] = useState(true)
    const [key, setKey] = useState()
    useEffect(() => {
        let path = window.location.pathname
        path = path.replace('/', '')
        setKey(path)
    }, [])


    const toggleSidebar = () => {
        setCollapsed(!collapsed)
    }


    const goToPage = (key) => {
        history.push(`/${key}`)
    }



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggleSidebar}>
                <div className="logo" style={{
                    padding: 15
                }}>
                    <img
                        style={{
                            width: "100%", height: "100%"
                        }}
                        alt="example"
                        className="logo"
                        src="assets/mp_icon.png" />
                </div>
                <Menu theme="dark" selectedKeys={[key]} mode="inline">
                    <Menu.Item key=""
                        onClick={() => goToPage('')}
                        icon={<Text >H</Text>}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="newton"
                        onClick={() => goToPage('newton')}
                        icon={<Text >N</Text>}>
                        Newton
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => goToPage('gaussSidel')}

                        key="gaussSidel" icon={<Text >GS</Text>}>
                        Gauss Sidel
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => goToPage('lagrange')}
                        key="lagrange" icon={<Text >L</Text>}>
                        Lagrange
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} > 
                    Just A Problem
                </Header> */}
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Machine Problem ©2021  by Aguilar & Agcaoili</Footer>
            </Layout>
        </Layout>
    )
}
