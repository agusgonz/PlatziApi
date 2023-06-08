import { faker } from '@faker-js/faker'
import boom from '@hapi/boom'

class productsService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100
  
    for (let i = 0; i < limit; i++) {
      this.products.push({
        index: i,
        id: faker.string.uuid() , 
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        private: faker.datatype.boolean()
      })
    }
  }

  find(size = 100) {
    return this.products.slice(0, size)
  }

  findOne(id) {
    const foundProduct = this.products.find(product => product.id === id)
    if (!foundProduct) {
      throw boom.notFound('Product do no exist')
    }
    if (foundProduct.private) {
      throw boom.conflict('Product is private')
    }

    return foundProduct
  }

  create(content) {
    const { name, price, image } = content
    const newProduct = {
      id: faker.string.uuid(),
      name,
      price,
      image
    }

    this.products.push(newProduct)

    return newProduct
  }

  edit(id, newContent) {
    this.products = this.products.map(product => {
      if (product.id == id) {
        return {
          ...product,
          ...newContent
        }
      }
      return product
    })
    return this.findOne(id)
  }

  delete(id) {
    this.products = this.products.filter(product => product.id != id)
  }
}

export default productsService