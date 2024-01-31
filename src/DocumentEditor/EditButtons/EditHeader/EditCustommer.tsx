import { useState } from "react"
import { Button, Modal } from "antd"
import Custommer from "../../../types/Custommer"
import { EditOutlined } from "@ant-design/icons"
import EditCustommerForm from "./EditCustommerForm"

type EditCustommerProps = {
    custommer:Custommer,
    custommerSetter:React.Dispatch<React.SetStateAction<Custommer>>
}
function EditCustommer(props:EditCustommerProps){
    const [custommerInfoIsVisible, setCustommerInfoisVisible] = useState(false)
    const [formIsOpen, setFormIsOpen] = useState(false)
    const {custommer, custommerSetter} =props
    
    const handleOk = () => {
      setCustommerInfoisVisible(false);
      };
    
      const handleCancel = () => {
        setFormIsOpen(false)
        setCustommerInfoisVisible(false);
      };


    return (<><Button type="default" onClick={()=>setCustommerInfoisVisible(true)}>Client</Button>
    {custommerInfoIsVisible && <Modal title="Informations du client" open={custommerInfoIsVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
   { formIsOpen ? <EditCustommerForm custommer={custommer} custommerSetter={custommerSetter} setFormIsOpen={setFormIsOpen}/> :
    <div><Button type="default" onClick={()=>setFormIsOpen(true)}><EditOutlined /></Button>
      <div>
        <p>Nom: {custommer.name}</p>
        <p>Facturation: {custommer.billingAddress}</p>
        {custommer.billingAddress !== custommer.deliveryAddress && <p>Livraison: {custommer.deliveryAddress}</p>}
        {custommer.vatNumber && <p>TVA: {custommer.vatNumber}</p>}
      </div>
    </div>}
    </Modal>}</>)
}

export default EditCustommer