const socket = io();
const productList = document.getElementById('products-list');
const newProductForm = document.getElementById('product-form');

const deleteProduct = (id) => socket.emit( 'delete-product', id )

const updateProductsList = (products) => { 
    fetch('/products-list-template.hbs')
    .then( data => data.text() )
    .then( data_text => {
        const template = Handlebars.compile(data_text)
        productList.innerHTML = template(products)
    })
    .catch( error => console.warn(error) )
}

socket.on( 'products-update', (data) => updateProductsList(data) )

newProductForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    newProductForm.reset()
    socket.emit('new-product', inputsData )
})