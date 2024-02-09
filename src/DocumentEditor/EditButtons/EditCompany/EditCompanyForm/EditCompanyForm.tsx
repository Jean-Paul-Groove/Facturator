import { Button, Form, Input, Switch } from "antd";
import Company from "../../../../types/Company";
import "./EditCompanyForm.css";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

type EditCompanyFormProps = {
  company: Company;
  companySetter: React.Dispatch<React.SetStateAction<Company>>;
  setFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCompanyForm(props: EditCompanyFormProps) {
  const { company, companySetter, setFormIsOpen } = props;
  const [form] = Form.useForm();
  const [newCompany, setNewCompany] = useState<Company>(company);
  form.setFieldsValue({ ...newCompany });
  function handleSubmit() {
    companySetter(newCompany);
    setFormIsOpen(false);
  }
  function handleChange() {
    const values = form.getFieldsValue();
    console.log(values.vat);
    setNewCompany({
      name: values.name,
      address: values.address,
      legalReference: values.legalReference,
      phoneNumber: values.phoneNumber,
      email: values.email,
      vat: values.vat,
      vatNumber: values.vat ? values.vatNumber : undefined,
    });
  }
  return (
    <Form
      onChange={handleChange}
      form={form}
      name="edit-company-form"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Nom"
        name="name"
        rules={[{ required: true, message: "Raison sociale" }]}
      >
        <Input />
      </Form.Item>
      <FormItem label={"Adresse"}>
        {" "}
        <Form.Item
          label="Rue"
          name={["address", "location"]}
          rules={[{ required: true, message: "Adresse de livraison" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Code Postal"
          name={["address", "postalCode"]}
          rules={[{ required: true, message: "Code postal" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ville"
          name={["address", "city"]}
          rules={[{ required: true, message: "Ville" }]}
        >
          <Input />
        </Form.Item>
      </FormItem>

      <Form.Item label="Téléphone" name="phoneNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item
        label="Immatriculation"
        name="legalReference"
        rules={[{ required: true, message: "Immatriculation SIREN/SIRET" }]}
      >
        <Input placeholder="SIRET : 01234567891234" />
      </Form.Item>
      <Form.Item label="TVA applicable" name="vat" valuePropName="checked">
        <Switch
          onChange={handleChange}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      {newCompany.vat && (
        <Form.Item
          label="Numéro de TVA"
          name="vatNumber"
          rules={[{ required: true, message: "N° de TVA" }]}
        >
          <Input />
        </Form.Item>
      )}

      <div className="edit-company-form-button-container">
        {" "}
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

export default EditCompanyForm;
