type InvoiceItem = {
  denomination: string;
  quantity: number;
  price: number;
  vatRate: number;
  reduction: number;
  ht: number;
  ttc: number;
};

export default InvoiceItem;
