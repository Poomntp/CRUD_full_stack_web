import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

app.get("/cars", async (req, res) => {
  const car = await prisma.car.findMany();

  res.send(car);
});

app.get("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const car = await prisma.car.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(car);
});

app.post("/cars", async (req, res) => {
  const newCar = req.body;
  const car = await prisma.car.create({
    data: {
      licenseNo: newCar.licenseNo,
      carBrand: newCar.carBrand,
      carModel: newCar.carModel,
      note: newCar.note,
      createdBy: newCar.createdBy,
      updatedBy: newCar.updatedBy,
    },
  });

  res.send({
    data: car,
    message: "Car created successfully",
  });
});

app.delete("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const car = await prisma.car.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send({
    data: car,
    message: `Car ${id} deleted successfully`,
  });
});

app.put("/cars/:id", async (req, res) => {
  const { id } = req.params;
  const updateCar = req.body;
  const car = await prisma.car.update({
    where: {
      id: parseInt(id),
    },
    data: {
      licenseNo: updateCar.licenseNo,
      carBrand: updateCar.carBrand,
      carModel: updateCar.carModel,
      note: updateCar.note,
      updatedBy: updateCar.updatedBy,
    },
  });

  res.send({
    data: car,
    message: `Car ${id} updated successfully`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
