using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GYS.mole.tools
{
    class Num
    {

        public static bool StringIsNumber(string xx)
        {
            if (xx.Equals("")) return false;
            for (int i = 0; i < xx.Length; i++)
            {
                if (!Char.IsNumber(xx[i]))
                    return false;
            }
            return true;
        }
    }
}
