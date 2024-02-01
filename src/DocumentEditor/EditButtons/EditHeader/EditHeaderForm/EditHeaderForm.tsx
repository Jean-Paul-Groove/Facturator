import { Button, Form, Input } from "antd"
import Header from "../../../../types/Header"

type EditCustommerFormProps = {
    header:Header,
    headerSetter:React.Dispatch<React.SetStateAction<Header>>,
    setFormIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

function EditHeaderForm(props: EditCustommerFormProps){
    const {header, headerSetter, setFormIsOpen} = props
const [form] = Form.useForm()
form.setFieldsValue({
    number:header.number,
    date:header.date
})
function handleSubmit(){
   const values = form.getFieldsValue()
   const newHeader: Header = {
    number:values.number,
    date: values.date
   }
   headerSetter(newHeader)
   setFormIsOpen(false)
}
return(
         <Form
            form={form}
            name="edit-header-form" onFinish={handleSubmit}>
                <Form.Item label="Numéro de la facture" name="number"rules={[{ required: true, message: 'Le numéro de la facture' }]} >
                    <Input/>
                </Form.Item>
                <Form.Item label="Date de facturation" name="date"rules={[{ required: true, message: 'La date de facturation' }]} >
                    <Input/>
                </Form.Item>
                <div className="edit-custommer-form-button-container"> <Button  type="primary" htmlType="submit">Valider</Button>
                <Button  type="default" onClick={()=> setFormIsOpen(false)}>Annuler</Button></div>
               
    </Form>
)
}

export default EditHeaderForm