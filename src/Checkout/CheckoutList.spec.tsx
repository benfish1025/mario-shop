import { CheckoutList } from "./CheckoutList"
import { Product } from "../shared/types"
import { render } from "@testing-library/react"

describe("下单成功显示列表", () => {
  it("列表成功显示出来", () => {
    const products: Product[] = [
      {
        name: "测试",
        price: 10,
        image: "/image.png"
      },
      {
        name: "测试bar",
        price: 10,
        image: "/image.png"
      }
    ]

    const { container } = render(
      <CheckoutList products={products} />
    )
    expect(container.innerHTML).toMatch("测试")
    expect(container.innerHTML).toMatch("测试bar")
  })
})
