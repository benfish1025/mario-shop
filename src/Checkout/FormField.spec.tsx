import { render, fireEvent } from "@testing-library/react"
import { FormField } from "./FormField"

describe("FormField组件", () => {
  it("成功显示", () => {
    const { getByLabelText } = render(
      <FormField label="label" name="foo" />
    )
    const input = getByLabelText("label:")
    expect(input).toBeInTheDocument()
    expect(input).not.toHaveClass("is-error")
    expect(input).toHaveAttribute("name", "foo")
  })

  describe("error", () => {
    it("显示错误信息", () => {
      const { getByText } = render(
        <FormField
          label="label"
          name="foo"
          errors={{ message: "报错信息" }}
        />
      )
      expect(getByText("错误: 报错信息")).toBeInTheDocument()
    })
  })
