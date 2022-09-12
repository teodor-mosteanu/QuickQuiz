using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  public class Question
    {
         [Key]
        public int Id { get; set; }

        public Quiz Quiz { get; set; }

        [ForeignKey("Quiz")]
        [Required]
        public int QuizId { get; set; }

        [Required]
        public string QuestionText { get; set; }

        [Required]
        public string A { get; set; }

        [Required]
        public string B { get; set; }

        [Required]
        public string C { get; set; }

        public string D { get; set; }

        public string E { get; set; }
    }
}