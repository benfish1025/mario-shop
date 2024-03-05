import { render, fireEvent, waitFor } from "@testing-library/react"
import { CheckoutForm } from "./CheckoutForm"
import { act } from "react-dom/test-utils"

describe("计算表单", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />)

    expect(container.innerHTML).toMatch("姓名")
    expect(container.innerHTML).toMatch("账号ID")
    expect(container.innerHTML).toMatch("支付密码")
  })

  // describe("校验错误", () => {
  //   it("显示错误信息", async () => {
  //     const { container, getByText } = render(<CheckoutForm />)

  //     await act(async () => {
  //       fireEvent.click(getByText("确认"))
  //     })

  //     expect(container.innerHTML).toMatch("错误:")
  //   })
  // })

  describe("校验通过", () => {
    describe("点击‘支付’", () => {
      it("调用submit回调函数", async () => {
        const mockSubmit = jest.fn()
        const { getByLabelText, getByText } = render(
          <CheckoutForm submit={mockSubmit} />
        )
        fireEvent.change(getByLabelText("姓名:"), {
          target: { value: "宫本聪" }
        })
        fireEvent.change(getByLabelText("账号ID:"), {
          target: { value: "00000000" }
        })
        fireEvent.change(getByLabelText("支付密码:"), {
          target: { value: "3020" }
        })

        fireEvent.click(getByText("支付"))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
      })
    })
  })
})
