import { ProductCard } from "./ProductCard"
import { useProducts } from "./useProducts"

export const Home = () => {
  const { categories, isLoading, error } = useProducts()

  if (isLoading) {
    return <>加载中...</>
  }

  if (error) {
    return <>呀！出现了一些错误</>
  }

  return (
    <>
      {categories.map((category) => {
        return (
          <section
            key={category.name}
            className="nes-container with-title showcase"
          >
            <h2 className="title">{category.name}</h2>
            <section className="items">
              {category.items.map((item) => {
                return (
                  <ProductCard
                    key={item.name}
                    datum={item}
                  />
                )
              })}
            </section>
          </section>
        )
      })}
    </>
  )
}
