import {FunctionComponent, useState} from "react";
import {ConfigProvider, Image, Layout as LayoutAntd} from "antd";
import esES from "antd/lib/locale/es_ES";

const {Content, Footer, Sider} = LayoutAntd;

const Layout: FunctionComponent = ({children}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <LayoutAntd>
            <Sider
                theme="light"
                style={{
                    minHeight: "90vh",
                    boxShadow: "0 2px 21px rgba(0,37,136,0.23)",
                    position: "fixed",
                    zIndex: 99
                }}
                breakpoint="lg"
                onBreakpoint={(breakPoint) => setCollapsed(breakPoint)}
                collapsedWidth="0"
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image
                        width={"auto"}
                        height={100}
                        preview={false}
                        src={'https://i.blogs.es/1fe3ee/crunchyroll/450_1000.png'}
                    />
                </div>
            </Sider>
            <LayoutAntd style={{marginLeft: collapsed ? 0 : 200, minHeight: "100vh"}}>
                <ConfigProvider locale={esES}>
                    <Content style={{margin: "24px 16px 0"}}>
                        <div style={{padding: 24, minHeight: "90%"}}>
                            {children}
                        </div>
                    </Content>
                </ConfigProvider>
                <Footer style={{textAlign: "center"}}>
                    ©2020 Made with ❤ by FanTec
                </Footer>
            </LayoutAntd>
        </LayoutAntd>
    );
}
export default Layout;