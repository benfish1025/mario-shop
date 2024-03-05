import { renderHook, act } from "@testing-library/react-hooks"
import { useProducts } from "./useProducts"
import { getProducts } from "../utils/api"

jest.mock("../utils/api", () => ({
  getProducts: jest.fn()
}))

const getProductsMock = getProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof getProducts>>
>

describe("useProducts", () => {
  it("请求商品列表", async () => {
    await act(async () => {
      renderHook(() => useProducts())
    })

    expect(getProducts).toHaveBeenCalled()
  })

  describe("等待加载", () => {
    it("返回正确的状态", () => {
      getProductsMock.mockReturnValue(new Promise(() => {}))

      const { result } = renderHook(() => useProducts())
      expect(result.current.isLoading).toEqual(true)
      expect(result.current.error).toEqual(false)
      expect(result.current.categories).toEqual([])
    })
  })

  describe("接口报错", () => {
    it("返回错误对象", async () => {
      getProductsMock.mockReturnValue(
        new Promise((resolve, reject) => {
          reject("Error")
        })
      )

      const { result, waitForNextUpdate } = renderHook(() =>
        useProducts()
      )

      await act(() => waitForNextUpdate())

      expect(result.current.isLoading).toEqual(false)
      expect(result.current.error).toEqual("Error")
      expect(result.current.categories).toEqual([])
    })
  })

  describe("请求成功", () => {
    it("返回相应数据", async () => {
      getProductsMock.mockReturnValue(
        new Promise((resolve, reject) => {
          resolve({
            categories: [{ name: "Category", items: [] }]
          })
        })
      )

      const { result, waitForNextUpdate } = renderHook(() =>
        useProducts()
      )

      await act(() => waitForNextUpdate())

      expect(result.current.isLoading).toEqual(false)
      expect(result.current.error).toEqual(false)
      expect(result.current.categories).toEqual([
        {
          name: "Category",
          items: []
        }
      ])
    })
  })
})
