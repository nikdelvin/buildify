class FactoryProduct {
    methods: {
        [key: string]: ((...args : any[]) => any)
    }
}

class FactoryBuilder {
    product: FactoryProduct
    methods: Record<string, (...args : any[]) => any>
}

class Factory {
    products: Record<string, FactoryProduct>
    builders: Record<string, FactoryBuilder>
    createProducts<T extends Record<string, FactoryProduct>>(products: T): T {
        this.products = products
        return this.products as typeof products
    }
    createBuilders<T extends Record<string, FactoryBuilder>>(builders: T): T {
        this.builders = builders
        return this.builders as typeof builders
    }
}

class Creational {
    factory: Factory;
    constructor() {
      this.factory = new Factory();
    }
}

class Patterns {
    creational: Creational;
    constructor() {
        this.creational = new Creational();
    }
}

const patterns = new Patterns()

// Use of package examles -->

const newFactory = patterns.creational.factory

const products = newFactory.createProducts({
    productA: {
        methods: {
            method1: () => 'method1-productA',
            method2: (text: string) => `method2-productA + ${text}`,
            method3: () => `method2-productA + ${products.productB.methods.method1()}`,
            method4: (text: string) => `method2-productA + ${text} + ${products.productB.methods.method2(text)}`
        }
    },
    productB: {
        methods: {
            method1: () => 'method1-productB',
            method2: (text: string) => `method2-productB + ${text}`,
            method3: () => `method2-productB + ${products.productA.methods.method1()}`,
            method4: (text: string) => `method2-productA + ${text} + ${products.productA.methods.method2(text)}`
        }
    }
})

console.log(
...[products.productA.methods.method1(),
products.productA.methods.method2('test'),
products.productA.methods.method3(),
products.productA.methods.method4('test')]
)


const builders = newFactory.createBuilders({
    builderA: {
        product: products.productA,
        methods: {
            createPartA: () => 'productA-partA',
            createPartB: () => 'productA-partB'
        }
    }
})