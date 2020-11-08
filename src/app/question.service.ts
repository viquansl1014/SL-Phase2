import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './model.question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient:HttpClient) { }

  loadProductDetails():Observable<Question[]>{
    return this.httpClient.get<Question[]>("http://localhost:3000/Questions");
  }
}
