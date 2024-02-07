import { PDFDownloadLink } from "@react-pdf/renderer";
import { Menu, Button, MenuProps, Drawer } from "antd";
import EditCompany from "../EditButtons/EditCompany/EditCompany";
import EditCustommer from "../EditButtons/EditCustommer/EditCustommer";
import EditHeader from "../EditButtons/EditHeader/EditHeader";
import EditItems from "../EditButtons/EditItems/EditItems";
import EditLogo from "../EditButtons/EditLogo/EditLogo";
import EditTheme from "../EditButtons/EditTheme/EditTheme";
import PDFDocument from "../PDFPage/PDFDocument";
import Custommer from "../../types/Custommer";
import InvoiceItem from "../../types/InvoiceItem";
import Company from "../../types/Company";
import Logo from "../../types/Logo";
import Header from "../../types/Header";
import Theme from "../../types/Theme";
import { EditFilled } from "@ant-design/icons";
import "./EditMenu.css";
import { useState } from "react";

type EditMenuProps = {
  editHeader: {
    header: Header;
    setHeader: React.Dispatch<React.SetStateAction<Header>>;
  };
  editCompany: {
    company: Company;
    setCompany: React.Dispatch<React.SetStateAction<Company>>;
  };
  editCustommer: {
    custommer: Custommer;
    setCustommer: React.Dispatch<React.SetStateAction<Custommer>>;
  };
  editItems: {
    itemList: InvoiceItem[];
    setItemList: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  };
  editTheme: {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  };
  editLogo: { logo: Logo; setLogo: React.Dispatch<React.SetStateAction<Logo>> };
  drawer?: boolean;
};

function EditMenu(props: EditMenuProps) {
  const {
    editHeader,
    editCompany,
    editCustommer,
    editItems,
    editTheme,
    editLogo,
    drawer,
  } = props;

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <EditHeader
          header={editHeader.header}
          headerSetter={editHeader.setHeader}
        />
      ),
    },
    {
      key: "2",
      label: (
        <EditCompany
          company={editCompany.company}
          companySetter={editCompany.setCompany}
        />
      ),
    },
    {
      key: "3",
      label: (
        <EditCustommer
          custommer={editCustommer.custommer}
          custommerSetter={editCustommer.setCustommer}
        />
      ),
    },
    {
      key: "4",
      label: (
        <EditItems
          items={editItems.itemList}
          itemSetter={editItems.setItemList}
        />
      ),
    },
    {
      key: "5",
      label: (
        <EditTheme theme={editTheme.theme} themeSetter={editTheme.setTheme} />
      ),
    },
    {
      key: "6",
      label: <EditLogo logo={editLogo.logo} logoSetter={editLogo.setLogo} />,
    },
    {
      key: "7",
      label: (
        <Button block type="primary" className="edit-button">
          {" "}
          <PDFDownloadLink
            document={
              <PDFDocument
                theme={editTheme.theme}
                header={editHeader.header}
                company={editCompany.company}
                items={editItems.itemList}
                custommer={editCustommer.custommer}
                logo={editLogo.logo}
              />
            }
          >
            Télécharger
          </PDFDownloadLink>
        </Button>
      ),
    },
  ];
  const [drawerIsVisible, setDrawerVisible] = useState<boolean>(false);
  return drawer ? (
    <>
      <Button
        className="edit-menu-dropdown-button "
        type="text"
        size="large"
        icon={<EditFilled />}
        onClick={() => setDrawerVisible(!drawerIsVisible)}
      >
        {" "}
        Menu
      </Button>
      <Drawer
        title="Personnalisez votre facture: "
        placement="left"
        open={drawerIsVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <Menu mode="vertical" selectable={false} items={menuItems} />
      </Drawer>
    </>
  ) : (
    <Menu mode="vertical" selectable={false} items={menuItems} />
  );
}

export default EditMenu;
