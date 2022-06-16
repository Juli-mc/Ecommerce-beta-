let menu = document.querySelector( '.menu' );
let btn = document.querySelector( '.menu-btn' );
btn.addEventListener('click', () => {
    menu.classList.toggle('active')
})
let menu_i = document.querySelectorAll('.menu-i');

menu_i.forEach(element => {element.addEventListener('click', () => {
    menu.classList.toggle('active')
} )})


const items = [
    {
      id: 1,
      name: 'Consola Play Station 5 1TB',
      price: 599.99,
      image: 'https://exitocol.vtexassets.com/arquivos/ids/9154827/consola-sony-playstation-5-ps5-825gb-lector-de-disco.jpg?v=637631028231230000',
      category: 'Consolas',
      quantity: 10
    },
    {
      id: 2,
      name: 'Call of Duty MWII',
      price: 99.99,
      image: 'https://www.psfanatic.com/wp-content/uploads/2022/05/CoD-MW2-PS5-cover.jpg',
      category: 'Videojuegos',
      quantity: 15
    },
    {
      id: 3,
      name: 'Control Dualshock 5',
      price: 119.99,
      image: 'https://m.media-amazon.com/images/I/61OkCVHqZvS._SL1500_.jpg',
      category: 'Consolas',
      quantity: 20
    },
    {
      id: 4,
      name: 'FIFA 22',
      price: 29.99,
      image: 'https://areajugones.sport.es/wp-content/uploads/2021/07/captura-ps5.jpg',
      category: 'Videojuegos',
      quantity: 10
    },
    {
        id: 5,
        name: 'PS PLUS 1 AÑO',
        price: 49.99,
        image: 'https://m.media-amazon.com/images/I/71pnUgWDeGL._AC_SL1500_.jpg',
        category: 'Videojuego',
        quantity: 20
    },

]

let cartIcon = document.querySelector(".cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".products-list")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []

document.addEventListener("DOMContentLoaded", () =>{
mostrarProductos()
})



let themeIcon = document.getElementById("theme-toggler")
let body = document.querySelector("body")

themeIcon.addEventListener( 'click', (e) =>{
    body.classList.toggle("dark-theme")
    themeIcon.classList.replace("dark-theme")

    let esDark = body.classList.contains("dark-theme")
    if (esDark){
        themeIcon.classList.replace("fa-moon", "fa-sun")
    }else{
        themeIcon.classList.replace("fa-sun", "fa-moon")
    }

})

cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("mostrar")
})

document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
})


function mostrarProductos(){
    let fragmentHTML = ""

    items.forEach((product)  =>{
        fragmentHTML += `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-container">
                <img src=${product.image} alt="" class="product-img">
            </div>
            <p>$${product.price}</p>
            <button data-id="${product.id}" class="product-button">
            <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>
        `
    })
    listProducts.innerHTML = fragmentHTML

    let productsButton = document.querySelectorAll(".product-button")
    console.log(productsButton)

    
    productsButton.forEach( (button) =>{
        button.addEventListener("click", (evento) =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            
            agregarProducto(product)
            /*cart.push( product )
            console.log((cart))*/
        })
    })
}
    
function agregarProducto(producto){
    let resultadoFind = cart.find( item=> item.id === producto.id )

    if(resultadoFind){
        let stock = cart[resultadoFind.index].quantity
        let quantitySelected = cart[resultadoFind.index].quantitySelected
        if ( stock > quantitySelected){
            cart[resultadoFind.index].quantitySelected += 1
        }else{
            alert( "Lo sentimos, se agotaron las unidades " )
        }
        
        
        cart[resultadoFind.index].quantitySelected += 1

    }

    else{
        producto.quantitySelected = 1
        producto.index = cart.length

        cart.push(producto)

    }
    console.log(cart)
    mostrarProductosCart()
}

function mostrarProductosCart(){
    let fragmentoHTML = ``
    let suma = 0
    let cantidadTotal = 0

    cart.forEach( item =>{
        fragmentoHTML += `
        <div class="cart-item">
            <img src=${item.image} alt="">
            <p>${item.name}</p>
            <small>Unidad(es): ${item.quantitySelected}</small>
        </div>
        `
        let totalProducto = item.quantitySelected*item.price
        suma += totalProducto

        cantidadTotal += item.quantitySelected
    })

    fragmentoHTML += `
    <div class="cart-price">
        <p>Unidades totales:${ cantidadTotal }</p>
        <p>$${'Total '+suma }</p>
    </div>
    `

    cartContainer.innerHTML = fragmentoHTML
    cartCount.textContent = cantidadTotal

}




