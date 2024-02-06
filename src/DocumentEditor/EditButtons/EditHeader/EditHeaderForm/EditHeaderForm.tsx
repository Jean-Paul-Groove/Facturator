import { Button, Form, Input } from "antd";
import Header from "../../../../types/Header";
import { DatePicker } from "antd";
import dayjs from "dayjs";

type EditCustommerFormProps = {
  header: Header;
  headerSetter: React.Dispatch<React.SetStateAction<Header>>;
  setFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function EditHeaderForm(props: EditCustommerFormProps) {
  const { header, headerSetter, setFormIsOpen } = props;
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  form.setFieldsValue({
    number: header.number,
    date: dayjs(header.date, dateFormat),
  });

  function handleSubmit() {
    const values = form.getFieldsValue();
    const newDateString = dayjs(values.date).format(dateFormat);
    const newHeader: Header = {
      number: values.number,
      date: newDateString,
    };
    headerSetter(newHeader);
    setFormIsOpen(false);
  }
  return (
    <Form form={form} name="edit-header-form" onFinish={handleSubmit}>
      <Form.Item
        label="Numéro de la facture"
        name="number"
        rules={[{ required: true, message: "Le numéro de la facture" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date de facturation"
        name="date"
        rules={[{ required: true, message: "La date de facturation" }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <div className="edit-custommer-form-button-container">
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

export default EditHeaderForm;
