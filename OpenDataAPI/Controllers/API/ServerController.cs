using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using OpenDataAPI.DAL.Context;
using OpenDataAPI.Models;

namespace OpenDataAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly ApiContext _context = null;


        public ServerController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var response = _context.Servers.OrderBy(s => s.Id).ToList();
            return Ok(response);
        }

        [HttpGet("{id}",Name = "GetServer")]

        public IActionResult Get(int id)
        {
            var response = _context.Servers.Find(id);
            return Ok(response);
        }

        [HttpPut("{id}")]

        public IActionResult Message(int id,[FromBody] ServerMessage msg)
        {
            var server = _context.Servers.Find(id);

            if(server == null)
            {
                return NotFound();
            }

            //Refactor: move into the service

            if(msg.Payload == "activate")
            {
                server.IsOnline = true;
            }

            if(msg.Payload == "deactivate")
            {

                server.IsOnline = false;
            }

            _context.SaveChanges();

            return new NoContentResult();
        }



    }
}
