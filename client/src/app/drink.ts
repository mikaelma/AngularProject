export class Ingredient {
    constructor(
        public measure: number,
        public name: string)
    {}
}

export class Drink {
    constructor(
        public id:number,
        public name:string,
        public ingredients:Array<Ingredient>,
        public author:string,
        public description:string,
        public image:string,
        public glass:string,
        public recipie:string)
    {}
}