import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import Layout from '../components/layout/layout';
import { mobileModel, OrderStatus, OrderStatusColor, repairType } from '../components/core/data/base';
import { OrderService } from '../components/core/api-services/order.service';
import { OrderRegisterRequest, OrderResponse } from '../components/core/types/order';
import Spinner from '../components/ui-kit/common/spinner';
import useAlert from '../components/ui-kit/dialog/use-alert';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const alertService = useAlert();

  const listOrder = useCallback(() => {
    setIsLoading(true);
    OrderService.getOrders().then((res: OrderResponse[]) => {
      setOrderList(res);
    }).catch(async (ex) => {
      await alertService.notify('Request Failed', ex.message || 'Request failed. Please try again.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, orderList])

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const data: OrderRegisterRequest = {
      name: event.target.name.value,
      class: event.target.class.value,
      mobileModel: event.target.mobileModel.value,
      repairType: event.target.repairType.value,
      deadline: event.target.deadline.value,
    };
    setIsLoading(true);
    OrderService.createOrder(data).then((res: OrderResponse) => {
      listOrder();
    }).catch(async (ex) => {
      await alertService.notify('Request Failed', ex.message || 'Request failed. Please try again.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, listOrder])

  const updateOrder = useCallback((id: string, status: OrderStatus) => {
    setIsLoading(true);
    OrderService.updateOrderStatus({ id, status}).then((res: OrderResponse) => {
      listOrder();
    }).catch(async (ex) => {
      await alertService.notify('Request Failed', ex.message || 'Request failed. Please try again.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, listOrder])

  useEffect(() => {
    listOrder();
  }, [])
  return (
    <>
      <Head>
        <title>Mobile Repair Shop</title>
        <meta name="description" content="Mobile Repair Shop from Jie Li."/>
      </Head>
      <Layout>
        <Spinner isLoading={isLoading} />
        <section className="mx-auto container mb-30">
          <h1 className="text-24 text-light-400 mb-10">Request Application</h1>
          <hr className="text-light-200 mb-50"/>
          <form className="w-400 mx-auto text-light-400" onSubmit={onSubmit}>
            <div className="mb-10">
              <p className="py-5">Customer Name</p>
              <input data-testid="name" className="input" name="name" required placeholder="Type your name" pattern="[a-zA-z\s]+" title="Name should be alphabets (a to z, A to Z and space)."/>
            </div>
            <div className="mb-10">
              <p className="py-5">Customer Class</p>
              <input data-testid="class" className="input" name="class" required placeholder="Type your class" pattern="[a-zA-z0-9\s]+" title="Class should be alphabets (a to z, A to Z and space) and digit."/>
            </div>
            <div className="mb-10">
              <p className="py-5">Mobile Model</p>
              <select data-testid="model" className="input w-full bg-white" name="mobileModel">
                {Object.keys(mobileModel).map((key, index) => <option key={index} value={key}>{ mobileModel[key] }</option>)}
              </select>
            </div>
            <div className="mb-10">
              <p className="py-5">Repair Type</p>
              <select data-testid="type" className="input w-full bg-white" name="repairType">
                {Object.keys(repairType).map((key, index) => <option key={index} value={key}>{ repairType[key] }</option>)}
              </select>
            </div>
            <div className="mb-10">
              <p className="py-5">DeadLine</p>
              <input data-testid="deadline" type="date" name="deadline" required className="input w-full" defaultValue={new Date().toISOString().slice(0, -14)} min={new Date().toISOString().slice(0, -14)}/>
            </div>
            <div className="my-20 flex items-center justify-center">
              <button data-testid="submit" type="submit" className="btn btn-sm btn-primary w-full">Submit</button>
            </div>
          </form>
        </section>
        <section className="mx-auto container mb-30">
          <h1 className="text-24 text-light-400 mb-10">Application List</h1>
          <hr className="text-light-200 mb-30"/>
          <div className="p-20">
            <table className="table-auto border border-light-200 mx-auto">
              <thead className="border-b border-light-200 p-10">
                <tr>
                  <th className="p-10 text-light-400 border border-light-300">#</th>
                  <th className="p-10 text-light-400 border border-light-300">Name</th>
                  <th className="p-10 text-light-400 border border-light-300">Class</th>
                  <th className="p-10 text-light-400 border border-light-300">Mobile Model</th>
                  <th className="p-10 text-light-400 border border-light-300">Repair Type</th>
                  <th className="p-10 text-light-400 border border-light-300">DeadLine</th>
                  <th className="p-10 text-light-400 border border-light-300">Amount</th>
                  <th className="p-10 text-light-400 border border-light-300">Status</th>
                  <th className="p-10 text-light-400 border border-light-300">Action</th>
                </tr>
              </thead>
              <tbody data-testid="tbody">
                {orderList.map((order, index) => <tr key={index} className="hover:bg-light-50 hover:cursor-pointer">
                  <td className="border border-light-200 text-light-300 p-10 text-center max-w-120 truncate">{ order.id }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.name }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.class }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ mobileModel[order.mobileModel] }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ repairType[order.repairType] }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.deadline.slice(0, -14) }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.amount }$</td>
                  <td className={"border border-light-200 text-light-300 p-10 text-center " + OrderStatusColor[order.status] }>{ OrderStatus[order.status] }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">
                    {order.status === OrderStatus.initial && <button onClick={() => updateOrder(order.id, OrderStatus.canceled)} className="font-bold text-danger">Cancel?</button>}
                    {order.status === OrderStatus.estimated && <button onClick={() => updateOrder(order.id, OrderStatus.agreed)} className="font-bold text-primary">Approve?</button>}
                    {order.status === OrderStatus.repaired && <button onClick={() => updateOrder(order.id, OrderStatus.ended)} className="font-bold text-secondary">End?</button>}
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default IndexPage
