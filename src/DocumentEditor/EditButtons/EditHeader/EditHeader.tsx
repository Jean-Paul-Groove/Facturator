import { useState } from "react"
import { Button, Modal } from "antd"

type EditHeaderProps = {
    items:string[],
    itemSetter:React.Dispatch<React.SetStateAction<string[]>>
}
function EditHeader(props:EditHeaderProps){
    const [itemListIsVisible, setItemListIsVisible] = useState(false)
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
        const newItems=[...items]
        newItems.push("Lorem ipsum dolor sit amet consectetur adipisicing elit.") 
        itemSetter(newItems);
      };

    return (<><Button type="default" onClick={toggleItemList}>Items</Button>
    <Modal title="Items de la facture" open={itemListIsVisible} onOk={handleOk} onCancel={handleCancel}>
    {items.map((item, index )=> <p key={index+"-item"}>{item}</p>)}
    <Button type="default" onClick={addItem}>+</Button>
    </Modal></>)
}

export default EditHeader