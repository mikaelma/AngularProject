export class User {
    constructor(
        public firstName:string,
        public lastName:string,
        public email:string,
        public favouriteDrinks:Array<string> = null,
        public createdDrinks:Array<string> = null)
        {}
}
