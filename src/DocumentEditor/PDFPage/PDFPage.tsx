import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceItem from '../../types/InvoiceItem';

type PDFPageProps = {
  items:InvoiceItem[]
}

function PDFPage(props:PDFPageProps){
const styles = StyleSheet.create({
    page:{
    backgroundColor: 'white',
    padding:10
  },
  table:{
    position:"absolute",
    top:200,
    left:10,
    flexDirection:"column",
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:"center"
  },tableRow:{
    flexDirection:"row",
    borderTop:"1px solid gray",
    borderBottom:"1px solid gray",
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
    companyInfo:{
      position:"absolute",
      top:20,
      left:5
    },
    title:{
      position:"absolute",
      top:20,
      right:250,
      fontSize:20

    },
    customerInfo:{
      position:"absolute",
      top:20,
      right:15,
      padding:3
    },
    invoiceInfo:{
      backgroundColor:"#f2f9fa",
      position:"absolute",
      top:120,
      left:20
    }
  
})
const {items}=props

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
            <Text>Nom du client</Text>
            <Text>Adresse du client</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text>Date de facturation</Text>
            <Text>Numéro de facture</Text>
            <Text>Date prestation</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow} >
              <Text style={styles.quantityColumn}>Quantité</Text>
              <Text style={styles.denominationColumn}>Désignation</Text>
              <Text style={styles.priceColumn}>Prix</Text>
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
             
             
          </View>
          
          
        </Page>
    </Document>)
}

export default PDFPage