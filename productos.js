class ProductManager {
  constructor() {
    this.productos = [];
  }

  getProducts() {
    return this.productos;
  }

  addProduct(producto) {
    if (!this.productos.includes(producto.code)) {  
      if (this.productos.length === 0) {
        producto.id = 1;
      } else {
        // Autoincremental
        producto.id = this.productos[this.productos.length - 1].id + 1;
      }
        this.productos.push(producto);
      }else {
      return "ya existe el codigo";
    }
  }

  getProductById(idProducto) {
    const prod = this.productos.find((prod) => prod.id === idProducto);

    if (!prod) {
      return "No existe el Producto con el ID solicitado";
    } else {
      return prod;
    }
  }
}

class Producto {
  // constructor
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

// Pruebas

const manejadorProductos = new ProductManager();

manejadorProductos.addProduct(
  new Producto(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

manejadorProductos.addProduct(
  new Producto(
    "producto prueba 22",
    "Este es un producto prueba22",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(manejadorProductos.getProducts());

console.log("muestra producto del id");
console.log(manejadorProductos.getProductById(2));
