import { useState } from "react";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Header from "../../../types/Header";
import EditHeaderForm from "./EditHeaderForm/EditHeaderForm";
import "./EditHeader.css";

type EditHeaderProps = {
  header: Header;
  headerSetter: React.Dispatch<React.SetStateAction<Header>>;
};
function EditHeader(props: EditHeaderProps) {
  const [headerInfoIsVisible, setHeaderInfoisVisible] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const { header, headerSetter } = props;

  const handleOk = () => {
    setHeaderInfoisVisible(false);
  };

  const handleCancel = () => {
    setFormIsOpen(false);
    setHeaderInfoisVisible(false);
  };

  return (
    <>
      <Button
        className="edit-button"
        type="default"
        onClick={() => setHeaderInfoisVisible(true)}
      >
        En-tête
      </Button>
      {headerInfoIsVisible && (
        <Modal
          title="Informations de la facture"
          open={headerInfoIsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {formIsOpen ? (
            <EditHeaderForm
              header={header}
              headerSetter={headerSetter}
              setFormIsOpen={setFormIsOpen}
            />
          ) : (
            <div>
              <div className="edit-header-openForm-button">
                <Button type="default" onClick={() => setFormIsOpen(true)}>
                  <EditOutlined />
                </Button>
              </div>
              <p>Numéro de la facture: {header.number}</p>
              <p>Date: {header.date}</p>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default EditHeader;
