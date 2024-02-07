import { useState } from "react";
import { Button, Modal, ColorPicker } from "antd";
import "./EditTheme.css";
import Theme from "../../../types/Theme";
import { Color } from "antd/es/color-picker";

type EditThemeProps = {
  theme: Theme;
  themeSetter: React.Dispatch<React.SetStateAction<Theme>>;
};
function EditTheme(props: EditThemeProps) {
  const { theme, themeSetter } = props;
  const [themePickerIsVisible, setThemePickerIsVisible] = useState(false);
  const [mainColor, setMainColor] = useState<string>(theme.color);
  const [fontColor, setFontColor] = useState<"white" | "black">(
    theme.fontColor
  );

  function selectFontContrastedColor(rgbString: string): "white" | "black" {
    const blackLum = 0;
    const whiteLum = 1;
    const [r, g, b] = rgbString.split("(")[1].split(")")[0].split(", ");
    const [rLin, gLin, bLin] = [+r, +g, +b].map((value) => {
      const colorChannel = value / 255;
      if (colorChannel <= 0.04045) {
        return colorChannel / 12.92;
      } else {
        return Math.pow((colorChannel + 0.055) / 1.055, 2.4);
      }
    });
    const luminance = rLin * 0.2126 + gLin * 0.7152 + bLin * 0.0722;
    const ratioWithWhite = (whiteLum + 0.05) / (luminance + 0.05);
    const ratioWithBlack = (luminance + 0.05) / (blackLum + 0.05);
    if (ratioWithWhite < ratioWithBlack) {
      return "black";
    } else {
      return "white";
    }
  }
  const handleOk = () => {
    const newTheme: Theme = {
      color: mainColor,
      fontColor: fontColor,
    };
    console.log(newTheme);
    themeSetter(newTheme);
    setThemePickerIsVisible(false);
  };

  const handleCancel = () => {
    setMainColor(theme.color);
    setThemePickerIsVisible(false);
  };
  const handleChange = (color: Color) => {
    setMainColor(color.toRgbString());
    setFontColor(selectFontContrastedColor(color.toRgbString()));
  };

  return (
    <>
      <Button
        block
        className="edit-button"
        type="default"
        onClick={() => setThemePickerIsVisible(true)}
      >
        Thème
      </Button>
      {themePickerIsVisible && (
        <Modal
          title="Thème"
          open={themePickerIsVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="edit-theme-colorpicker-container">
            <p className="edit-theme-colorpicker-title">
              {" "}
              Changer la couleur du thème:{" "}
            </p>
            <ColorPicker
              disabledAlpha
              value={mainColor}
              onChange={handleChange}
              showText
              size="large"
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditTheme;
