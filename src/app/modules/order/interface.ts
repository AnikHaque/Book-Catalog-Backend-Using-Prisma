export type IOrderFilter = {
  search?: string;
};

export type IOrderReqData = {
  orderedBooks: OrderItem[];
};

type OrderItem = {
  bookId: string;
  quantity: number;
};

export type WhereConditionType = {
  id: string;
  user?: { id: string };
};
