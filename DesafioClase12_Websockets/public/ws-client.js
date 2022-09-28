const productList = document.getElementById('products-list')
const products = [
    {
        "title": "Apple Mac Mini M1",
        "price": "1200",
        "id": 1,
        "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-07-256.png"
    }
]

fetch('http://localhost:8080/products-list-template.hbs')
    .then( data => data.text() )
    .then( data_text => {
        const template = Handlebars.compile(data_text)
        productList.innerHTML = template({products})
    })

