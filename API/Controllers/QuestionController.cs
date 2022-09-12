using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class QuestionController : BaseApiController
  {
    private readonly DataContext _context;
    public QuestionController(DataContext context)
    {
      _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IEnumerable<Question>> GetQuizQuestions(int Id)
    {
      return await _context.Question.Where(q => q.QuizId == Id).ToListAsync();
    }

    [HttpPost("AddQuestion")]
    public async Task<ActionResult<QuestionDto>> AddQuestion(QuestionDto questionDto)
    {
      var question = new Question 
      {
        QuestionText = questionDto.QuestionText,
        QuizId = questionDto.QuizId,
        A = questionDto.A,
        B = questionDto.B,
        C = questionDto.C,
        D = questionDto.D,
        E = questionDto.E,
      };
      _context.Question.Add(question);
      var result = await _context.SaveChangesAsync();
      if (result == 1) return new QuestionDto {QuestionId = question.Id } ;
      else return BadRequest("Task Failed");
    }

    [HttpPost("DeleteQuestion")]
    public async Task<ActionResult<QuestionDto>> DeleteQuestion(QuestionDto questionDto)
    {
      Question question = _context.Question.Where(q => q.Id== questionDto.QuestionId).First();
      _context.Question.Remove(question);
      var result = await _context.SaveChangesAsync();
      if (result == 1) return new QuestionDto {QuestionId = questionDto.QuestionId};
      else return BadRequest("Task Failed");
    }

    [HttpPost("EditQuestion")]
    public async Task<ActionResult<QuestionDto>> EditQuestion(QuestionDto questionDto)
    {
      Question question = _context.Question.Where(q => q.Id== questionDto.QuestionId).First();
      question.QuestionText = questionDto.QuestionText;
      question.A=questionDto.A;
      question.B=questionDto.B;
      question.C=questionDto.C;
      question.D=questionDto.D;
      question.E=questionDto.E;
      var result = await _context.SaveChangesAsync();
      return new QuestionDto {QuestionId = questionDto.QuestionId};
    }

  }
}