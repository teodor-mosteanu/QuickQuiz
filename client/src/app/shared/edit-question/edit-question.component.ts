import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/core/_services/quiz.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
  correctAnswerForm;
  questionForm: any = {};
  correctAnswers = [];
  answerId;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private quizService: QuizService,
    public dialogRef: MatDialogRef<EditQuestionComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.data;
    this.getCorrectAnswer(this.questionForm.id);
  }

  getCorrectAnswer(id) {
    this.quizService
      .getAnswerByQuestion(id)
      .subscribe(
        (correctAnswer: { answer: string; questionId: number; id: number }) => {
          this.correctAnswerForm = correctAnswer.answer;
          this.answerId = correctAnswer.id;
        }
      );
  }

  saveQuestion() {
    this.quizService.updateQuestion(this.questionForm).subscribe((response) => {
      this.updateCorrectAnswer(this.answerId);
    });
  }

  updateCorrectAnswer(answerId) {
    this.quizService
      .updateAnswer(this.correctAnswerForm, answerId)
      .subscribe((response) => {
        this.toastr.success('All changes have been made');
        this.dialogRef.close('Success');
      });
  }
}
