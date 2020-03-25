using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace mole.tools
{
    class dev
    {
        internal static string geneSqlParam(string s)
        {
            string r = "";
            string[] sa = s.Split(",".ToCharArray());
             foreach ( string item in sa)
	        {
        		 if(r.Equals(""))
                     r="'@"+item+"'";
                 else
                     r=r+",'@"+item+"'";
	        }
             return r;
        }

        internal static string geneSqlParamForUpdate(string s)
        {
            string r = "";
            string[] sa = s.Split(",".ToCharArray());
            foreach (string item in sa)
            {
                if (r.Equals(""))
                    r = item + "='@" + item + "'";   //   gys='@gys'
                else
                    r = r + "," + item + "='@" + item + "'";

            } return r;
        }

        internal static void geneSqlParamReplace(string s)
        {
            string r = "";
            string[] sa = s.Split(",".ToCharArray());
            foreach (string item in sa)
            {
                string s2   = "  sql = sql.Replace(\"@"+item+"\","+item+" );   ";
                Console.WriteLine( s2  );
            }
           

           
            
        }

        internal static void geneCreatTAbleSql(string s)  //for mysql
        {
             string r = "";
            string[] sa = s.Split(",".ToCharArray());
             foreach ( string item in sa)
	        {
                string s2 = " `" + item + "` varchar(50) DEFAULT NULL,";
        		  Console.Write ( s2  );
	        }
        //     return r;
           
                
   
        }
    }
}
