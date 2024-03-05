import { CartItem } from "./CartItem"
import { Product } from "../shared/types"
import { fireEvent } from "@testing-library/react"

describe("购物车中的单个商品", () => {
  const product: Product = {
    name: "Foo",
    price: 100,
    image: "/image/source.png"
  }

  // 结果测试法：直接测试dom元素
  it("准确渲染", () => {
    const {
      container,
      getByAltText
    } = renderWithRouter(() => (
      <CartItem
        product={product}
        removeFromCart={() => {}}
      />
    ))

    expect(container.innerHTML).toMatch("Foo")
    expect(container.innerHTML).toMatch("100 Mb")
    expect(getByAltText("Foo")).toHaveAttribute(
      "src",
      "/image/source.png"
    )
  })

  // 过程测试法：是否调用某个函数
  // 除非是端到端测试，大部分时候需要选择测试哪一个 过程节点
  describe("点击‘删除’", () => {
    it("成功调用回调", () => {
      const removeFromCartMock = jest.fn()

      const { getByText } = renderWithRouter(() => (
        <CartItem
          product={product}
          removeFromCart={removeFromCartMock}
        />
      ))

      fireEvent.click(getByText("Remove"))

      expect(removeFromCartMock).toBeCalledWith(product)
    })
  })
})
