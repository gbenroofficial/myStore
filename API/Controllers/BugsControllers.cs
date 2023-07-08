using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugsController : BaseApiController
    {
        [HttpGet]
        [Route("not-found")]
        public ActionResult GetNotFound(){
            return NotFound();
        }

       
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest(){
            return BadRequest();
        }
        
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorised(){
            return Unauthorized();
        }
        
        [HttpGet("validation-error")]
        public ActionResult GetValidationError(){
            return ValidationProblem();
        }
        
        [HttpGet("server-error")]
        public ActionResult GetServerError(){
           throw new Exception("Server error");
        }
        
    
    }
}