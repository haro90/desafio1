const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = "products.json"; // ruta del archivo de persistencia
    this.loadProducts(); // cargar productos desde el archivo
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      throw new Error("El código de producto ya existe");
    }

    const product = {
      id: this.generateProductId(),
      title,
      description,
      price,
      thumbnail: thumbnail || "Sin imagen",
      code,
      stock,
    };

    this.products.push(product);
    this.saveProducts(); // guardar productos en el archivo
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
    this.saveProducts(); // guardar productos actualizados en el archivo
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    this.products.splice(productIndex, 1);
    this.saveProducts(); // guardar productos actualizados en el archivo
  }

  generateProductId() {
    const productId = this.products.length + 1;
    return productId.toString();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.products = JSON.parse(data);
      if (!Array.isArray(this.products)) {
        this.products = [];
      }
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, "utf-8");
  }
}

module.exports = ProductManager;

///////////TESTING//////////////

const productManager = new ProductManager();

//  ARRAY SOLO [] ///
const products1 = productManager.getProducts();
console.log(products1);

// AGREGAR PRODUCTO///

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

/// ver producto///
const products2 = productManager.getProducts();
console.log(products2);

////agregar segundo producto///

productManager.addProduct(
  "producto prueba 2",
  "Este es el segundo producto de prueba",
  500,
  "Sin imagen",
  "def456",
  20
);

///ver productos///
console.log(productManager.getProducts());

//// obtener por id///
const productId = products2[0].id;
const productById = productManager.getProductById(productId);
console.log(productById);

///update del producto cambio del precio de 200 a 300 id 1 ///

const updatedFields = { price: 300 };
productManager.updateProduct(productId, updatedFields);

const updatedProduct = productManager.getProductById(productId);
console.log(updatedProduct);

///borrar producto  ////
productManager.deleteProduct(productId);

///verificacion de borrado solo se guarda el producto id 2 ///
try {
  productManager.getProductById(productId);
} catch (error) {
  console.log(error.message); // "Producto no encontrado"
}
