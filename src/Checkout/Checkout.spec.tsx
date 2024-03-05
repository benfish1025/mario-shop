import { Checkout } from "./Checkout"
import { render } from "@testing-library/react"
import { CheckoutList } from "./CheckoutList"
import { CheckoutForm } from "./CheckoutForm"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

const products = [
  {
    name: "测试",
    price: 0,
    image: "image.png"
  }
]

describe("结算", () => {
  beforeEach(() => {
    useCartContextMock.mockReturnValue({
      products,
      removeFromCart: () => {},
      totalPrice: () => 55
    })
  })

  it("显示总价", () => {
    const { container } = render(<Checkout />)
    expect(container.innerHTML).toMatch("总计: 55 Mb")
  })

  it("传递数据到CheckoutList", () => {
    const { container } = render(<Checkout />)
    expect(container.innerHTML).toMatch("测试")
  })

  it("渲染表单", () => {
    const { getByTestId } = render(<Checkout />)
    expect(getByTestId("checkout-form")).toBeInTheDocument()
  })
})
