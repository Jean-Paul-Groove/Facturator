import { Button, Form, Input } from "antd"
import Custommer from "../../../types/Custommer"
import './EditCustommerForm.css'

type EditCustommerFormProps = {
    custommer:Custommer,
    custommerSetter:React.Dispatch<React.SetStateAction<Custommer>>,
    setFormIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

function EditCustommerForm(props: EditCustommerFormProps){
    const {custommer, custommerSetter, setFormIsOpen} = props
const [form] = Form.useForm()
form.setFieldsValue({name:custommer.name, deliveryAddress:custommer.deliveryAddress, billingAddress:custommer.billingAddress, vatNumber:custommer.vatNumber})
function handleSubmit(){
   const values = form.getFieldsValue()
    const newCustommer:Custommer = {
        name:values.name,
        deliveryAddress:values.deliveryAddress,
        billingAddress:values.billingAddress ?values.billingAddress : values.deliveryAddress,
        vatNumber:values.vatNumber ? values.vatNumber : undefined,
    }
    custommerSetter(newCustommer)
    setFormIsOpen(false)
}
return(
         <Form
            form={form}
            name="edit-custommer-form" onFinish={handleSubmit}>
                <Form.Item label="Nom" name="name"rules={[{ required: true, message: 'Le nom du client' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Adresse de livraison" name="deliveryAddress"rules={[{ required: true, message: 'Le nom du client' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Adresse de facturation" name="billingAddress"  >
                    <Input placeholder="Si différente de l'adresse de livraison"/>
                </Form.Item>
                <Form.Item label="Numéro de TVA" name="vatNumber"  >
                    <Input />
                </Form.Item>
                <div className="edit-custommer-form-button-container"> <Button  type="primary" htmlType="submit">Valider</Button>
                <Button  type="default" onClick={()=> setFormIsOpen(false)}>Annuler</Button></div>
               
    </Form>
)
}

export default EditCustommerForm