using System.Text;

namespace ch02
{
    class Program
    {
        static string Fizzbuzz (int n)
        {
            var s = "";

            if (n % 3 == 0) s = "Fizz";
            if (n % 5 == 0) s += "Buzz";
            if (s.Length == 0) s = n.ToString ();

            return s;
        }

        static void Main(string[] args)
        {
            var output = new StringBuilder ();

            for (var c = 1; c <= 30; c++)
            {
                output.Append (Fizzbuzz (c) + "\n");
            }

            Console.WriteLine (output);
        }
    }
}