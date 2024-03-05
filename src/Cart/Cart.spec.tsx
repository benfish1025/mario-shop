import { Cart } from "./Cart"
import { fireEvent } from "@testing-library/react"
import { CartItemProps } from "./CartItem"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  }
}))

describe("Cart", () => {
  describe("购物车为空", () => {
    beforeEach(() => {
      useCartContextMock.mockReturnValue({
        products: []
      })
    })

    it("显示空提示", () => {
      const { container } = renderWithRouter(() => <Cart />)
      expect(container.innerHTML).toMatch("购物车为空.")
    })

    describe("点击回‘回到首页’", () => {
      it("redirects to '/'", () => {
        const { getByText, history } = renderWithRouter(() => (
          <Cart />
        ))

        fireEvent.click(getByText("回到首页."))

        expect(history.location.pathname).toBe("/")
      })
    })
  })

  describe("购物车不为空", () => {
    beforeEach(() => {
      const products = [
        {
          name: "商品 f",
          price: 100,
          image: "/image/foo_source.png"
        },
        {
          name: "商品 b",
          price: 100,
          image: "/image/bar_source.png"
        }
      ]

      useCartContextMock.mockReturnValue({
        products,
        totalPrice: () => 55
      })
    })

    it("显示购物车产品列表和总价", () => {
      const { container } = renderWithRouter(() => <Cart />)

      expect(container.innerHTML).toMatch(
        "商品 f 100 /image/foo_source.png"
      )
      expect(container.innerHTML).toMatch(
        "商品 b 100 /image/bar_source.png"
      )
      expect(container.innerHTML).toMatch("总计: 55 Mb")
    })

    describe("点击‘去结算’", () => {
      it("导航至 '/checkout'", () => {
        const { getByText, history } = renderWithRouter(() => (
          <Cart />
        ))

        fireEvent.click(getByText("去结算"))

        expect(history.location.pathname).toBe("/checkout")
      })
    })
  })
})
