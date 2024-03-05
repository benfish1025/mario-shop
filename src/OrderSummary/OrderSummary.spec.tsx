import { OrderSummary } from "./OrderSummary"
import { render, fireEvent } from "@testing-library/react"
import { useOrder } from "./useOrder"

jest.mock("./useOrder", () => ({
  useOrder: jest.fn()
}))

const useOrderMock = useOrder as unknown as jest.Mock<
  Partial<ReturnType<typeof useOrder>>
>

describe("支付成功后显示订单详情", () => {
  afterEach(jest.clearAllMocks)

  describe("向接口请求成功支付的订单数据", () => {
    it("显示加载中", () => {
      useOrderMock.mockReturnValue({
        isLoading: true,
        order: undefined
      })

      const { container }= render(<OrderSummary />)
			expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("加载成功", () => {
    beforeEach(() => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: {
          products: [
            {
              name: "测试",
              price: 10,
              image: "image.png"
            }
          ]
        }
      })
    })

    it("显示订单信息", () => {
      const { container } = renderWithRouter(() => <OrderSummary />)

      expect(container.innerHTML).toMatch("测试")
    })

    it("点击‘回到首页’", () => {
      const { getByText, history } = renderWithRouter(() => (
        <OrderSummary />
      ))

      fireEvent.click(getByText("回到首页"))

      expect(history.location.pathname).toEqual("/")
    })
  })

  describe("无订单信息（支付未成功）", () => {
    it("显示错误信息", () => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: undefined
      })

      const { container } = render(<OrderSummary />)

      expect(container.innerHTML).toMatch("支付失败！请重试.")
    })
  })
})
