export class Usuario {
    //metodo estatico que regrese una nueva instancia del usuario
    static fromFirebase({email, uid, nombre}:any){
        return new Usuario(uid, nombre,email)

    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}
}