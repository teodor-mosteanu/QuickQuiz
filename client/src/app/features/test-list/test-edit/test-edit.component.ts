import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/core/_services/quiz.service';
import { EditQuestionComponent } from 'src/app/shared/edit-question/edit-question.component';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit {
  id;
  quizName;
  questions;
  correctAnswers=[];
  correctAnswerForm
  questionForm: any ={};

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.quizName=params['test']
    });
    this.getQuestions();
  }

  getQuestions(){
    this.quizService.getQuestionsByTest(this.id).subscribe( (questions) => this.questions = questions );
  }

  viewCorrectAnswer(id) {
    this.quizService.getAnswerByQuestion(id).subscribe ((correctAnswer: {answer: string, questionId:number}) => {
      this.correctAnswers[id] = correctAnswer.answer;
    })
  }

  addQuestion(){
    this.questionForm.quizId=this.id;
    this.quizService.addQuestion(this.questionForm).subscribe((response: {questionId: number}) => {
      this.setCorrectAnswer(response);
    })
  }

  setCorrectAnswer(question){
    this.quizService.setAnswer( this.correctAnswerForm, question.questionId ).subscribe(response => {
      this.getQuestions();
      this.toastr.success("Question has been added")
    })
  }

  deleteQuestion(questionId){
    this.quizService.deleteQuestion(questionId).subscribe (() => {
      this.toastr.success("Question has been deleted")
      this.getQuestions();
    })
  }

  editQuestion(question){
    const dialogRef = this.dialog.open(EditQuestionComponent, {data: question});
    dialogRef.afterClosed().subscribe(result => {
      if (result=='Success') {
        this.getQuestions();
      }
    });
  }

}
