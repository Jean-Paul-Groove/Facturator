import { useState } from "react";
import { Alert, Button, Modal } from "antd";
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
  const handleOk = () => {
    logoSetter(file);
    setLogoPickerIsVisible(false);
  };

  const handleCancel = () => {
    setErrorMessage(undefined);
    if (file != logo) {
      setFile(logo);
    }
    setLogoPickerIsVisible(false);
  };
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!event.target.files) {
        throw new Error("Une erreur est survenue, veuillez réessayer");
      }
      const file = event.target.files[0];
      if (!acceptedFormats.includes(file.type)) {
        throw new Error("Seuls les formats PNG, JPEG et JPG sont acceptés");
      }
      if (file.size > 5000000) {
        throw new Error("La taille du fichier dépasse 5 Mo");
      }

      const url = URL.createObjectURL(file);
      const name = event.target.files[0].name;
      setFile({ url, name });
      setErrorMessage(undefined);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  }

  return (
    <>
      <Button
        block
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
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => onChange(event)}
                  multiple={false}
                />
                Sélectionner un fichier...
              </Button>
            </div>
            <p className="edit-logo-info">
              Fichier ".png", ".jpg" ou ".jpeg" de moins de 5 Mo
            </p>
            {errorMessage ? (
              <Alert
                className="edit-logo-error"
                message={errorMessage}
                type="error"
              />
            ) : (
              <figure className="edit-logo-figure">
                <img src={file.url} alt={file.name} />
                <figcaption className="edit-logo-figcaption">
                  {file.name}
                </figcaption>
              </figure>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditLogo;
