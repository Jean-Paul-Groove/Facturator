import { PDFViewer } from "@react-pdf/renderer"
import PDFPage from "./PDFPage/PDFPage"
import "./DocumentEditor.css"
import EditItems from "./EditButtons/EditItems/EditItems"
import { useState } from "react"
import InvoiceItem from "../types/InvoiceItem"

function DocumentEditor(){
    const [itemList, setItemList] = useState<InvoiceItem[]>([])

    return (
       <> <h1>FACTURATOR</h1>
        <div className='pdf-container'>
            <PDFViewer width={"100%"} height={'800'}>
                <PDFPage items={itemList}/>
            </PDFViewer>
        </div>
        <div className="edit-buttons-container">
            <EditItems items={itemList} itemSetter={setItemList}/>
        </div></>
    )

}
export default DocumentEditor