import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import Layout from '../components/layout/layout';
import { mobileModel, OrderStatus, OrderStatusColor, repairType } from '../components/core/data/base';
import { OrderService } from '../components/core/api-services/order.service';
import { OrderResponse } from '../components/core/types/order';
import Spinner from '../components/ui-kit/common/spinner';
import useAlert from '../components/ui-kit/dialog/use-alert';

const DashBoard = () => {
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

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setIsLoading(true);
    OrderService.updateOrderStatus({ id, status}).then((res: OrderResponse) => {
      listOrder();
    }).catch(async (ex) => {
      await alertService.notify('Request Failed', ex.message || 'Request failed. Please try again.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, listOrder])

  const updateOrderAmount = useCallback((id: string, amount: number) => {
    setIsLoading(true);
    OrderService.updateOrderAmount({ id, amount}).then((res: OrderResponse) => {
      listOrder();
    }).catch(async (ex) => {
      await alertService.notify('Request Failed', ex.message || 'Request failed. Please try again.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, listOrder])

  const orderClicked = useCallback(async (order) => {
    if (order.status === OrderStatus.initial) {
      const amount = prompt("Please enter estimate amount", "Mobile Repair Estimate Amount");
      if (amount !== null) {
        if (!isNaN(parseInt(amount))) {
          updateOrderAmount(order.id, parseInt(amount));
        } else {
          await alertService.notify('Amount Error', 'Amount should be integer', 'Ok');
        }
      }
    } else if(order.status === OrderStatus.agreed) {
      if (window.confirm("Are you completely repaired this mobile?")) {
        updateOrderStatus(order.id, OrderStatus.repaired);
      }
    }
  }, [updateOrderAmount, updateOrderStatus])

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
          <h1 className="text-24 text-light-400 mb-10">Application List</h1>
          <hr className="text-light-200 mb-30"/>
          <pre className="text-light-300 text-center">
            You can enter estimate amount by clicking the `initial` status order row.<br/>
            You can update 'repair' status for `agreed` order`
          </pre>
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
                </tr>
              </thead>
              <tbody data-testid="tbody">
                {orderList.map((order, index) => <tr key={index} onClick={() => orderClicked(order)} className="hover:bg-light-50 hover:cursor-pointer">
                  <td className="border border-light-200 text-light-300 p-10 text-center max-w-120 truncate">{ order.id }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.name }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.class }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ mobileModel[order.mobileModel] }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ repairType[order.repairType] }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.deadline.slice(0, -14) }</td>
                  <td className="border border-light-200 text-light-300 p-10 text-center">{ order.amount }$</td>
                  <td className={"border border-light-200 text-light-300 p-10 text-center " + OrderStatusColor[order.status] }>{ OrderStatus[order.status] }</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default DashBoard
