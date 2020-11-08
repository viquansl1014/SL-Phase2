export class Question {
    answer: string=''; // to store answer

    constructor(public id:number,
        public content: string,
        public choices:string[],
        public correct:string){}

    checkAnswer(): boolean{
        return this.answer === this.correct;
    }
}