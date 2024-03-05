import { App } from "./App"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"
import { Router } from "react-router-dom"

jest.mock("./Home", () => ({ Home: () => <div>Home</div> }))
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div> }))
jest.mock("./Checkout", () => ({
  Checkout: () => <div>确认订单</div>
}))
jest.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order summary</div>
}))

describe("App", () => {
  it("正确显示", () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch("马里奥商店")
  })

  describe("routing", () => {
    it("首页路由 '/'", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/"
      )
      expect(container.innerHTML).toMatch("首页")
    })

    it("'/cart'", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/cart"
      )
      expect(container.innerHTML).toMatch("购物车")
    })

    it("'/checkout'", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/checkout"
      )
      expect(container.innerHTML).toMatch("确订订单")
    })

    it("'/order'", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/order"
      )
      expect(container.innerHTML).toMatch("下单成功")
    })

    it("404", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/this-route-does-not-exist"
      )
      expect(container.innerHTML).toMatch("404 页面不存在")
    })
  })
})
