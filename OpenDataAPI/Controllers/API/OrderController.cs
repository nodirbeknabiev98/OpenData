using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using OpenDataAPI.DAL.Context;
using Microsoft.EntityFrameworkCore;
using OpenDataAPI.Models;
using OpenDataAPI.DAL.Utilities;

namespace OpenDataAPI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApiContext _context = null;

        public OrderController(ApiContext context)
        {
            _context = context;
        }


        //GET api/order/pageNumber/pageSize
        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult Get(int pageIndex, int pageSize)
        {

            var data = _context.Orders.Include(ord => ord.Customer).OrderByDescending(cust => cust.Placed);

            var page = new PaginatedResponse<OrderModel>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new
            {
                Page = page,
                TotalPages = totalPages
            };
            return Ok(response);
        }


        [HttpGet("bystate")]

        public IActionResult ByState()
        {
            var orders = _context.Orders.Include(ord => ord.Customer).ToList();

            var groupedResult = orders.GroupBy(ord => ord.Customer.State)
                .ToList()
                .Select(grp => new { State = grp.Key, Total = grp.Sum(x => x.Total) })
                .OrderByDescending(res => res.Total)
                .ToList();

            return Ok(groupedResult);
        }



        [HttpGet("bycustomer/{n}")]
        public IActionResult ByCustomer(int n)
        {
            var orders = _context.Orders.Include(ord => ord.Customer).ToList();

            var groupedResult = orders.GroupBy(ord => ord.Customer.Id)
                .ToList()
                .Select(grp => new { Name = _context.Customers.Find(grp.Key).Name, Total = grp.Sum(x => x.Total) })
                .OrderByDescending(res => res.Total)
                .Take(n) 
                .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("GetOrder/{id}",Name = "GetOrder")]

        public IActionResult GetOrder(int id)
        {
            var order = _context.Orders.Include(ord => ord.Customer).First(ord => ord.Id == id);

            return Ok(order);
        }


    }
}
