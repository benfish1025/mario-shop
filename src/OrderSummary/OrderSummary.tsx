import { Loader } from "../shared/Loader"
import { Link } from "react-router-dom"
import { useOrder } from "./useOrder"

export const OrderSummary = () => {
  const {isLoading, order} = useOrder()

  if (isLoading) {
    return <Loader />
  }

  if (!order) {
    return <div>下单失败！请重试</div>
  }

  return (
    <section className="nes-container with-title">
      <h1 className="title">下单成功！订单详情：</h1>
      <div className="nes-container is-rounded order-summary-container">
        <ul className="nes-list is-circle">
          {order.products.map((product) => {
            return <li key={product.name}>{product.name}</li>
          })}
        </ul>
      </div>
      <Link to="/">
        <button className="nes-btn is-primary">回到首页</button>
      </Link>
    </section>
  )
}
