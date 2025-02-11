export enum QuoteStatus {
    DRAFT = 'Draft',           // Quote created but not finalized
    SENT = 'Sent',             // Quote sent to the customer
    VIEWED = 'Viewed',         // Customer has reviewed the quote
    ACCEPTED = 'Accepted',     // Quote accepted by customer
    REJECTED = 'Rejected',     // Quote declined by customer
    EXPIRED = 'Expired',       // Quote expired without response
    CANCELED = 'Canceled',     // Quote canceled by the creator
  }