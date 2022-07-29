import { MobileMoel, OrderStatus, RepairType } from '../data/base';

export interface OrderRegisterRequest {
  name: string;
  class: string;
  mobileModel: MobileMoel;
  repairType: RepairType;
  deadline: Date;
}

export interface OrderAmountUpdateRequest {
  id: string;
  amount: number;
}

export interface OrderStatusUpdateRequest {
  id: string;
  status: OrderStatus;
}

export interface OrderResponse {
  id: string;
  name: string;
  class: string;
  mobileModel: MobileMoel;
  repairType: RepairType;
  deadline: Date;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}