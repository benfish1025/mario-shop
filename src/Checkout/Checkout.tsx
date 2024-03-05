import { CheckoutList } from "./CheckoutList"
import { useCartContext } from "../CartContext"
import { CheckoutForm } from "./CheckoutForm"
import { postCheckout } from "../utils/api"

export const Checkout = () => {
  const { products, totalPrice, clearCart } = useCartContext()

  const submitCheckout = async () => {
    const { id: orderId } = await postCheckout({
      order: products.map(product => product.name).join(","),
    })
    clearCart()
    window.location.assign(`/order/?orderId=${orderId}`)
  }

  return (
    <section className="nes-container with-title">
      <h1 className="title">确认订单</h1>
      <div className="nes-container is-rounded checkout-list-wrapper">
        <p>您选购的商品:</p>
        <CheckoutList products={products} />
        <p>总计: {totalPrice()} Mb</p>
      </div>
      <p>选择支付方式:</p>
      <CheckoutForm submit={submitCheckout} />
    </section>
  )
}
