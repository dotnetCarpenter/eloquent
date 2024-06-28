using System.Text;

namespace ch02
{
    class Program
    {
        static string Fizzbuzz (int n)
        {
            var s = new StringBuilder ();

            if (n % 3 == 0) s.Insert (0, "Fizz");
            if (n % 5 == 0) s.Append ("Buzz");
            if (s.Length == 0) s.Insert (0, n);

            return s.ToString ();
        }

        static void Main(string[] args)
        {
            for (var c = 1; c <= 30; c++)
            {
                Console.WriteLine(Fizzbuzz (c));
            }
        }
    }
}