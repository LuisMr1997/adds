import React, {FunctionComponent, useState} from "react";
import {Button, Card, Form, Image, Input, Spin, Tooltip, Typography} from "antd";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from "react-hook-form";
import {InfoCircleOutlined} from "@ant-design/icons";
import axios from "axios";

const {Text} = Typography;


const Index: FunctionComponent = () => {


    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Card
                style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                    maxWidth: '100%',
                    width: '400px'
                }}
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
            </Card>
        </div>
    );
}
export default Index;
