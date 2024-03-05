import { Header } from "./Header"
import { fireEvent } from "@testing-library/react"

jest.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>
}))

describe("Header", () => {
  it("正确显示", () => {
    const { container } = renderWithRouter(() => <Header />)
    expect(container.innerHTML).toMatch("马里奥商店")
    expect(container.innerHTML).toMatch("世界上最伟大水管工的奇趣商店")
  })

  it("点击导航栏图标", () => {
    const { getByText, history } = renderWithRouter(() => <Header />)
    fireEvent.click(getByText("马里奥商店"))
    expect(history.location.pathname).toEqual("/")
  })
})
