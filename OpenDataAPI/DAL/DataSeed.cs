using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using OpenDataAPI.DAL.Context;
using OpenDataAPI.Models;
using OpenDataAPI.DAL.Utilities;


/*
 dotnet-ef migrations add ChangingServerModel
 dotnet-ef database update 
 */

namespace OpenDataAPI.DAL
{
    public class DataSeed
    {
        private readonly ApiContext _context = null;

        public DataSeed(ApiContext context)
        {
            _context = context;
        }

        public void SeedData(int nCustomers, int nOrders)
        {
            if(!_context.Customers.Any())
            {
                SeedCustomers(nCustomers);
            }

            if (!_context.Orders.Any())
            {
                SeedOrders(nOrders);
            }

            if (!_context.Servers.Any())
            {
                SeedServers();
            }

          
        }

        private void SeedCustomers(int n)
        {
            List<CustomerModel> customers = BuildCustomerList(n);

            foreach(var customer in customers)
            {
                _context.Customers.Add(customer);
            }
            _context.SaveChanges();
        }

        private void SeedOrders(int n)
        {
            List<OrderModel> orders = BuildOrderList(n);
            foreach (var order in orders)
            {
                _context.Orders.Add(order);
            }

            _context.SaveChanges();
        }

        private void SeedServers()
        {
            List<ServerModel> servers = BuildServerList();

            foreach (var server in servers)
            {
                _context.Servers.Add(server);
            }

            _context.SaveChanges();
        }

        private List<CustomerModel> BuildCustomerList(int nCustomers)
        {
            List<CustomerModel> customers = new List<CustomerModel>();
            List<string> names = new List<string>();


            for(var i = 1; i <=nCustomers; i++)
            {
                string name = Helpers.GenerateRandomCustomerName(names);
                names.Add(name);   
                string email = Helpers.GenerateRandomCustomerEmail(name);
                string state = Helpers.GenerateRandomState();
                customers.Add(new CustomerModel
                {
                    Id = i,
                    Name = name,
                    Email = email,
                    State = state
                });
            }

            return customers;
        }


        private List<OrderModel> BuildOrderList(int nOrders)
        {
            List<OrderModel> orders = new List<OrderModel>();

            for (var i = 1; i <= nOrders; i++)
            {
                
                var rand = new Random();
                var randCustomerId = rand.Next(1,_context.Customers.Count());
                var customer = _context.Customers.First(cust => cust.Id == randCustomerId);



                var total = Helpers.GetRandomOrderTotal();
                var placed = Helpers.GetRandomOrderPlaced();
                var completed = Helpers.GetRandomOrderCompleted(placed);

                orders.Add(new OrderModel
                {
                    Id = i,
                    Customer = customer,
                    Total = total,
                    Placed = placed,
                    Completed = completed
                });
            }

            return orders;

        }

        private List<ServerModel> BuildServerList()
        {
            return new List<ServerModel>()
            {
                new ServerModel
                {
                    Id =1,
                    Name = "Dev-Web",
                    IsOnline = true
                },
                new ServerModel
                {
                    Id =2,
                    Name = "Dev-Mail",
                    IsOnline = false
                },
                new ServerModel
                {
                    Id = 3,
                    Name = "Dev-Services",
                    IsOnline = true
                },
                new ServerModel
                {
                    Id =4,
                    Name = "QA-Web",
                    IsOnline = true
                },
                new ServerModel
                {
                    Id =5,
                    Name = "QA-Mail",
                    IsOnline = false
                },
                new ServerModel
                {
                    Id = 6,
                    Name = "QA-Services",
                    IsOnline = true
                },
                 new ServerModel
                {
                    Id =7,
                    Name = "Prod-Web",
                    IsOnline = true
                },
                new ServerModel
                {
                    Id =8,
                    Name = "Prod-Mail",
                    IsOnline = false
                },
                new ServerModel
                {
                    Id = 9,
                    Name = "Prod-Services",
                    IsOnline = true
                }
            };
        }  




    }
}
