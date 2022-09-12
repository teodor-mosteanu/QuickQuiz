import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Quiz } from 'src/app/core/_models/quiz.interface';
import { AccountService } from 'src/app/core/_services/account.service';
import { QuizService } from 'src/app/core/_services/quiz.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  @ViewChild('newQuizForm') newQuizForm: NgForm;
  tests: Quiz;
  newQuizName: any ={};

  constructor(private quizService:QuizService, private router: Router) {

   }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes(){
    this.quizService.getQuizes().subscribe( (tests: Quiz) =>{
      this.tests = tests
    })
  }

  editTest(testId, testName){
    this.router.navigate(['/testEdit/', testName, testId]);
  }

  viewTest(testId, testName) {
    this.router.navigate(['/testView/', testName, testId]);
  }

  addTest(){
    this.quizService.addQuiz(this.newQuizName.quizName).subscribe(() => {
      this.getQuizzes();
      this.newQuizForm.resetForm();
    })
  }

  deleteTest(id){
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuizzes();
    })
  }

}
