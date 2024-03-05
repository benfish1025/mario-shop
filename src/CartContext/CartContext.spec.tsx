import { render } from "@testing-library/react"
import { CartProvider, CartContext } from "./CartContext"
import { useCart } from "./useCart"

jest.mock("./useCart", () => ({
  useCart: jest.fn()
}))

const useCartMock = useCart as unknown as jest.Mock<
  Partial<ReturnType<typeof useCart>>
>

describe("CartProvider", () => {
  describe("当addToCart被调用时", () => {
    it("将产品添加到产品数组", () => {
      const cartHookReturnValue = {
        products: [],
        totalPrice: () => 0,
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {}
      }
      useCartMock.mockReturnValue(cartHookReturnValue)
      const mockChildrenFunction = jest.fn(() => null)

      render(
        <CartProvider useCartHook={() => cartHookReturnValue}>
          <CartContext.Consumer>
            {mockChildrenFunction}
          </CartContext.Consumer>
        </CartProvider>
      )

      expect(mockChildrenFunction).toHaveBeenCalledWith(
        cartHookReturnValue
      )
    })
  })
})
