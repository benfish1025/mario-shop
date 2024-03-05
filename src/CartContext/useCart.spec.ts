import { useCart } from "./useCart"
import { renderHook, act } from "@testing-library/react-hooks"
import { Product } from "../shared/types"

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    clear: () => {
      store = {}
    },
    getItem: (key: string) => {
      return store[key] || null
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value ? value.toString() : ""
    })
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
})

describe("useCart", () => {
  afterEach(() => {
    localStorageMock.clear()
  })

  describe("on mount", () => {
    it("从localStorage加载数据", () => {
      const products: Product[] = [
        {
          name: "测试",
          price: 0,
          image: "image.jpg"
        }
      ]
      localStorageMock.setItem(
        "products",
        JSON.stringify(products)
      )

      const { result } = renderHook(useCart)

      expect(result.current.products).toEqual(products)
    })
  })

  describe("addToCart方法", () => {
    it("将项目添加到购物车中", () => {
      const product: Product = {
        name: "测试",
        price: 0,
        image: "image.jpg"
      }
      const { result } = renderHook(useCart)

      act(() => {
        result.current.addToCart(product)
      })

      expect(result.current.products).toEqual([product])
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        JSON.stringify([product])
      )
    })
  })

  describe("removeFromCart方法", () => {
    it("删除特定项", () => {
      const product: Product = {
        name: "测试",
        price: 0,
        image: "image.jpg"
      }
      localStorageMock.setItem(
        "products",
        JSON.stringify([product])
      )

      const { result } = renderHook(useCart)

      act(() => {
        result.current.removeFromCart(product)
      })

      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        "[]"
      )
    })
  })

  describe("totalPrice", () => {
    it("返回总价", () => {
      const product: Product = {
        name: "测试",
        price: 21,
        image: "image.jpg"
      }
      localStorageMock.setItem(
        "products",
        JSON.stringify([product, product])
      )
      const { result } = renderHook(useCart)

      expect(result.current.totalPrice()).toEqual(42)
    })
  })

  describe("clearCart", () => {
    it("从购物车中删除所有产品", () => {
      const product: Product = {
        name: "测试",
        price: 21,
        image: "image.jpg"
      }
      localStorageMock.setItem(
        "products",
        JSON.stringify([product, product])
      )
      const { result } = renderHook(useCart)

      act(() => {
        result.current.clearCart()
      })

      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        "[]"
      )
    })
  })
})
