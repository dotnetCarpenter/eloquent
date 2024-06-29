using System.Text;

namespace ch02
{
    class Triangle
    {
        static string Loop (int n)
        {
            var s = new StringBuilder ();
            var sq = "";

            for (var c = 0; c < n; c++)
            {
                sq += '#';
                s.Append (sq);
                s.Append ('\n');
            }

            return s.ToString ();
        }

        static void Main(string[] args)
        {
            Console.WriteLine (Loop (7));
        }
    }
}