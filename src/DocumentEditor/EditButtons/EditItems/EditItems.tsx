import { useState } from "react"
import { Button, Modal } from "antd"
import InvoiceItem from "../../../types/InvoiceItem"
import EditItemForm from "./EditItemForm"
import { EditOutlined } from "@ant-design/icons"
import './EditItem.css'

type EditItemProps = {
    items:InvoiceItem[],
    itemSetter:React.Dispatch<React.SetStateAction<InvoiceItem[]>>
}
function EditItems(props:EditItemProps){

    const [itemListIsVisible, setItemListIsVisible] = useState(false)
    const [openItemForm, setOpenItemForm] = useState(false)
    const [typeOfForm, setTypeOfForm] = useState<'new'|'edit'>('new')
    const [itemIndex, setItemIndex] = useState<number |undefined>(undefined)
    const {items, itemSetter} =props


    function toggleItemList(){
        setItemListIsVisible(!itemListIsVisible)
    }
    const handleOk = () => {
        setItemListIsVisible(false);
      };
    
      const handleCancel = () => {
        setItemListIsVisible(false);
      };
      const addItem = () => {
        setTypeOfForm('new')
        setItemIndex(undefined)
        setOpenItemForm(true)
      };
      const editItem = (index:number) => {
        if(items[index]){
          setTypeOfForm('edit')
          setItemIndex(index)
          setOpenItemForm(true)
        }else{
          console.log("Error: no item with such index")
        }
      };
      const deleteItem = (index:number) => {
        const newItems = [...items]
        newItems.splice(index, 1)
        itemSetter(newItems)
      };


    return (<><Button type="default" onClick={toggleItemList}>Items</Button>
    <Modal title="Items de la facture" open={itemListIsVisible} onOk={handleOk} onCancel={handleCancel}>
    {items.map((item, index )=> (
      <div className="edit-item-line" key={index+"-item"}>
        <p >{item.denomination}</p>
        <p >{item.ttc} €</p>
        <div className="edit-item-line-button-container">
          <Button type="default" onClick={()=>deleteItem(index)}>
          X
        </Button>
        <Button type="default" onClick={()=>editItem(index)}>
        <EditOutlined />
        </Button></div>
        
      </div>))}
      <div className="edit-item-addButton-container"> <Button shape="circle"  type="default" onClick={addItem}>+</Button></div>
   
    <EditItemForm itemList={items} setItemList={itemSetter} typeOfForm={typeOfForm} setModalOpen={setOpenItemForm} isModalOpen={openItemForm} index={itemIndex}/>
    </Modal></>)
}

export default EditItems