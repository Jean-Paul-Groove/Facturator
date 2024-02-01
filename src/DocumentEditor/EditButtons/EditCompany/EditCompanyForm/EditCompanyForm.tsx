import { Button, Form, Input } from "antd"
import Company from "../../../../types/Company"
import Address from "../../../../types/Address"
import './EditCompanyForm.css'


type EditCompanyFormProps = {
    company:Company,
    companySetter:React.Dispatch<React.SetStateAction<Company>>,
    setFormIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

function EditCompanyForm(props: EditCompanyFormProps){
    const {company, companySetter, setFormIsOpen} = props
    const [form] = Form.useForm()
    form.setFieldsValue({
        name:company.name,
        legalReference:company.legalReference,
        vatNumber:company.vatNumber
    })
    form.setFieldsValue({
        email:company.email,
        phoneNumber:company.phoneNumber,
    })
    form.setFieldsValue({
        companyAddressLocation:company.address.location,
        companyAddressPostalCode:company.address.postalCode,
        companyAddressCity:company.address.city
    })
    
    function handleSubmit(){
       const values = form.getFieldsValue()
       const newAddress:Address ={
            location:values.companyAddressLocation,
            postalCode:values.companyAddressPostalCode,
            city:values.companyAddressCity
       }
        const newCompany:Company = {
            name:values.name,
            address:newAddress,
            legalReference:values.legalReference,
            phoneNumber:values.phoneNumber,
            email:values.email,
            vatNumber:values.vatNumber,
            
        }
        
        companySetter(newCompany)
        console.log(company)
        setFormIsOpen(false)
    }
    return(
             <Form
                form={form}
                name="edit-company-form" onFinish={handleSubmit}>
                    <Form.Item label="Nom" name="name"rules={[{ required: true, message: 'Raison sociale' }]} >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Adresse" name="companyAddressLocation"rules={[{ required: true, message: 'Adresse de livraison' }]} >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Code Postal" name="companyAddressPostalCode"rules={[{ required: true, message: 'Code postal' }]} >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Ville" name="companyAddressCity"rules={[{ required: true, message: 'Ville' }]} >
                        <Input/>
                    </Form.Item> 
                    <Form.Item label="Téléphone" name="phoneNumber"  >
                        <Input />
                    </Form.Item> 
                    <Form.Item label="Email" name="email"  >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Immatriculation" name="legalReference" rules={[{ required: true, message: 'Immatriculation SIREN/SIRET' }]} >
                        <Input placeholder="SIRET : 01234567891234"/>
                    </Form.Item>
                    <Form.Item label="Numéro de TVA" name="vatNumber"  >
                        <Input />
                    </Form.Item>
                    <div className="edit-company-form-button-container"> <Button  type="primary" htmlType="submit">Valider</Button>
                    <Button  type="default" onClick={()=> setFormIsOpen(false)}>Annuler</Button></div>
                   
        </Form>
    )

}

export default EditCompanyForm