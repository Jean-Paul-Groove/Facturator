import { pdf, PDFDownloadLink } from "@react-pdf/renderer"
import PDFPage from "./PDFPage/PDFPage"
import "./DocumentEditor.css"
import EditItems from "./EditButtons/EditItems/EditItems"
import { useEffect, useState } from "react"
import InvoiceItem from "../types/InvoiceItem"
import EditCustommer from "./EditButtons/EditCustommer/EditCustommer"
import Custommer from "../types/Custommer"
import Address from "../types/Address"
import EditCompany from "./EditButtons/EditCompany/EditCompany"
import Company from "../types/Company"
import EditHeader from "./EditButtons/EditHeader/EditHeader"
import Header from "../types/Header"
import { Button } from "antd"
import PDFViewer from "./PDFViewer/PDFViewer"
const emptyAddress:Address = {
location:'245 rue Hasard',
postalCode:"01234",
city:'Cherbourg'
}
function DocumentEditor(){
    const [itemList, setItemList] = useState<InvoiceItem[]>([{
        denomination:"Perruque blonde",
        quantity:12,
        price:25,
        vatRate:0,
        reduction:0,
        ht:300,
        ttc:300
    }])
    const [custommer, setCustommer] = useState<Custommer>({name:'Marylin Monroe',deliveryAddress:emptyAddress,billingAddress:emptyAddress})
    const [company, setCompany] = useState<Company>({name:'Perruque Limited',address:emptyAddress,legalReference:'SIRET: 01234567891234'})
    const [header, setHeader] = useState<Header>({number:'2024-0000',date:"01/01/1900"})
    const [pdfFile, setPdfFile] = useState<File |undefined>()
    useEffect(function updatePDF(){ 
        pdf(PDFPage({
            header:header, items:itemList, custommer:custommer, company:company,
        }) ).toBlob().then(blob =>{ 
            setPdfFile(new File([blob], 'Facture'))})}, [custommer, company, header, itemList]
       
    )

    
    

    return (
    <> <div className="header"><h1 id="title">FACTURATOR</h1></div>
        <div className="edit-document">  
            <div className="edit-buttons-container">
                <p>Personnalisez votre facture: </p>
                <EditHeader header={header} headerSetter={setHeader}/>
                <EditCompany company={company} companySetter={setCompany}/>
                <EditCustommer custommer={custommer} custommerSetter={setCustommer}/>
                <EditItems items={itemList} itemSetter={setItemList}/>
                <Button type='primary' className="edit-button"> <PDFDownloadLink document={<PDFPage header={header} company={company}items={itemList} custommer={custommer}/>}>Télécharger</PDFDownloadLink></Button>
            </div>
            <div className='pdf-container'> 
            {pdfFile && <PDFViewer file={pdfFile}/>}
            </div>
           
        </div>
       
    </>
    )

}
export default DocumentEditor