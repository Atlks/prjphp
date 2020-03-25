using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MOLE.account;

namespace mole
{
    public partial class Withdrawnote : System.Web.UI.Page
    {

        //此处可注入不同的实现
    // tyeasye c = new testpkg.teasye2();   //另一项目实现
      tyeasye c =new  tyeasye();  //我的项目中的实现
        protected void Page_Load(object sender, EventArgs e)
        {
           
            balance = c.getBalance();
            Label1.Text = c.getCurUser();


        }
        public string balance="";
        protected void Button2_Click(object sender, EventArgs e)
        {
          
            c.teaseyApply(txt_bank.Value, txt_code.Value, txt_name.Value,  txt_money.Value);
            balance = c.getBalance();
            string s="您的提现申请操作已经提交成功，请等待处理！";
          //  MOLE.comm.Alert();
            MOLE.global.tips(s);
        }
}

}