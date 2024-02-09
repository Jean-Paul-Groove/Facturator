import { Button, Form, Input, Space, Switch } from "antd";
import Custommer from "../../../../types/Custommer";
import "./EditCustommerForm.css";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type EditCustommerFormProps = {
  custommer: Custommer;
  custommerSetter: React.Dispatch<React.SetStateAction<Custommer>>;
  setFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCustommerForm(props: EditCustommerFormProps) {
  const { custommer, custommerSetter, setFormIsOpen } = props;
  const [newCustommer, setNewCustommer] = useState<Custommer>(custommer);
  const [vatNumberPresent, setVatNumberPresent] = useState<boolean>(
    newCustommer.vatNumber ? true : false
  );
  const [billingAddressDifferent, setBillingAddressDifferent] =
    useState<boolean>(
      newCustommer.deliveryAddress != newCustommer.billingAddress ? true : false
    );
  const [form] = Form.useForm();
  form.setFieldsValue({
    ...newCustommer,
  });
  function handleChange() {
    const values = form.getFieldsValue();

    setNewCustommer({
      name: values.name,
      deliveryAddress: values.deliveryAddress,
      billingAddress: values.billingAddress,
      vatNumber: vatNumberPresent ? values.vatNumber : undefined,
    });
  }
  function handleSubmit() {
    form.validateFields();
    custommerSetter(newCustommer);
    setFormIsOpen(false);
  }
  return (
    <Form
      form={form}
      name="edit-custommer-form"
      onFinish={handleSubmit}
      onChange={handleChange}
      layout="horizontal"
    >
      <Form.Item
        label="Nom"
        name="name"
        rules={[{ required: true, message: "Le nom du client" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Adresse de livraison">
        <Form.Item
          label="Rue"
          name={["deliveryAddress", "location"]}
          rules={[{ required: true, message: "Adresse de livraison" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Code Postal"
          name={["deliveryAddress", "postalCode"]}
          rules={[{ required: true, message: "Code postal" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ville"
          name={["deliveryAddress", "city"]}
          rules={[{ required: true, message: "Ville" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Autre adresse de facturation">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={billingAddressDifferent}
          onChange={(checked) => setBillingAddressDifferent(checked)}
        />
      </Form.Item>

      <Form.Item
        hidden={!billingAddressDifferent}
        label="Adresse de facturation"
      >
        {" "}
        <Form.Item label="Rue" name={["billingAddress", "location"]}>
          <Input placeholder="Si différente de l'adresse de livraison" />
        </Form.Item>
        <Form.Item label="Code Postal" name={["billingAddress", "postalCode"]}>
          <Input placeholder="Si différente de l'adresse de livraison" />
        </Form.Item>
        <Form.Item label="Ville" name={["billingAddress", "city"]}>
          <Input placeholder="Si différente de l'adresse de livraison" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Numéro de TVA" name="vatNumber">
        <Space>
          {" "}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={vatNumberPresent}
            onChange={(checked) => {
              setVatNumberPresent(checked);
              handleChange();
            }}
          />
          {vatNumberPresent && <Input />}{" "}
        </Space>
      </Form.Item>
      <div className="edit-custommer-form-button-container">
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
        <Button type="default" onClick={() => setFormIsOpen(false)}>
          Annuler
        </Button>
      </div>
    </Form>
  );
}

export default EditCustommerForm;
