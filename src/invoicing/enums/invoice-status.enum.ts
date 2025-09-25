export enum InvoiceStatus {
  DRAFT = 'Draft',           // Initial state, yet to be finalized
  SENT = 'Sent',             // Sent to the customer
  VIEWED = 'Viewed',         // Customer has seen the invoice
  PARTIALLY_PAID = 'Partially Paid', // Partial payment received
  PAID = 'Paid',             // Fully paid
  OVERDUE = 'Overdue',       // Payment is past due
  CANCELED = 'Canceled',     // Invoice canceled
}