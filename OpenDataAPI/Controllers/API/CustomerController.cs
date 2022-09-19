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
    public class CustomerController : ControllerBase
    {
        private readonly ApiContext _context = null;

        public CustomerController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.Customers.OrderBy(c => c.Id);

            return Ok(data);
        }

        [HttpGet("{id},Name = GetCustomer")]

        public IActionResult Get(int id)
        {
            var customer = _context.Customers.Find(id);

            return Ok(customer);
        }

        [HttpPost]

        public IActionResult Post([FromBody] CustomerModel customer)
        {
            if(customer == null)
            {
                return BadRequest();
            }

            _context.Add(customer);
            _context.SaveChanges();

            return CreatedAtRoute("GetCustomer", new { id = customer.Id }, customer);
        }



    }
}
