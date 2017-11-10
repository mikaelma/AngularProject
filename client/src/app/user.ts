export class User {
    constructor(
        public fname:string,
        public sname:string,
        public email:string,
        public favDrinks:Array<string> = null,
        public createdDrinks:Array<string> = null)
        {}
}
