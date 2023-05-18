class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1; // contador de ids
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

  generateProductId() {
    const productId = this.productIdCounter;
    this.productIdCounter++;
    return productId.toString();
  }
}

///////////// TESTING DE LA AGINA DE ENTREGA ( PROCESO DE TESTING) //////////////////////////////////////////

const productManager = new ProductManager();

console.log(productManager.getProducts()); // ARRAY VACIO

// Agregar el producto primero
try {
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log("Producto agregado satisfactoriamente"); //generado con un 1 automatico
} catch (error) {
  console.error("Error al agregar producto:", error.message);
}

console.log(productManager.getProducts());

//OTRA AGREGADA DE ADD PRODUCT PARA QUE SALGA ERROR POR QUE EL CODIGO YA EXISTE//

try {
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log("Producto agregado satisfactoriamente");
} catch (error) {
  console.error("Error al agregar producto:", error.message);
}

////QUE GetProductById devuelva error si no se encuentrao el producto en caso de encontrarlo///////
// Obtener un producto por su id (debe arrojar un error porque no existe)
try {
  const product = productManager.getProductById("123456"); ///no existe es id
  console.log("Producto encontrado:", product);
} catch (error) {
  console.error("No existe el id:", error.message);
}

//producto por su id
try {
  const product = productManager.getProductById(
    productManager.getProducts()[0].id
  );
  console.log("Producto encontrado:", product);
} catch (error) {
  console.error("Error al obtener producto:", error.message);
}

//////////// si se cambia el CODE si se agrega el producto con id automatico
try {
  productManager.addProduct(
    "producto prueba3",
    "Este es un producto prueba3",
    15,
    "Sin imagen",
    "444rf",
    582
  );
  console.log("Producto agregado satisfactoriamente");
} catch (error) {
  console.error("Error al agregar producto:", error.message);
}

console.log(productManager.getProducts()); /////muestra todo los objetos dentro del array
