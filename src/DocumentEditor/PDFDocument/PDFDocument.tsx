import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import InvoiceItem from "../../types/InvoiceItem";
import Custommer from "../../types/Custommer";
import Company from "../../types/Company";
import Header from "../../types/Header";
import Theme from "../../types/Theme";
import Logo from "../../types/Logo";

type PDFDocumentProps = {
  items: InvoiceItem[];
  custommer: Custommer;
  company: Company;
  header: Header;
  theme: Theme;
  logo: Logo;
};

function PDFDocument(props: PDFDocumentProps) {
  const { items, custommer, company, header, theme, logo } = props;
  Font.register({
    family: "OpenSans",
    fonts: [
      { src: "/src/assets/fonts/Open_Sans/static/OpenSans-Light.ttf" },
      {
        src: "/src/assets/fonts/Open_Sans/static/OpenSans-LightItalic.ttf",
        fontStyle: "italic",
      },
      {
        src: "/src/assets/fonts/Open_Sans/static/OpenSans-Regular.ttf",
        fontWeight: 500,
      },
      {
        src: "/src/assets/fonts/Open_Sans/static/OpenSans-Medium.ttf",
        fontWeight: 400,
      },
    ],
  });

  const generalStyles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: "150 10 20 10",
      fontFamily: "OpenSans",
    },
  });
  const headerStyles = StyleSheet.create({
    invoiceInfo: {
      position: "absolute",
      top: 5,
      right: 10,
      padding: 5,
    },
    title: {
      fontSize: 30,
      fontWeight: 500,
      color: theme.color,
    },
    invoiceNumber: {
      fontSize: 20,
      fontWeight: 500,
    },
    invoiceDate: {
      fontSize: 15,
    },
    logo: {
      objectFit: "contain",
      objectPositionX: 0,
    },
    logoContainer: {
      position: "absolute",
      top: 10,
      left: 10,
      width: 300,
      height: 120,
    },
  });
  const companiesStyles = StyleSheet.create({
    companiesView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    companiesInfo: {
      padding: 4,
      width: "45vw",
      height: "100%",
      border: "1px solid " + theme.color,
    },
    title: {
      fontWeight: 500,
    },
    address: {
      fontSize: 15,
      fontWeight: 400,
    },
    contact: {
      fontWeight: "bold",
      fontSize: 12,
    },
    legalInfo: {
      fontSize: 13,
      fontWeight: 500,
    },
  });
  const tableStyles = StyleSheet.create({
    table: {
      flexDirection: "column",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 60,
      textAlign: "center",
      border: "1px solid " + theme.color,
      borderRadius: "5px",
    },
    tableRow: {
      flexDirection: "row",
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      color: theme.fontColor,
      backgroundColor: theme.color,
      fontSize: "12px",
      fontWeight: 500,
      padding: "2 0",
    },
    quantityColumn: {
      borderRight: "1px solid gray",
      width: "2.7cm",
    },
    denominationColumn: {
      borderRight: "1px solid gray",
      width: "5cm",
    },
    priceColumn: {
      borderRight: "1px solid gray",
      width: "2.5cm",
    },
    reductionColumn: {
      borderRight: "1px solid gray",
      width: "2cm",
    },
    vatColumn: {
      borderRight: "1px solid gray",
      width: "2cm",
    },
    dateColumn: {
      borderRight: "1px solid gray",
      width: "3cm",
    },
    ttcColumn: {
      width: "2.5cm",
    },
    tableTotal: {
      position: "absolute",
      top: "100%",
      right: 0,
      padding: 4,
      minWidth: "15vw",
      backgroundColor: theme.color,
      color: theme.fontColor,
      borderBottomRightRadius: "5px",
      borderBottomLeftRadius: "5px",
      display: "flex",
      flexDirection: "column",
    },
  });
  const footerStyles = StyleSheet.create({
    pageNumber: {
      position: "absolute",
      bottom: 5,
      right: 10,
      fontSize: 10,
    },
    paymentFailure: {
      fontSize: 12,
    },
  });
  const total = items.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue.ttc,
    0
  );
  const totalHt = company.vat
    ? items.reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.quantity *
            currentValue.price *
            (1 - currentValue.reduction / 100),
        0
      )
    : undefined;
  const legalNoVat = "TVA non applicable - article 293 B du CGI";
  const legalPaymentFailure =
    "Conformément à l’article L.441-6 du Code de commerce, en cas de retard de paiement, le client est de plein droit débiteur, en plus d'une pénalité de retard calculée au taux d’intérêt appliqué par la Banque centrale européenne à son opération de refinancement la plus récente majoré de 10 points de pourcentage, d'une indemnité forfaitaire pour frais de recouvrement d’un montant de 40 €.";

  return (
    <Document pageLayout="singlePage" pageMode="fullScreen">
      <Page size="A4" style={generalStyles.page} orientation="portrait">
        <View fixed style={headerStyles.logoContainer}>
          <Image src={logo.url} style={headerStyles.logo} />
        </View>
        <View fixed style={headerStyles.invoiceInfo}>
          <Text style={headerStyles.title}>FACTURE</Text>
          <Text style={headerStyles.invoiceNumber}>N°: {header.number}</Text>
          <Text style={headerStyles.invoiceDate}>{header.date}</Text>
        </View>
        <View style={companiesStyles.companiesView}>
          <View style={companiesStyles.companiesInfo}>
            <Text style={companiesStyles.title}>{company.name}</Text>
            <View style={companiesStyles.address}>
              <Text>{company.address.location}</Text>
              <Text>
                {company.address.postalCode}, {company.address.city}
              </Text>
            </View>
            <View style={companiesStyles.legalInfo}>
              <Text>{company.legalReference}</Text>
              {company.vatNumber ? (
                <Text>Numéro TVA: {company.vatNumber}</Text>
              ) : (
                <Text>{legalNoVat}</Text>
              )}
            </View>
            <View style={companiesStyles.contact}>
              {company.email && <Text>email : {company.email}</Text>}
              {company.phoneNumber && <Text>Tel : {company.phoneNumber}</Text>}
            </View>
          </View>
          <View style={companiesStyles.companiesInfo}>
            <Text style={companiesStyles.title}>{custommer.name}</Text>
            <View style={companiesStyles.address}>
              {custommer.billingAddress !== custommer.deliveryAddress ? (
                <>
                  <Text>Adresse de livraison:</Text>
                  <Text>{custommer.deliveryAddress.location}</Text>
                  <Text>
                    {custommer.deliveryAddress.postalCode}
                    {", "}
                    {custommer.deliveryAddress.city}
                  </Text>
                  <Text>Adresse de facturation:</Text>
                  <Text>{custommer.billingAddress.location}</Text>
                  <Text>
                    {custommer.billingAddress.postalCode}
                    {", "}
                    {custommer.billingAddress.city}
                  </Text>
                </>
              ) : (
                <>
                  <Text>{custommer.deliveryAddress.location}</Text>
                  <Text>
                    {custommer.deliveryAddress.postalCode}
                    {", "}
                    {custommer.deliveryAddress.city}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={tableStyles.table}>
          <View fixed style={tableStyles.headerRow}>
            <Text style={tableStyles.quantityColumn}>QTÉ</Text>
            <Text style={tableStyles.denominationColumn}>DESIGNATION</Text>
            <Text style={tableStyles.priceColumn}>
              {`PRIX
              UNIT.`}
            </Text>
            <Text style={tableStyles.reductionColumn}>RÉDUCTION</Text>
            <Text style={tableStyles.vatColumn}>TVA</Text>
            <Text style={tableStyles.dateColumn}>
              {`DATE
              JJ.MM.AA`}
            </Text>
            <Text style={tableStyles.ttcColumn}>TTC</Text>
          </View>
          {items.map((item, index) => (
            <View key={"tableLine-" + index} style={tableStyles.tableRow}>
              <Text style={tableStyles.quantityColumn}>{item.quantity}</Text>
              <Text style={tableStyles.denominationColumn}>
                {item.denomination}
              </Text>
              <Text style={tableStyles.priceColumn}>{item.price}</Text>
              <Text style={tableStyles.reductionColumn}>
                {item.reduction != 0 ? item.reduction : "/"}
              </Text>
              <Text style={tableStyles.vatColumn}>
                {item.vatRate != 0 ? item.vatRate : "/"}
              </Text>
              <Text style={tableStyles.dateColumn}>{item.date}</Text>
              <Text style={tableStyles.ttcColumn}>{item.ttc.toFixed(2)}€</Text>
            </View>
          ))}

          <View style={tableStyles.tableTotal}>
            {totalHt && <Text>Total HT: {totalHt.toFixed(2)} €</Text>}
            <Text>Total TTC: {total.toFixed(2)} €</Text>
          </View>
        </View>
        <Text style={footerStyles.paymentFailure} wrap={false}>
          {legalPaymentFailure}
        </Text>
        <Text
          style={footerStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

export default PDFDocument;
