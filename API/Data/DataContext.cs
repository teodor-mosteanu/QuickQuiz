using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class DataContext : IdentityDbContext<
  AppUser, AppRole, int, 
  IdentityUserClaim<int>, AppUserRole, 
  IdentityUserLogin<int>, IdentityRoleClaim<int>, 
  IdentityUserToken<int> >
  {
    public DataContext(DbContextOptions options) : base(options)
    { 
    }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Question { get; set; }
    public DbSet<CorrectAnswer> CorrectAnswer { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<AppUser>()
      .HasMany(ur => ur.UserRoles)
      .WithOne(u => u.User)
      .HasForeignKey(ur => ur.UserId)
      .IsRequired();

      builder.Entity<AppRole>()
      .HasMany(ur => ur.UserRoles)
      .WithOne(u => u.Role)
      .HasForeignKey(ur => ur.RoleId)
      .IsRequired();

      builder.Entity<Question>()
      .HasOne(e => e.Quiz)
      .WithMany()
      .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<CorrectAnswer>()
      .HasOne(e => e.Question)
      .WithMany()
      .OnDelete(DeleteBehavior.Cascade);
    }

  }
}