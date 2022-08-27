class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`    
    }

    addMascota(name) {
        this.mascotas.push( name );
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(name, author) {
        let new_book = {nombre:name,autor:author}
        this.libros.push( new_book )
    }

    getBookNames() {
        let books_name_list = [];
        this.libros.map( libro => books_name_list.push( libro.nombre ) );
        return books_name_list;
    }

}

console.log("--> crear usuario de prueba new Usuario('Jorge', 'Pauvels', [{ nombre: 'Creativity S.A', autor: 'Edwin Catmull' }], ['Catalina', 'Clemente'] )");
const usuario_test = new Usuario('Jorge', 'Pauvels', [{ nombre: 'Creativity S.A', autor: 'Edwin Catmull' }], ['Catalina', 'Clemente'] )

console.log('--> ejecuta getFullName()');
console.log( usuario_test.getFullName() );

console.log('--> ejecuta addMascota("OtroGrato")');
usuario_test.addMascota('OtroGrato');

console.log('--> ejecuta countMascotas()');
console.log( usuario_test.countMascotas() );

console.log('--> ejecuta addBook("The 7 Habits of Highly Effective People", "Stephen Covey")');
usuario_test.addBook('The 7 Habits of Highly Effective People', 'Stephen Covey');

console.log('--> ejecuta getBookNames()');
console.log( usuario_test.getBookNames() );