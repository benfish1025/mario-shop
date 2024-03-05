import { Loader } from "./Loader"
import { render } from "@testing-library/react"

describe("全局loading", () => {
  it("正确显示", () => {
    const { container } = render(<Loader />)
    expect(container.innerHTML).toMatch("Loading")
  })
})
