import { doGet, doPost, doPut } from './http';

import {
  OrderAmountUpdateRequest,
  OrderRegisterRequest,
  OrderResponse,
  OrderStatusUpdateRequest
} from '../types/order';

export const OrderService = {
  createOrder: (dto: OrderRegisterRequest): Promise<OrderResponse> => {
    return doPost('/order', { ...dto });
  },
  getOrders: (): Promise<OrderResponse[]> => {
    return doGet('/order');
  },
  updateOrderAmount: (dto: OrderAmountUpdateRequest): Promise<OrderResponse> => {
    return doPut('/order/amount', { ...dto });
  },
  updateOrderStatus: (dto: OrderStatusUpdateRequest): Promise<OrderResponse> => {
    return doPut('/order/status', { ...dto });
  },
};