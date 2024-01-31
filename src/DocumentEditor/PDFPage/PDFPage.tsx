import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceItem from '../../types/InvoiceItem';
import Custommer from '../../types/Custommer';

type PDFPageProps = {
  items:InvoiceItem[],
  custommer:Custommer
}

function PDFPage(props:PDFPageProps){
const tableHeaderFontColor = "white"
const tableHeaderBackgroundColor = "blue"
const styles = StyleSheet.create({
    page:{
    backgroundColor: 'white',
    padding:10
  },
  table:{
    position:"absolute",
    top:280,
    left:10,
    flexDirection:"column",
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:"center",
    border:"1px solid blue",
    borderRadius:"5px"
  },tableRow:{
    flexDirection:"row",
  },headerRow:{
    flexDirection:"row",
    color:tableHeaderFontColor,
    backgroundColor:tableHeaderBackgroundColor,
    fontSize:"12px",
    fontWeight:"ultrabold"
  },
    quantityColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "2.7cm"
    },
    denominationColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "5cm"
    },
    priceColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "2cm"
    },
    reductionColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "3cm"
    },
    vatColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "2cm"
    },
    htColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "2.5cm"
    },
    ttcColumn:{
    borderLeft:"1px solid gray",
    borderRight:"1px solid gray",
    width: "2.5cm"
    },
    tableTotal:{
      position:"absolute",
      bottom:-30,
      right:0,
      padding:4,
      minWidth:"15vw",
      flexDirection:"row",
      backgroundColor:tableHeaderBackgroundColor,
      color:tableHeaderFontColor,
      borderBottomRightRadius:"5px",
      borderBottomLeftRadius:"5px"
    },
    companyInfo:{
      position:"absolute",
      top:120,
      left:10,
      padding:4,
      width: "45vw",
      height:"15vh",
      border:"1px solid blue"
    },
    customerInfo:{
      position:"absolute",
      top:120,
      right:10,
      width:"45vw",
      padding:4,
      height:"15vh",
      border:"1px solid blue"
    },
    invoiceInfo:{
      backgroundColor:"#f2f9fa",
      position:"absolute",
      top:45,
      right:10
    } ,title:{
      position:"absolute",
      top:20,
      right:10,
      fontSize:"20px"

    },
  
})
const {items, custommer}=props

const total = items.reduce((accumulator, currentvalue)=>accumulator + currentvalue.ttc, 0)

    return( 
    <Document pageLayout="singlePage" pageMode="useNone">
        <Page size="A4" style={styles.page} orientation='portrait'>
          <View style={styles.companyInfo}>
            <Text>Nom de l'entreprise</Text>
            <Text>Adresse l'entreprise</Text>
            <Text>Tel de l'entreprise</Text>
            <Text>Ref de l'entreprise</Text>
          </View>
          <View style={styles.title}>
            <Text>FACTURE</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text>{custommer.name}</Text>
            {custommer.billingAddress !== custommer.deliveryAddress ?
            <>
            <Text>Adresse de livraison:</Text>
            <Text> {custommer.deliveryAddress}</Text>
            <Text>Adresse de facturation:</Text>
            <Text>{custommer.billingAddress}</Text>
            </>: 
            <>
            <Text>{custommer.deliveryAddress}</Text></>
            }
          </View>
          <View style={styles.invoiceInfo}>
          <Text>Numéro de facture</Text>
            <Text>Date de facturation</Text>
            <Text>Date prestation</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.headerRow} >
              <Text style={styles.quantityColumn}>QTé</Text>
              <Text style={styles.denominationColumn}>DESIGNATION</Text>
              <Text style={styles.priceColumn}>PRIX U.</Text>
              <Text style={styles.reductionColumn}>Réduction</Text>
              <Text style={styles.vatColumn}>TVA</Text>
              <Text style={styles.htColumn}>HT</Text>
              <Text style={styles.ttcColumn}>TTC</Text>
            </View>
            {items.map((item, index)=>(
              <View key={'tableLine-'+index} style={styles.tableRow}>
                <Text style={styles.quantityColumn}>{item.quantity}</Text>
                <Text style={styles.denominationColumn}>{item.denomination}</Text>
                <Text style={styles.priceColumn}>{item.price}</Text>
                <Text style={styles.reductionColumn}>{item.reduction}</Text>
                <Text style={styles.vatColumn}>{item.vatRate}</Text>
                <Text style={styles.htColumn}>{item.ht.toFixed(2)}</Text>
                <Text style={styles.ttcColumn}>{item.ttc.toFixed(2)}</Text>
              </View>
            ))}
             
             <View style={styles.tableTotal}>
              <Text>Total: {total} €</Text>
             </View>
          </View>
          
          
        </Page>
    </Document>)
}

export default PDFPage