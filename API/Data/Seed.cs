using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{ Name = "Restricted"},
                new AppRole{ Name = "View"},
                new AppRole{ Name = "Edit"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            /* In case we want to add more restricted users [TM 07/09/22] */
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();

                await userManager.CreateAsync(user, "Letme1n0");
                await userManager.AddToRoleAsync (user, "Restricted");
            }

            var view = new AppUser
            {
                UserName = "viewuser"
            };

            await userManager.CreateAsync(view, "viewPassw0rd");
            await userManager.AddToRolesAsync(view, new[] {"View"});

            var edit = new AppUser
            {
                UserName = "edituser"
            };

            await userManager.CreateAsync(edit, "editPassw0rd");
            await userManager.AddToRolesAsync(edit, new[] {"Edit"});
        }
        
        public static async Task SeedQuiz(DataContext context) {
             if (await context.Quizzes.AnyAsync()) return;

            var quizData = await System.IO.File.ReadAllTextAsync("Data/QuizSeedData.json");
            var quizzes = JsonSerializer.Deserialize<List<Quiz>>(quizData);

            foreach (var quiz in quizzes) 
            {
                context.Quizzes.Add(quiz);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedQuestions(DataContext context) {
            if (await context.Question.AnyAsync()) return;

            var questionData = await System.IO.File.ReadAllTextAsync("Data/QuestionSeedData.json");
            var questions = JsonSerializer.Deserialize<List<Question>>(questionData);

            foreach (var question in questions) 
            {
                context.Question.Add(question);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedCorrectAnswers(DataContext context) {
             if (await context.CorrectAnswer.AnyAsync()) return;

            var answerData = await System.IO.File.ReadAllTextAsync("Data/AnswerSeedData.json");
            var answers = JsonSerializer.Deserialize<List<CorrectAnswer>>(answerData);

            foreach (var answer in answers) 
            {
                context.CorrectAnswer.Add(answer);
            }

            await context.SaveChangesAsync();
        }
    }
}