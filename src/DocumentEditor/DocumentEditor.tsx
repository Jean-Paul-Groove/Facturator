import { pdf } from "@react-pdf/renderer";
import "./DocumentEditor.css";
import { useEffect, useState } from "react";
import InvoiceItem from "../types/InvoiceItem";
import Custommer from "../types/Custommer";
import Address from "../types/Address";
import Company from "../types/Company";
import Header from "../types/Header";
import PDFViewer from "./PDFViewer/PDFViewer";
import Theme from "../types/Theme";
import Logo from "../types/Logo";
import defaultLogo from "../assets/logo/logoPlaceholder.jpg";
import PDFDocument from "./PDFDocument/PDFDocument";
import EditMenu from "./EditMenu/EditMenu";
const emptyAddress: Address = {
  location: "1 rue ",
  postalCode: "01234",
  city: "Ville",
};
function DocumentEditor() {
  const [itemList, setItemList] = useState<InvoiceItem[]>([
    {
      denomination: "Service",
      quantity: 1,
      price: 0,
      vatRate: 0,
      reduction: 0,
      date: "01.01.24",
      ttc: 0,
    },
  ]);
  const [custommer, setCustommer] = useState<Custommer>({
    name: "Client",
    deliveryAddress: emptyAddress,
    billingAddress: emptyAddress,
  });
  const [company, setCompany] = useState<Company>({
    name: "Entreprise",
    address: emptyAddress,
    legalReference: "SIRET",
    vat: false,
  });
  const [header, setHeader] = useState<Header>({
    number: "2024-0000",
    date: "01/01/2024",
  });
  const [pdfFile, setPdfFile] = useState<File | undefined>();
  const [theme, setTheme] = useState<Theme>({
    color: "#BBE2EC",
    fontColor: "black",
  });
  const [logo, setLogo] = useState<Logo>({
    url: defaultLogo,
    name: "logo",
  });
  const editMenuProps = {
    editHeader: {
      header: header,
      setHeader: setHeader,
    },
    editCompany: {
      company: company,
      setCompany: setCompany,
    },
    editCustommer: {
      custommer: custommer,
      setCustommer: setCustommer,
    },
    editItems: {
      itemList: itemList,
      setItemList: setItemList,
    },
    editTheme: {
      theme: theme,
      setTheme: setTheme,
    },
    editLogo: { logo: logo, setLogo: setLogo },
  };
  useEffect(
    function updatePDF() {
      pdf(
        PDFDocument({
          header: header,
          items: itemList,
          custommer: custommer,
          company: company,
          theme: theme,
          logo: logo,
        })
      )
        .toBlob()
        .then((blob) => {
          setPdfFile(new File([blob], "Facture"));
        });
    },
    [custommer, company, header, itemList, theme, logo]
  );

  return (
    <>
      {" "}
      <div className="header">
        <EditMenu {...editMenuProps} drawer />
        <h1 id="title">FACTURATOR</h1>
      </div>
      <div className="edit-document">
        <div className="edit-buttons-container">
          <p>Personnalisez votre facture: </p>
          <EditMenu {...editMenuProps} />
        </div>
        <div className="pdf-container">
          {pdfFile && <PDFViewer file={pdfFile} theme={theme} />}
        </div>
      </div>
    </>
  );
}
export default DocumentEditor;
