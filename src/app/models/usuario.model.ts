export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public pass: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public _id?: string
    ){}
}