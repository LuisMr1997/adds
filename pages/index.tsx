import React, { FunctionComponent, useEffect, useState } from "react";
import { Card, Upload, message, Image, Button, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface"
import dynamic from "next/dynamic";
import moment from 'moment';

const { Dragger } = Upload;

export interface AdsRow {
  name: string;
  date: string;
  movie: string;
}

const Index: FunctionComponent = () => {
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [result, setResult] = useState<AdsRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const ButtonToExport = dynamic(() => import('./exportButton'), { ssr: false })

  const onSumbit = () => {
    setLoading(true);
    setResult([]);
    files.map((file, fileIndex) => {
      let a = [];
      const reader = new FileReader();
      reader.onload = (textFile) => {
        if (typeof textFile.target.result === "string") {
          let rows = textFile.target.result.split("\n");
          if (rows.length == 1) {
            rows = textFile.target.result.split("\r\n");
          }
          const header = rows[0].split(",");
          let tempResult = [];
          rows.map((row, index) => {
            const cols = row.split(",");
            a[index] = cols;
            cols.map((col, colIndex) => {
              let colValue = col.replaceAll('"', "");
              if (
                Number(colValue) > 0 &&
                colIndex !== cols.length - 1 &&
                colIndex !== cols.length - 2
              ) {
                for (var i = 0; i < Number(colValue); i++) {
                  tempResult.push({
                    name: file.name.replace(".csv", ""),
                    date: a[0][colIndex],
                    movie: cols[0],
                  });
                }
              }
            });
          });
          result.push(...tempResult)
          result.sort((a, b) => moment(a.date, "DD-MMM").unix() - moment(b.date, "DD-MMM").unix())
          setResult(result);
        }
      };
      reader.readAsText(file.originFileObj);
      if (files.length - 1 === fileIndex) {
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    document.title = "AdSpeed Converter"
  }, [])

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          maxWidth: "100%",
          width: "400px",
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:'10%'
          }}
        >
          <Image
            width={300}
            height={'auto'}
            preview={false}
            src={'images/logo-adspeed.png'}
          />

        </div>
        <Dragger
          name={"file"}
          disabled={result.length!==0}
          multiple={true}
          beforeUpload={()=>{return true}}
          onChange={(info) => {
            const { status } = info.file;
            if (status === "done") {
              message.success(`${info.file.name} se ha cargado exitosamente.`);
              setFiles(info.fileList);
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            De click o arrastre los arrastre los archivos a esta área
          </p>
        </Dragger>
        {loading ? (
          <Spin />
        ) : (
            <div style={{ textAlign: "center", margin: '5%' }}>
              {
                files.length !== 0 && result.length === 0 && <Button onClick={onSumbit} style={{ margin: '2%' }}>Procesar</Button>

              }
              {
                result.length !== 0 && <ButtonToExport data={result} />
              }
            </div>
          )}
      </Card>
    </div>
  );
};
export default Index;
