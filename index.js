class Item {
    constructor(item) {
        this.img = item.img,
            this.imgS = item.imgS,
            this.name = item.name,
            this.price = item.price,
            this.count = item.count,
            this.text = item.text,
            this.id = item.ID

    }
}

class ProductItem {
    constructor() {
        this.catalogItem = [],
            this.getJson()
                .then(data => this.getProducts(data))
    }
    getJson() {
        return fetch("/products.json")
            .then(data => data.json())
            .catch(error => { console.log(error) })
    }
    getProducts(data) {
        this.catalogItem = [...data]
        this.addBlock()
    }
    addBlock() {
        const block = document.querySelector('.box-list');
        block.addEventListener('click', function (event) {
            if (event.target.closest('.btn-item')) {
                getCartItem()


            }
        })

        this.catalogItem.forEach(item => {
            let product = new Item(item)
            block.insertAdjacentHTML("beforeend", this.render(product))
        })
    }
    render(product) {
        return `
    <div class="box-item">
        <h3 class="box-item__title">${product.name}</h3>
        <img class="box-item__img " src="${product.img}">
        <p class="box-item__text">${product.text}</p>
        <span> Цена:<span>${product.price}</span></span>
        <button class="btn-item" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-imgS="${product.imgS}" data-count="${product.count}">купить</button>
    </div>
`
    }
}

class CartItem {
    constructor(e, products) {
        this.allProducts = products
        this.initItem(e.target)
        this.totalPrice = 10
    }
    initItem(e) {
        let result = this.allProducts.find(item => item.id === e.dataset.id);
        if (result) {
            result.count++
            result.price = Number(result.price) + Number(e.dataset.price)
            this.addCounter(result)
        }
        else {
            let item = {
                name: e.dataset.name,
                ID: e.dataset.id,
                count: 1,
                price: e.dataset.price


            }
            this.renderBlock(item)
        }
    }
    renderBlock(item) {
        const block = document.querySelector('.cart-list')
        let product = new Item(item);
        this.allProducts.push(product)
        block.insertAdjacentHTML('beforeend', this.render(product))
        const cart = document.querySelectorAll('.btn-box')
        let x = cart.length - 1

        const btnplus = document.createElement('button');

        btnplus.onclick = this.add;
        btnplus.className = "btn count-plus"
        btnplus.innerHTML = `+`
        btnplus.dataset.count = product.count
        btnplus.dataset.id = product.id
        btnplus.dataset.price = product.price
        cart[x].append(btnplus);

        const btnminus = document.createElement('button');

        btnminus.onclick = this.remove;
        btnminus.className = "btn count-minus"
        btnminus.innerHTML = `-`
        btnminus.dataset.count = product.count
        btnminus.dataset.id = product.id
        btnminus.dataset.price = product.price
        cart[x].append(btnminus);

    }


    addCounter(e) {
        let block = document.querySelector(`.cart-count[data-id="${e.id}"]`);
        let sum = document.querySelector(`.price[data-id="${e.id}"]`);
        let totalPriceBlock = document.querySelector(`.total-price`);
        let count = this.allProducts.forEach(item => {
            if (item.id === e.id) {
                block.innerHTML = e.count
                sum.innerHTML = e.price
            }
        })

    }
    add(e) {
        let block = document.querySelector(`.cart-count[data-id="${e.target.dataset.id}"]`);
        let sum = document.querySelector(`.price[data-id="${e.target.dataset.id}"]`);
        let totalPriceBlock = document.querySelector(`.total-price`);
        let priceItems = document.querySelectorAll(`.price`);
        let count = allProducts.forEach(item => {
            if (item.id === e.target.dataset.id) {

                item.count++
                item.price = Number(item.price) + Number(e.target.dataset.price)
                block.innerHTML = item.count
                sum.innerHTML = item.price
                let totalPrice = 0;
                priceItems.forEach(item => {

                    totalPrice += Number(item.innerHTML)
                })
                this.totalPrice = totalPrice
                totalPriceBlock.innerHTML = this.totalPrice
            }
        })
    }
    remove(e) {
        let block = document.querySelector(`.cart-count[data-id="${e.target.dataset.id}"]`);
        let sum = document.querySelector(`.price[data-id="${e.target.dataset.id}"]`);
        let totalPriceBlock = document.querySelector(`.total-price`);
        let find = allProducts.find(item => item.id === e.target.dataset.id);
        if (find.count > 1) {
            find.count--
            find.price = Number(find.price) - Number(e.target.dataset.price)
            block.innerHTML = find.count
            sum.innerHTML = find.price
            this.totalPrice = Number(totalPriceBlock.textContent)
            this.totalPrice -= Number(e.target.dataset.price)
            totalPriceBlock.innerHTML = this.totalPrice

        }
        else {
            allProducts.splice(allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${e.target.dataset.id}"]`).remove()
        }
    }


    render(item) {
        return `
        <div class="cart-item" data-id="${item.id}">
            <h3 class="cart-title">${item.name}</h3>
            <img class="cart-img" src="${item.imgS}" alt="">
            <span class="cart-count" data-id="${item.id}">${item.count}</span>
            <span>стоимость:</span><span data-id="${item.id}" class="price">${item.price}</span>
            <div class="btn-box">
                
            </div>
        </div>
    `
    }


}


let item
function getCartItem() {
    item = new CartItem(event, allProducts)
}
let product = new ProductItem()
const allProducts = [];
console.log(CartItem)


