import { Home } from "./Home"
import { Category } from "../shared/types"
import { render } from "@testing-library/react"
import { ProductCardProps } from "./ProductCard"
import { useProducts } from "./useProducts"

jest.mock("./ProductCard", () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  }
}))

jest.mock("./useProducts", () => ({
  useProducts: jest.fn()
}))

const useProductsMock = useProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof useProducts>>
>

describe("首页", () => {
  describe("等待数据时", () => {
    it("显示loading", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: true,
        error: false
      })

      const { container } = render(<Home />)

      expect(container.innerHTML).toMatch("加载中")
    })
  })

  describe("有数据时", () => {
    it("显示商品列表", () => {
      const category: Category = {
        name: "Foo",
        items: [
          {
            name: "测试",
            price: 55,
            image: "/test.jpg"
          }
        ]
      }

      useProductsMock.mockReturnValue({
        categories: [category],
        isLoading: false,
        error: false
      })

      const { container } = render(
        <Home />
      )

      expect(container.innerHTML).toMatch("Foo")
      expect(container.innerHTML).toMatch("测试 55 /test.jpg")
    })
  })

  describe("报错时", () => {
    it("显示错误信息", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: false,
        error: true
      })

      const { container } = render(
        <Home />
      )

      expect(container.innerHTML).toMatch("呀！出现了一些错误")
    })
  })
})
