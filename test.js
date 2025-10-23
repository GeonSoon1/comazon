

app.get("/users", async (req, res) => {
  const { offset=0, limit=0, order="newest" } =  req.query; //쿼리 파라미터로 값이 안오면 default값.
  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = {createdAt: "asc"}
      break;
    case "newest":
      orderBy = {createdAt: "desc"}
      break;
    default:
      orderBy = {createdAt: "desc"}
  }
  const users = await prisma.user.findMany({
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit)
  })
  res.send(users)
})


app.get("/products" , async (req, res) => {
  const { offset=0, limit=0, order="newest", category} = req.query
  let orderBy;
  switch (order) {
    case "priceLowest":
      orderBy = { price: "asc"}
      break;
    case "priceHighest":
      orderBy = { price: "desc"}
      break;
    case "oldest":
      orderBy = {createdAt: "asc"}
      break;
    case "newest":
      orderBy = {createdAt: "desc"}
  }
  const where = category ? { category } : {};

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit)
  })
  res.send(products)
})


export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 60),
  description: s.string(),
  category: s.enums(CATEGORIES),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0)
})

export const PatchProduct = s.partial(CreateProduct)







