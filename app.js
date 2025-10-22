import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient()

// users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  console.log(users)
  res.send(users)
})

app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const user = await prisma.user.findUnique({
    where: { id } 
  })
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({message: "Cannot find given id"})
  }
})

app.post("/users", async (req, res) => {
  const data = req.body;
  const user = await prisma.user.create({
    data
  })
  res.status(201).send(user)
})

app.patch("/users/:id", async (req, res) => {
  const { id }= req.params;
  const data = req.body;

  const user = await prisma.user.update({
    where: { id },
    data
  })
  res.send(user)
})

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.delete({
    where : { id } 
  })
  res.send(user)
})


// product
app.get("/products" , async (req, res) => {
  const products = await prisma.product.findMany()
  console.log(products)
  res.send(products)
})

app.get("/products/:id", async (req, res) => {
  const { id } = req.params
  const product = await prisma.product.findUnique({
    where: {id}
  })
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({message: "Cannot find given id"})
  }
})

app.post("/products", async (req, res) => {
  const data = req.body;
  const product = await prisma.product.create({
    data
  })
  res.send(product)
})

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params
  const data = req.body;

  const product = await prisma.product.update({
    where: {id},
    data
  })
  res.send(product)
})

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params
  const product = await prisma.product.delete({
    where: {id}
  })
  res.send(product)
})

app.listen(process.env.PORT || 3000, () => console.log("Server Started"))
