import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import InvoiceItem from '../../types/InvoiceItem';
import Custommer from '../../types/Custommer';
import Company from '../../types/Company';
import logo from'../../assets/logo/Poster psyché.jpg'
import Header from '../../types/Header';

type PDFPageProps = {
  items:InvoiceItem[],
  custommer:Custommer,
  company:Company,
  header: Header
}

function PDFPage(props:PDFPageProps){
  Font.register({
    family: "OpenSans", fonts: [
      {src:"/src/assets/fonts/Open_Sans/static/OpenSans-Light.ttf"},
      {src:"/src/assets/fonts/Open_Sans/static/OpenSans-LightItalic.ttf", fontStyle:'italic'},
      {src:"/src/assets/fonts/Open_Sans/static/OpenSans-Regular.ttf", fontWeight: 500},
      {src:"/src/assets/fonts/Open_Sans/static/OpenSans-Medium.ttf", fontWeight: 400},
    ]
  })
const tableHeaderFontColor = "white"
const tableHeaderBackgroundColor = "#BBE2EC"
const generalStyles = StyleSheet.create({
  page:{
  backgroundColor: 'white',
  padding:10,
  paddingBottom: 100,
  fontFamily:'OpenSans',
},
  
})
const headerStyles = StyleSheet.create({
  invoiceInfo:{
    position:"absolute",
    top:45,
    right:10,
    padding:5
  },
  title:{
    position:"absolute",
    top:5,
    right:10,
    fontSize:30,
    fontWeight:500,
    color: tableHeaderBackgroundColor

  },
  invoiceNumber:{
    fontSize:20,
    fontWeight:500
  },
  invoiceDate:{
    fontSize:15
  },
  logo:{
    objectFit:'contain',
    objectPositionX:0
  },
  logoContainer:{
    padding:10,
    maxWidth:300,
    maxHeight:120
  }
})
const companiesStyles = StyleSheet.create({
  companyInfo:{
    position:"absolute",
    top:135,
    left:10,
    padding:4,
    width: "45vw",
    height:"15vh",
    border:"1px solid " + tableHeaderBackgroundColor
  },
  customerInfo:{
    position:"absolute",
    top:135,
    right:10,
    width:"45vw",
    padding:4,
    height:"15vh",
    border:"1px solid "+ tableHeaderBackgroundColor
  },
  title:{
    fontWeight:500
  },
  address:{
    fontSize:15,
    fontWeight:400
  },
  contact:{
    fontStyle:"italic",
    fontSize:12
  },
  legalInfo:{
    fontSize:13
  }
})
const tableStyles = StyleSheet.create({
  table:{
    position:"absolute",
    top:280,
    left:10,
    flexDirection:"column",
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:"center",
    border:"1px solid "+ tableHeaderBackgroundColor,
    borderRadius:"5px"
  },tableRow:{
    flexDirection:"row",
  },headerRow:{
    flexDirection:"row",
    color:tableHeaderFontColor,
    backgroundColor:tableHeaderBackgroundColor,
    fontSize:"12px",
    fontWeight:500
  },
  quantityColumn:{
    borderRight:"1px solid gray",
    width: "2.7cm"
  },
  denominationColumn:{
    borderRight:"1px solid gray",
    width: "5cm"
  },
  priceColumn:{
    borderRight:"1px solid gray",
    width: "2cm"
  },
  reductionColumn:{
    borderRight:"1px solid gray",
    width: "3cm"
  },
  vatColumn:{
    borderRight:"1px solid gray",
    width: "2cm"
  },
   htColumn:{
    borderRight:"1px solid gray",
    width: "2.5cm"
  },
  ttcColumn:{
    width: "2.5cm"
  },
  tableTotal:{
      position:"absolute",
      bottom:-35,
      right:0,
      padding:4,
      minWidth:"15vw",
      flexDirection:"row",
      backgroundColor:tableHeaderBackgroundColor,
      color:tableHeaderFontColor,
      borderBottomRightRadius:"5px",
      borderBottomLeftRadius:"5px"
    },
})


const {items, custommer, company, header}=props

const total = items.reduce((accumulator, currentvalue)=>accumulator + currentvalue.ttc, 0)

    return( 
    <Document pageLayout="singlePage" pageMode="fullScreen">
        <Page size="A4" style={generalStyles.page} orientation='portrait'>
          <View style={headerStyles.logoContainer}>
            <Image src={logo} style={headerStyles.logo}/>
          </View>
          <View style={companiesStyles.companyInfo}>
            <Text style={companiesStyles.title}>{company.name}</Text>
            <View style={companiesStyles.address}>
              <Text>{company.address.location}</Text>
              <Text>{company.address.postalCode} {company.address.city}</Text>
            </View>
            <View style={companiesStyles.legalInfo}>
               <Text>{company.legalReference}</Text>
            {company.vatNumber && <Text>Numéro TVA: {company.vatNumber}</Text>}
            </View>
            <View style={companiesStyles.contact}>
              {company.email && <Text>@: {company.email}</Text>}
              {company.phoneNumber && <Text>Tel: {company.phoneNumber}</Text>}
            </View>
           
          </View>
          <View style={headerStyles.title}>
            <Text>FACTURE</Text>
          </View>
          <View style={headerStyles.invoiceInfo}>
            <Text style={headerStyles.invoiceNumber}>N°: {header.number}</Text>
            <Text style={headerStyles.invoiceDate}>{header.date}</Text>
          </View>
          <View style={companiesStyles.customerInfo}>
            <Text style={companiesStyles.title}>{custommer.name}</Text>
            <View style={companiesStyles.address}>
            {custommer.billingAddress !== custommer.deliveryAddress ?
            <>
            <Text>Adresse de livraison:</Text>
            <Text>{custommer.deliveryAddress.location}</Text>
            <Text>{custommer.deliveryAddress.postalCode} {custommer.deliveryAddress.city}</Text>
            <Text>Adresse de facturation:</Text>
            <Text>{custommer.billingAddress.location}</Text>
            <Text>{custommer.billingAddress.postalCode} {custommer.billingAddress.city}</Text>
            </>: 
            <>
            <Text>{custommer.deliveryAddress.location}</Text>
            <Text>{custommer.deliveryAddress.postalCode} {custommer.deliveryAddress.city}</Text>
            </>
            }
            </View>
          </View>
          <View style={tableStyles.table}>
            <View style={tableStyles.headerRow} >
              <Text style={tableStyles.quantityColumn}>QTé</Text>
              <Text style={tableStyles.denominationColumn}>DESIGNATION</Text>
              <Text style={tableStyles.priceColumn}>PRIX U.</Text>
              <Text style={tableStyles.reductionColumn}>Réduction</Text>
              <Text style={tableStyles.vatColumn}>TVA</Text>
              <Text style={tableStyles.htColumn}>HT</Text>
              <Text style={tableStyles.ttcColumn}>TTC</Text>
            </View>
            {items.map((item, index)=>(
              <View key={'tableLine-'+index} style={tableStyles.tableRow}>
                <Text style={tableStyles.quantityColumn}>{item.quantity}</Text>
                <Text style={tableStyles.denominationColumn}>{item.denomination}</Text>
                <Text style={tableStyles.priceColumn}>{item.price}</Text>
                <Text style={tableStyles.reductionColumn}>{item.reduction != 0 && item.reduction}</Text>
                <Text style={tableStyles.vatColumn}>{item.vatRate != 0 && item.vatRate}</Text>
                <Text style={tableStyles.htColumn}>{item.ht.toFixed(2)}</Text>
                <Text style={tableStyles.ttcColumn}>{item.ttc.toFixed(2)}</Text>
              </View>
            ))}
             
             <View style={tableStyles.tableTotal}>
              <Text>Total: {total.toFixed(2)} €</Text>
             </View>
          </View>
          
          
        </Page>
    </Document>)
}

export default PDFPage