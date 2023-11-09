
// CAMBIAR  LOS NOMBRES A UN SOLO IDIOMA.

const fs = require('fs');
class ProductManager {
  constructor(fileName) {
    this.fileName = fileName;

    if(fs.existsSync(fileName)){
      try{
        let productos = fs.readFileSync(fileName,"utf-8");
        this.productos = JSON.parse(productos);
      }catch(error){
        this.productos = [];
      }
    }else{
      this.productos = [];
    }
    
  }

  async saveFile(data){
    try{
      await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, '\t' ));
      return true;
    }catch(error){
      console.log("hubo un error")
      return false;
    }
  }

  getProducts() {
    return this.productos;
  }

  async addProduct(producto) {
    const produc = this.productos.find((produc) => produc.code === producto.code);
    if (!produc){  
      if (this.productos.length === 0) {
        producto.id = 1;
      } else {
        // Autoincremental
        producto.id = this.productos[this.productos.length - 1].id + 1;
      }
        this.productos.push(producto);
        
        const resp = await this.saveFile(this.productos);
       
        if(resp){
          console.log('producto creado');
        }else{
          console.log('hubo un error');
        }
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

const manejadorProductos = new ProductManager("./productos.json");

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

manejadorProductos.addProduct(
  new Producto(
    "producto prueba 22",
    "Este es un producto prueba22",
    200,
    "Sin imagen",
    "abc124",
    25
  )
);

console.log(manejadorProductos.getProducts());

console.log("muestra producto del id");
console.log(manejadorProductos.getProductById(1));
