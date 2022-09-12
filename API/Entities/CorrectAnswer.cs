using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  public class CorrectAnswer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Answer { get; set; }

        public Question Question { get; set; }

        [ForeignKey("Question")]
        [Required]
        public int QuestionId { get; set; }
    }
}