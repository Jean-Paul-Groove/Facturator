import { useState } from "react";
import { Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Logo from "../../../types/Logo";
import "./EditLogo.css";

type EditLogoProps = {
  logo: Logo;
  logoSetter: React.Dispatch<React.SetStateAction<Logo>>;
};
function EditLogo(props: EditLogoProps) {
  const { logo, logoSetter } = props;
  const [logoPickerIsVisible, setLogoPickerIsVisible] = useState(false);
  const [file, setFile] = useState<Logo>(logo);

  const handleOk = () => {
    logoSetter(file);
    setLogoPickerIsVisible(false);
  };

  const handleCancel = () => {
    if (file != logo) {
      setFile(logo);
    }
    setLogoPickerIsVisible(false);
  };
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const url = URL.createObjectURL(event.target.files[0]);
      const name = event.target.files[0].name;
      setFile({ url, name });
    }
  }

  return (
    <>
      <Button
        className="edit-button"
        type="default"
        onClick={() => setLogoPickerIsVisible(true)}
      >
        Logo
      </Button>
      {logoPickerIsVisible && (
        <Modal
          title="Thème"
          open={logoPickerIsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="edit-logo-logopicker-container">
            <div className="edit-logo-logopicker-head">
              <p className="edit-logo-logopicker-title">
                {" "}
                Ajouter votre logo :{" "}
              </p>{" "}
              <Button
                onClick={() => {
                  document
                    .getElementById("edit-logo-logopicker-input")
                    ?.click();
                }}
                icon={<UploadOutlined />}
              >
                <input
                  id="edit-logo-logopicker-input"
                  type="file"
                  name="logoFile"
                  accept="image/*"
                  onChange={(event) => onChange(event)}
                  multiple={false}
                />
                Sélectionner un fichier...
              </Button>
            </div>

            <figure className="edit-logo-figure">
              <img src={file.url} alt={file.name} />
              <figcaption className="edit-logo-figcaption">
                {file.name}
              </figcaption>
            </figure>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditLogo;
