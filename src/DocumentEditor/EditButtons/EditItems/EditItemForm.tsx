import { Modal, Form, Input, InputNumber } from "antd"
import InvoiceItem from "../../../types/InvoiceItem"
import { useState } from "react"



type EditItemFormProps = {
    typeOfForm : 'new'|'edit',
    isModalOpen:boolean,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    itemList:InvoiceItem[],
    setItemList:React.Dispatch<React.SetStateAction<InvoiceItem[]>>,
    index? : number,
}
function EditItemForm(props:EditItemFormProps){
    const {itemList, typeOfForm, isModalOpen, setModalOpen,setItemList, index} = props
    const [form] = Form.useForm()
    let item;
    const blankItem = {
        denomination:'',
         quantity:0,
         price:0,
         vatRate:0,
         reduction:0,
          ht:0,
          ttc : 0
    }

    if(typeof index === 'number'){
        item = itemList[index]
        if(!item){
        console.log("Error: pas d'item avec cet index")   
        setModalOpen(false)
        } 
    }else{
        item = blankItem
    }
    const [itemToEdit, setItemToEdit] = useState(item)
    form.setFieldValue('denomination', itemToEdit.denomination)
    form.setFieldValue('quantity', itemToEdit.quantity)
    form.setFieldValue('price', itemToEdit.price)
    form.setFieldValue('reduction', itemToEdit.reduction)
    form.setFieldValue('vatRate', itemToEdit.vatRate)
    function handleSubmit(type: EditItemFormProps["typeOfForm"]){
        const newItem = {
            denomination:itemToEdit.denomination,
             quantity:itemToEdit.quantity,
             price:itemToEdit.price,
             reduction:itemToEdit.reduction,
             vatRate:itemToEdit.vatRate,
             ht:itemToEdit.quantity*itemToEdit.price*(1-itemToEdit.reduction/100),
             ttc:itemToEdit.quantity*itemToEdit.price*(1-itemToEdit.reduction/100)*(1+itemToEdit.vatRate/100)
            }
        const newItemList =[... itemList]
        if(type ==='new'){
            newItemList.push(newItem)
            setItemList(newItemList)
            setModalOpen(false)
        }
        if(type ==='edit'){
            if(typeof index === 'number' && newItemList[index]){
                newItemList[index]=newItem
                setItemList(newItemList)
            }else{
                console.log("Error: This Item can not be modified")
            }
            setModalOpen(false)
        }
    }
    function calculateTotal(){
        const formValues = form.getFieldsValue()
        const total = formValues.quantity*formValues.price*(1-formValues.reduction/100)*(1+formValues.vatRate/100)
       return total
    }
   function handleCancel(){
        setModalOpen(false)
    }
    return (
        <Modal title={itemToEdit.denomination ? itemToEdit.denomination: "Nouvel item"}open={isModalOpen} onCancel={handleCancel} onOk={()=>handleSubmit(typeOfForm)}>
            <Form
            form={form}
            name="edit-item-form" onFinish={()=>handleSubmit(typeOfForm)}>
                <Form.Item label="Dénomination" name="denomination"rules={[{ required: true, message: 'Le nom du produit' }]} >
                    <Input onChange={({target})=>setItemToEdit({...itemToEdit,denomination:target.value})}/>
                </Form.Item>
                <Form.Item label="Quantité" name="quantity"rules={[{ required: true, message: 'Quantité du produit' }]} >
                    <InputNumber onChange={(e)=>{setItemToEdit({...itemToEdit,quantity:e?+e?.valueOf():0, ttc: calculateTotal()})}}/>
                </Form.Item>
                <Form.Item label="Prix Unitaire en €" name="price"rules={[{ required: true, message: 'Le prix unitaire du produit' }]} >
                    <InputNumber  onChange={(e)=>setItemToEdit({...itemToEdit,price:e?+e?.valueOf():0, ttc: calculateTotal()})}/>
                </Form.Item>
                <Form.Item label="Réduction en %" name="reduction"rules={[{ required: true, message: 'Une éventuelle réduction' }]} >
                    <InputNumber  onChange={(e)=>setItemToEdit({...itemToEdit,reduction:e?+e?.valueOf():0, ttc: calculateTotal()})}/>
                </Form.Item>
                <Form.Item label="Taux TVA en %" name="vatRate"rules={[{ required: true, message: 'Le taux de TVA' }]} >
                    <InputNumber  onChange={(e)=>setItemToEdit({...itemToEdit,vatRate:e?+e?.valueOf():0, ttc: calculateTotal()})}/>
                </Form.Item>
                <p>Total: {itemToEdit.ttc} €</p>
            </Form>
        </Modal>
    )
}

export default EditItemForm