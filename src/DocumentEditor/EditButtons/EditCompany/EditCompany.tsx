import { Button, Modal } from "antd";
import Company from "../../../types/Company";
import { useState } from "react";
import EditCompanyForm from "./EditCompanyForm/EditCompanyForm";
import { EditOutlined } from "@ant-design/icons";
import "./EditCompany.css"
type EditCompanyProps = {
    company:Company,
    companySetter:React.Dispatch<React.SetStateAction<Company>>
}

function EditCompany(props: EditCompanyProps){
    const [companyInfoIsVisible, setCompanyInfoisVisible] = useState(false)
    const [formIsOpen, setFormIsOpen] = useState(false)
    const {company, companySetter} =props
    
    const handleOk = () => {
      setCompanyInfoisVisible(false);
      };
    
      const handleCancel = () => {
        setFormIsOpen(false)
        setCompanyInfoisVisible(false);
      };


    return(<><Button type="default" onClick={()=>setCompanyInfoisVisible(true)}>Vous</Button>
    {companyInfoIsVisible && <Modal title="Informations de l'entreprise" open={companyInfoIsVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
   { formIsOpen ? <EditCompanyForm company={company} companySetter={companySetter} setFormIsOpen={setFormIsOpen}/> :
    <div>
    <div className="edit-company-openForm-button"><Button type="default" onClick={()=>setFormIsOpen(true)}><EditOutlined /></Button></div>
          <div>
        <p className="edit-company-name">{company.name}</p>
        <p className="edit-company-section">Adresse: </p>
        <p>{company.address.location}</p>
        <p>{company.address.postalCode} {company.address.city}</p>
        <p>{company.legalReference}</p>
        {company.vatNumber && <><p className="edit-company-section">Numéro de TVA :</p> <p>{company.vatNumber}</p></>}
       {(company.email || company.phoneNumber) &&
       <p className="edit-company-section">Contact: </p>}
        {company.email && <p>{company.email}</p>}
        {company.phoneNumber && <p> {company.phoneNumber}</p>}
      </div>
    </div>}
    </Modal>}</>)
}

export default EditCompany