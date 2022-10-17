const socket = io();
const productList = document.getElementById('products-list');
const chatMessagesView = document.getElementById('chat-messages');
const newProductForm = document.getElementById('product-form');
const newMessageForm = document.getElementById('chat-form');
const newMessage = document.getElementById('new-message');

const getReadableTimestamp = () => {
    const addZeros = (number) => number < 10 ? `0${ number }` : number
    let cd = new Date()
    let ts = `${addZeros(cd.getDay())}/${addZeros(cd.getMonth())}/${addZeros(cd.getFullYear())} ${addZeros(cd.getHours())}:${addZeros(cd.getMinutes())}:${addZeros(cd.getSeconds())}`
    return ts
}

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

const updateMessagesList = (messages) => { 
    fetch('/chat-message-template.hbs')
        .then( data => data.text() )
        .then( data_text => {
            const template = Handlebars.compile(data_text)
            chatMessagesView.innerHTML = template(messages)
            chatMessagesView.scrollTop = chatMessagesView.scrollHeight;
    })
    .catch( error => console.warn(error) )
}

socket.on( 'products-update', (data) => updateProductsList(data) )
socket.on( 'messages-update', (data) => updateMessagesList(data) )

newProductForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    newProductForm.reset()
    socket.emit('new-product', inputsData )
})

newMessageForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const inputsData = Object.fromEntries(formData);
    inputsData.timestamp = getReadableTimestamp();
    newMessage.value = '';
    socket.emit('new-message', inputsData )
})