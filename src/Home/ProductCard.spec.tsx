import { render, fireEvent } from "@testing-library/react"
import { ProductCard } from "./ProductCard"
import { Product } from "../shared/types"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

const product: Product = {
  name: "测试",
  price: 55,
  image: "/test.jpg"
}

describe("商品卡片", () => {
  it("正确显示", () => {
    useCartContextMock.mockReturnValue({
      addToCart: () => {},
      products: [product]
    })
    const { container, getByRole } = render(
      <ProductCard datum={product} />
    )

    expect(container.innerHTML).toMatch("测试")
    expect(container.innerHTML).toMatch("55 Mb")
    expect(getByRole("img")).toHaveAttribute("src", "/test.jpg")
  })

  describe("商品被添加", () => {
    it("‘添加’按钮置灰", () => {
      useCartContextMock.mockReturnValue({
        addToCart: () => {},
        products: [product]
      })

      const { getByRole } = render(<ProductCard datum={product} />)
      expect(getByRole("button")).toBeDisabled()
    })
  })

  // 注意这里的职责拆分，因为是单元测试所以不用关注购物车那里有没有响应
  // 否则就变成了集成测试
  describe("商品未被添加", () => {
    describe("点击‘添加’按钮", () => {
      it("调用addToCart", () => {
        const addToCart = jest.fn()
        useCartContextMock.mockReturnValue({
          addToCart,
          products: []
        })

        const { getByText } = render(<ProductCard datum={product} />)

        fireEvent.click(getByText("添加"))
        expect(addToCart).toHaveBeenCalledWith(product)
      })
    })
  })
})
