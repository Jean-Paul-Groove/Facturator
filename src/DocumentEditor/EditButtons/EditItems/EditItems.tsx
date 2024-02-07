import { useState } from "react";
import { Button, Modal } from "antd";
import InvoiceItem from "../../../types/InvoiceItem";
import EditItemForm from "./EditItemForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./EditItem.css";

type EditItemProps = {
  items: InvoiceItem[];
  itemSetter: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
};
function EditItems(props: EditItemProps) {
  const { items, itemSetter } = props;
  const [itemListIsVisible, setItemListIsVisible] = useState(false);
  const [openItemForm, setOpenItemForm] = useState(false);
  const [typeOfForm, setTypeOfForm] = useState<"new" | "edit">("new");
  const [itemIndex, setItemIndex] = useState<number | undefined>(undefined);
  const [newItemList, setNewItemList] = useState<InvoiceItem[]>(items);

  function toggleItemList() {
    setItemListIsVisible(!itemListIsVisible);
  }
  const handleOk = () => {
    itemSetter(newItemList);
    setItemListIsVisible(false);
  };

  const handleCancel = () => {
    setNewItemList(items);
    setItemListIsVisible(false);
  };
  const addItem = () => {
    setTypeOfForm("new");
    setItemIndex(undefined);
    setOpenItemForm(true);
  };
  const editItem = (index: number) => {
    if (items[index]) {
      setTypeOfForm("edit");
      setItemIndex(index);
      setOpenItemForm(true);
    } else {
      console.log("Error: no item with such index");
    }
  };
  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setNewItemList(newItems);
  };

  return (
    <>
      <Button
        block
        className="edit-button"
        type="default"
        onClick={toggleItemList}
      >
        Items
      </Button>
      <Modal
        title="Items de la facture"
        open={itemListIsVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {newItemList.map((item, index) => (
          <div className="edit-item-line" key={index + "-item"}>
            <p>{item.denomination}</p>
            <p>{item.ttc.toFixed(2)} €</p>
            <div className="edit-item-line-button-container">
              <Button
                type="default"
                onClick={() => deleteItem(index)}
                icon={<DeleteOutlined />}
                shape="circle"
              />

              <Button
                type="default"
                onClick={() => editItem(index)}
                shape="circle"
                icon={<EditOutlined />}
              />
            </div>
          </div>
        ))}
        <div className="edit-item-addButton-container">
          {" "}
          <Button shape="circle" type="default" onClick={addItem}>
            +
          </Button>
        </div>
        <div className="edit-item-modal-buttons-container">
          <Button type="primary" onClick={() => handleOk()}>
            Valider
          </Button>
          <Button type="default" onClick={() => handleCancel()}>
            Annuler
          </Button>
        </div>

        {openItemForm && (
          <EditItemForm
            itemList={newItemList}
            setItemList={setNewItemList}
            typeOfForm={typeOfForm}
            setModalOpen={setOpenItemForm}
            isModalOpen={openItemForm}
            index={itemIndex}
          />
        )}
      </Modal>
    </>
  );
}

export default EditItems;
