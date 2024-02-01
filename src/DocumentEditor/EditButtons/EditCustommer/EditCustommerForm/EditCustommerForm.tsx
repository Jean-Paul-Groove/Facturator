import { Button, Form, Input } from "antd"
import Custommer from "../../../../types/Custommer"
import './EditCustommerForm.css'
import Address from "../../../../types/Address"

type EditCustommerFormProps = {
    custommer:Custommer,
    custommerSetter:React.Dispatch<React.SetStateAction<Custommer>>,
    setFormIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

function EditCustommerForm(props: EditCustommerFormProps){
    const {custommer, custommerSetter, setFormIsOpen} = props
const [form] = Form.useForm()
form.setFieldsValue({
    name:custommer.name,
    vatNumber:custommer.vatNumber
})
form.setFieldsValue({
    deliveryAddressLocation:custommer.deliveryAddress.location,
    deliveryAddressPostalCode:custommer.deliveryAddress.postalCode,
    deliveryAddressCity:custommer.deliveryAddress.city
})
if(
    custommer.deliveryAddress!=custommer.billingAddress
){form.setFieldsValue({
    billingAddressLocation:custommer.billingAddress.location,
    billingAddressPostalCode:custommer.billingAddress.postalCode,
    billingAddressCity:custommer.billingAddress.city
})}

function handleSubmit(){
   const values = form.getFieldsValue()
   const newDeliveryAddress:Address ={
        location:values.deliveryAddressLocation,
        postalCode:values.deliveryAddressPostalCode,
        city:values.deliveryAddressCity
   }
   const newBillingAddress:Address= (values.billingAddressLocation && values.billingAddressPostalCode && values.billingAddressCity) ?  {
        location: values.billingAddressLocation,
        postalCode:values.billingAddressPostalCode,
        city:values.billingAddressCity
   } : newDeliveryAddress
    const newCustommer:Custommer = {
        name:values.name,
        deliveryAddress:newDeliveryAddress,
        billingAddress:newBillingAddress,
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
                <Form.Item label="Adresse de livraison" name="deliveryAddressLocation"rules={[{ required: true, message: 'Adresse de livraison' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Code Postal" name="deliveryAddressPostalCode"rules={[{ required: true, message: 'Code postal' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Ville" name="deliveryAddressCity"rules={[{ required: true, message: 'Ville' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Adresse de facturation" name="billingAddressLocation"  >
                    <Input placeholder="Si différente de l'adresse de livraison"/>
                </Form.Item>
                <Form.Item label="Code Postal" name="billingAddressPostalCode"  >
                    <Input placeholder="Si différente de l'adresse de livraison"/>
                </Form.Item>
                <Form.Item label="Ville" name="billingAddressCity"  >
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