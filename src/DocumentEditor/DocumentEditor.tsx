import { PDFViewer } from "@react-pdf/renderer"
import PDFPage from "./PDFPage/PDFPage"
import "./DocumentEditor.css"
import EditItems from "./EditButtons/EditItems/EditItems"
import { useState } from "react"
import InvoiceItem from "../types/InvoiceItem"
import EditCustommer from "./EditButtons/EditHeader/EditCustommer"
import Custommer from "../types/Custommer"

function DocumentEditor(){
    const [itemList, setItemList] = useState<InvoiceItem[]>([])
    const [custommer, setCustommer] = useState<Custommer>({name:'',deliveryAddress:'',billingAddress:'',})

    return (
       <> <h1>FACTURATOR</h1>
        <div className='pdf-container'>
            <PDFViewer width={"100%"} height={'800'}>
                <PDFPage items={itemList} custommer={custommer}/>
            </PDFViewer>
        </div>
        <div className="edit-buttons-container">
            <EditItems items={itemList} itemSetter={setItemList}/>
            <EditCustommer custommer={custommer} custommerSetter={setCustommer}/>
        </div></>
    )

}
export default DocumentEditor