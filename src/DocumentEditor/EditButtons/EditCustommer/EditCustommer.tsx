import { useState } from "react";
import { Button, Modal } from "antd";
import Custommer from "../../../types/Custommer";
import { EditOutlined } from "@ant-design/icons";
import EditCustommerForm from "./EditCustommerForm/EditCustommerForm";
import "./EditCustommer.css";

type EditCustommerProps = {
  custommer: Custommer;
  custommerSetter: React.Dispatch<React.SetStateAction<Custommer>>;
};
function EditCustommer(props: EditCustommerProps) {
  const [custommerInfoIsVisible, setCustommerInfoisVisible] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const { custommer, custommerSetter } = props;

  const handleOk = () => {
    setCustommerInfoisVisible(false);
  };

  const handleCancel = () => {
    setFormIsOpen(false);
    setCustommerInfoisVisible(false);
  };

  return (
    <>
      <Button
        block
        className="edit-button"
        type="default"
        onClick={() => setCustommerInfoisVisible(true)}
      >
        Client
      </Button>
      {custommerInfoIsVisible && (
        <Modal
          title="Informations du client"
          open={custommerInfoIsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {formIsOpen ? (
            <EditCustommerForm
              custommer={custommer}
              custommerSetter={custommerSetter}
              setFormIsOpen={setFormIsOpen}
            />
          ) : (
            <div>
              <div className="edit-custommer-openForm-button">
                <Button type="default" onClick={() => setFormIsOpen(true)}>
                  <EditOutlined />
                </Button>
              </div>
              <div>
                <p className="edit-custommer-name">{custommer.name}</p>
                <div className="edit-custommer-address-section">
                  <div>
                    <p className="edit-custommer-address-section-title">
                      Adresse de livraison:{" "}
                    </p>
                    <p>{custommer.deliveryAddress.location}</p>
                    <p>
                      {custommer.deliveryAddress.postalCode}
                      {", "}
                      {custommer.deliveryAddress.city}
                    </p>
                  </div>
                  {custommer.billingAddress !== custommer.deliveryAddress && (
                    <div>
                      <p className="edit-custommer-address-section-title">
                        Adresse de facturation:{" "}
                      </p>
                      <p>{custommer.billingAddress.location} </p>
                      <p>
                        {custommer.billingAddress.postalCode}
                        {", "}
                        {custommer.billingAddress.city}{" "}
                      </p>
                    </div>
                  )}
                </div>
                {custommer.vatNumber && <p>TVA: {custommer.vatNumber}</p>}
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default EditCustommer;
