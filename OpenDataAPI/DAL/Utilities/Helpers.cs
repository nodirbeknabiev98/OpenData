using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenDataAPI.DAL.Utilities
{
    public class Helpers
    {
        private static Random  _rand = new Random();

        private static readonly List<string> userStateList = new List<string>
        {
            "TASHKENT",
            "ANDIJON",
            "NAMANGAN",
            "FERGANA",
            "BUKHARA",
            "SAMARKAND",
            "NAVOIY",
            "KARAKALPAKISTAN",
            "KASHKADARYA",
            "SURXANDARYA",
            "TERMEZ",
            "KHRORAZM"

        };

        private static readonly List<string> PrefixList = new List<string>
        {
            "Frog",
            "Captain",
            "s1mple",
            "Sheeran",
            "When",
            "Slow",
            "Quick",
            "Family",
            "University",
            "Computer"
        };

        private static readonly List<string> SuffixList = new List<string>
        {
            "Software",
            "Jazz",
            "Guitar",
            "Music",
            "CSGO",
            "Me",
            "Sorting",
            "Searching",
            "ShortestPath",
            "Emily"
        };

        private static string GetRandom(IList<string> items)
        {
            return items[_rand.Next(items.Count)];
        }

        internal static string GenerateRandomCustomerName(List<string> names)
        {
            string prefix = GetRandom(PrefixList);
            string suffix = GetRandom(SuffixList);
            string fullName = prefix + suffix;
            var maxNumOfNames = PrefixList.Count * SuffixList.Count;

            if(names.Count >= maxNumOfNames)
            {
                throw new System.InvalidOperationException("Maximum Number of unique names exceeded !");
            }

            if(names.Contains(fullName))
            {
                GenerateRandomCustomerName(names);
            }

            return fullName;
        }

        internal static string GenerateRandomCustomerEmail(string customeName)
        {
            return $"contact@{customeName.ToLower()}.com";
        }

        internal static string GenerateRandomState()
        {
            return GetRandom(userStateList);

        }


        internal static decimal GetRandomOrderTotal()
        {
            return _rand.Next(100,7000);
        }

        internal static DateTime GetRandomOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-90);

            TimeSpan possibleSpan = end - start;
            TimeSpan newSpan = new TimeSpan(0, _rand.Next(0, (int)possibleSpan.TotalMinutes), 0);

            return start + newSpan;
        }


        internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
        {

            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(7);
            var timePassed = now - orderPlaced;

            if(timePassed < minLeadTime)
            {
                return null;
            }

            return orderPlaced.AddDays(_rand.Next(7, 14));
        }
    }
}
