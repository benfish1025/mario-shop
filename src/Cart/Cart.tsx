import { Link } from "react-router-dom"
import { useCartContext } from "../CartContext"
import { CartItem } from "./CartItem"

export const Cart = () => {
  const { products, removeFromCart, totalPrice } = useCartContext()
  if (!products.length) {
    return (
      <>
        商品为空.{" "}
        <Link to="/">回到首页.</Link>
      </>
    )
  }

  return (
    <section className="nes-container with-title is-centered">
      <h3 className="title">购物车</h3>
      <div className="cart-items">
        {products.map((datum) => (
          <CartItem
            key={datum.name}
            product={datum}
            removeFromCart={removeFromCart}
          />
        ))}
        <p>总计: {totalPrice()} Mb</p>
      </div>
      <div>
        <Link to="/checkout">
          <button className="nes-btn is-primary">
            去结算
          </button>
        </Link>
      </div>
    </section>
  )
}
