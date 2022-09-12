using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class QuizController : BaseApiController
    {
    private readonly DataContext _context;

    public QuizController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quiz>>> GetQuiz()
    {
        return await _context.Quizzes.ToListAsync();
    }

    [HttpPost("addQuiz")]
    public async Task<ActionResult<QuizDto>> AddQuiz(QuizDto quizDto)
    {
      if (quizDto.Name == null) return BadRequest("Please add a name");

      var quiz = new Quiz {Name = quizDto.Name};

      _context.Quizzes.Add(quiz);
      var result = await _context.SaveChangesAsync();
      if (result == 1) return new QuizDto {Name = quizDto.Name};
      else return BadRequest("Task Failed");
    }

    [HttpPost("deleteQuiz")]
    public async Task<ActionResult<QuizDto>> DeleteQuiz(QuizDto quizDto)
    {
      Quiz quiz = _context.Quizzes.Where(q => q.Id == quizDto.Id).First();
      _context.Quizzes.Remove(quiz);
      var result = await _context.SaveChangesAsync();
      if (result == 1) return new QuizDto {Name = quizDto.Name};
      else return BadRequest("Task Failed");
    }
  }
}