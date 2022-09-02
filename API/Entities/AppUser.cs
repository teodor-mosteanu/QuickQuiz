using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        /* .Net recognizes naming convention and makes it a PK [TM 01/09/22] */
        public int Id { get; set; }
        public string UserName { get; set; }
    }
}