import { Component, OnInit } from '@angular/core';
import { Question } from '../model.question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  // logical variables
  currentQuestion: number = 1;
  numOfQuestions: number = 10;
  questionList: Question[];
  correctAnswers: number =0;

  // view state control variable
  submitable: boolean = false;
  resultAvailable: boolean = false;
  show: boolean= false;

  
  loadData(){
    // get question from json file
    // NOTE: run on json-server   
    this.questionService.loadProductDetails().subscribe(data=>{
      this.numOfQuestions = data.length;      
      this.questionList=data;

    });
    
    // the value doesn't seem to update until its out of ngoninit()
    console.log(this.numOfQuestions +' question(s) loaded');

  } 

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    let test = new Question(1,"what is abc", ["a","b"], "b");
    test.answer = "b";
    console.log(typeof (test));
    console.log(test.checkAnswer());

    this.loadData();
  }

  back(){

    this.currentQuestion--; // button disabled on range limit
    
  }
  next(){

    this.currentQuestion++; // button disabled on range limit

    // enable submit on the last question
    if (this.currentQuestion == this.numOfQuestions){
      this.submitable = true;
    }

  }
  select(option: string){
    
    //alert(option + " selected!");
    // register selection into the thing
    this.questionList[this.currentQuestion-1].answer = option;
  }

  submit(){
    // when the user hit the submit button 
    console.log("Submitted");
    let i: number =0;

    // please check if there is any answer left unanswered
    let answered: boolean = true;
    let uQuestionIndex:number =1;
    for (i =0; i < this.questionList.length; i ++){
      if (!this.questionList[i].answer){
        console.log(i+" unanswered");
        uQuestionIndex =i;
        answered = false;
        break;
      }
    }
    
    if (!answered){
      if(confirm("Some of the questions left unanswered. Do you wish to submit?")){
        
        answered=true;

      }else if(confirm("Review unanswered question?")){
        this.currentQuestion = uQuestionIndex+1;
      }
    }


    // NOTE: dont use else because the user can decide to just submit or comeback 
    if (answered){
      // show result.
      for (i =0; i < this.questionList.length; i ++){
        /*
        // checkAnswer weren't reconized as a function. Could be because of not the same type.
        if (this.questionList[i].checkAnswer()== true){
          this.correctAnswer +=1;
        }
        */
        console.log(this.questionList[i].answer +":"+ this.questionList[i].correct);
        if (this.questionList[i].answer === this.questionList[i].correct){
          this.correctAnswers += 1;
        }
      }
      
      this.resultAvailable = true;
      //alert(this.correctAnswers+"/"+this.questionList.length);
      
    }
    
  }

  showAnswer(){
    // render all questions with correct answer and your answer
    this.show = true;
  }
}
