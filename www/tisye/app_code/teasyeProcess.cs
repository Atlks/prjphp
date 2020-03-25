using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///teasyeProcess 的摘要说明
/// </summary>
/// 
namespace testpkg
{
    public class teasyeProcess : MOLE.account.tyeasye
    {
        public teasyeProcess()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }

        //取得用户名
        override public string getCurUserForAdmin()
        {
            return "test admin";
        }


        //减少账户冻结金额
        override public void donjyMinus(int p, decimal money)
        {
            MOLE.global.tips("donjye minus on test pkg");
        }
    }
}