import React, { FunctionComponent, useEffect, useState } from "react";
import { Card, Upload, message, Image, Button, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import readXlsxFile from "read-excel-file";

const { Dragger } = Upload;

interface AdsRow {
  name: string;
  date: string;
  movie: string;
}

const Index: FunctionComponent = () => {
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [result, setResult] = useState<AdsRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSumbit = () => {
    setLoading(true);
    setResult([]);
    files.map((file, fileIndex) => {
      let a = [];
      const reader = new FileReader();
      reader.onload = (textFile) => {
        if (typeof textFile.target.result === "string") {
          let rows = textFile.target.result.split("\n");
          if(rows.length == 1){
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
                    name: file.name,
                    date: a[0][colIndex],
                    movie: cols[0],
                  });
                }
              }
            });
          });
          result.push(...tempResult)
          setResult(result);
        }
      };
      reader.readAsText(file.originFileObj);
      if(files.length-1 === fileIndex){
        setLoading(false);
      }
    });
  };

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
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            width={"auto"}
            height={100}
            preview={false}
            src={"https://i.blogs.es/1fe3ee/crunchyroll/450_1000.png"}
          />
        </div>
        <Dragger
          name={"file"}
          multiple={true}
          action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
          onChange={(info) => {
            const { status } = info.file;
            if (status === "done") {
              message.success(`${info.file.name} file uploaded successfully.`);
              setFiles(info.fileList);
            } else if (status === "error") {
              message.error(`${info.file.name} file upload failed.`);
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
          <>
            <Button onClick={onSumbit}>Procesar</Button>
            <Button
              onClick={() => {
                console.log(result);
              }}
            >
              Guardar
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};
export default Index;
