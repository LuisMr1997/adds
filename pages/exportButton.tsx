import React, { FunctionComponent } from "react";
import { AdsRow } from "./index";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface ButtonValues {
    data: AdsRow[]
}

const ExportButton: FunctionComponent<ButtonValues> = ({ data }) => {
    return (
        <ExcelFile style={{margin:'2%'}} element={<Button danger={true} ghost={true} onClick={()=>{setTimeout(()=>{location.reload()},200)}}>Exportar Excel</Button>} filename="ResumenAds">
            <ExcelSheet data={data} name={"result"}>
                <ExcelColumn label={"Anuncio"} value={"name"} />
                <ExcelColumn label={"Fecha"} value={"date"} />
                <ExcelColumn label={"Peliculas"} value={"movie"} />
            </ExcelSheet>
        </ExcelFile>
    );
}
export default ExportButton;