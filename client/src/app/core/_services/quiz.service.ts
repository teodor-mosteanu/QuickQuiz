import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuizes() {
    return this.http.get(this.baseUrl + 'quiz');
  }

  addQuiz(name) {
    return this.http.post(this.baseUrl + 'quiz/AddQuiz', { name: name });
  }

  deleteQuiz(id) {
    return this.http.post(this.baseUrl + 'quiz/DeleteQuiz', { id: id });
  }

  addQuestion(form) {
    return this.http.post(this.baseUrl + 'question/AddQuestion', {
      questionText: form.questionText,
      quizId: form.quizId,
      a: form.A,
      b: form.B,
      c: form.C,
      d: form.D,
      e: form.E,
    });
  }

  deleteQuestion(questionId) {
    return this.http.post(this.baseUrl + 'question/DeleteQuestion', {
      questionId: questionId,
    });
  }

  updateQuestion(question) {
    return this.http.post(this.baseUrl + 'question/EditQuestion', {
      questionText: question.questionText,
      a: question.a,
      b: question.b,
      c: question.c,
      d: question.d,
      e: question.e,
      QuestionId: question.id,
    });
  }

  setAnswer(correctAnswer, questionId) {
    return this.http.post(this.baseUrl + 'CorrectAnswer/AddCorrectAnswer', {
      questionId: questionId,
      answer: correctAnswer,
    });
  }

  updateAnswer(correctAnswer, answerId) {
    return this.http.post(this.baseUrl + 'CorrectAnswer/UpdateCorrectAnswer', {
      Questionid: answerId,
      Answer: correctAnswer,
    });
  }
  getQuestionsByTest(id) {
    return this.http.get(this.baseUrl + 'question/' + id);
  }

  getAnswerByQuestion(id) {
    return this.http.get(this.baseUrl + 'CorrectAnswer/' + id);
  }
}
