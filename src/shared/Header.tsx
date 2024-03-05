import { Link } from "react-router-dom"
import { CartWidget } from "./CartWidget"

export const Header = () => (
  <header>
    <div className="container">
      <div className="nav-brand">
        <Link to="/">
          <i className="pixel-mario brand-logo"></i>
        </Link>
        <div>
          <h1>马里奥商店</h1>
          <p>世界第一水管工的奇趣商店</p>
        </div>
      </div>
      <div className="cart">
        <CartWidget/>
      </div>
    </div>
  </header>
)
