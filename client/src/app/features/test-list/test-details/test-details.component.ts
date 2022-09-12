import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/core/_models/quiz.interface';
import { QuizService } from 'src/app/core/_services/quiz.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit {
  id;
  testName;
  questions;
  correctAnswers = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.testName = params['test'];
    });
    this.quizService
      .getQuestionsByTest(this.id)
      .subscribe((questions) => (this.questions = questions));
  }

  viewCorrectAnswer(id) {
    this.quizService
      .getAnswerByQuestion(id)
      .subscribe((correctAnswer: { answer: string; questionId: number }) => {
        this.correctAnswers[id] = correctAnswer.answer;
      });
  }
}
