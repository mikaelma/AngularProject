export class Ingredient {
    constructor(
        public quantity: number,
        public measure:string,
        public name: string)
    {}
}

export class Drink {
    constructor(
        public id:number,
        public name:string,
        public ingredients:Array<Ingredient>,
        public authorId:string,
        public authorName:string,
        public description:string,
        public image:string,
        public glass:string,
        public recipe:string)
    {}
}
