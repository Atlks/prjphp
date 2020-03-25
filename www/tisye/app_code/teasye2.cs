using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///teasye2 的摘要说明
///ati
///2012.7.5  
///提现动作接口 
/// </summary>
/// 

namespace testpkg
{
    public class teasye2 : MOLE.account.tyeasye
    {
        public teasye2()
        {


        }

        //取得用户名
      override  public string getCurUser()
        {
            return "att";
        }

      //取得账户余额
      override public string getBalance()
       {
            return "888";
      }

        //提现申请合冻结此部分金额
      override public void donjy(Decimal money2)
      {

          Console.WriteLine("================= donjy " + money2);
          MOLE.App.Log.Add("donjy", "================= donjy " + money2);
      }
    }
}