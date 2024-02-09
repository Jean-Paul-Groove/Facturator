type InvoiceItem = {
  denomination: string;
  quantity: number;
  price: number;
  vatRate: number;
  reduction: number;
  date: string;
  ttc: number;
};

export default InvoiceItem;
