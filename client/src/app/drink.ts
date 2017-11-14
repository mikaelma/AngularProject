export class Ingredient {
    constructor(
        public quantity: number,
        public measure:string,
        public name: string)
    {}
}

export class Drink {
    constructor(
        public name:string,
        public ingredients:Array<Ingredient>,
        public author:string,
        public description:string,
        public image:string,
        public glass:string,
        public recipie:string)
    {}
}