using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class CorrectAnswerController: BaseApiController
    {
    private readonly DataContext _context;

    public CorrectAnswerController(DataContext context)
    {
      _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CorrectAnswer>> GetQuestionAnswer(int Id)
    {
      return await _context.CorrectAnswer.SingleAsync(a=> a.QuestionId == Id);
    }

    [HttpPost("AddCorrectAnswer")]
    public async Task<ActionResult<CorrectAnswerDto>> AddCorrectAnswer(CorrectAnswerDto correctAnswerDto)
    {
      var correctAnswer = new CorrectAnswer 
      {
        QuestionId = correctAnswerDto.QuestionId,
        Answer = correctAnswerDto.Answer
      };
      _context.CorrectAnswer.Add(correctAnswer);
      var result = await _context.SaveChangesAsync();
      if (result == 1) return new CorrectAnswerDto {Id = correctAnswer.Id } ;
      else return BadRequest("Task Failed");
    }

    [HttpPost("UpdateCorrectAnswer")]
    public async Task<ActionResult<CorrectAnswerDto>> UpdateCorrectAnswer(CorrectAnswerDto correctAnswerDto)
    {
      CorrectAnswer answer = _context.CorrectAnswer.Where(a =>a.QuestionId == correctAnswerDto.QuestionId).First();
      answer.Answer=correctAnswerDto.Answer;
      var result = await _context.SaveChangesAsync();
      return new CorrectAnswerDto {Id = answer.Id };
    }
  }
}