using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using zyn_hy_login;
using MOLE.Bill;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      //  Session["istest"] = true;
        Label1.Text = MOLE.global.istest.ToString();
        Label1.Text = zyn_hy_login.DBCommon.strConnectstring;
 
            Label3.Text = WWW.SST.LIB.CommV2.GetUname();
            try
            {
                Label4.Text = Request.Cookies["userid"].Value;

            }catch(Exception ex){}
            try
            {
                Label5.Text = Request.Cookies["username"].Value;

            }
            catch (Exception ex) { }




            string s = "CaiZ_Name,CaiZhong_Id,CaiZhong_Id2,Hy_Num,Hy_Name,QiHao,Number,zhushu,Multiple,Unitprice,Totalprice,zhuihao,Addtime,Dg_MD5,cac,rnd";
         string s2=   mole.tools.dev.geneCreatTAbleSqlForSql(s, "daigou", "id");
         Response.Write(s2);


         zyn_hy_login.SecurityZ8 yz = new zyn_hy_login.SecurityZ8();
         Response.Write("<p>");
         Response.Write(yz.Encrypt("admin"));
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        MOLE.global.istest = false;
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        MOLE.global.istest = true;
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        Session["hy_num"] = "1";
        Session["hy_name"] = "attilax";
          Response.Cookies["hy_num"].Value=   "1";
          Response.Cookies["hy_name"].Value = "attilax";


        //manager
          Response.Cookies["userid"].Value = "1";
          Response.Cookies["username"].Value = "admin";
    }
    protected void Button4_Click(object sender, EventArgs e)
    {
        Session["hy_num"] = "";
        Response.Cookies["hy_num"].Value = "";
        Response.Cookies["hy_name"].Value = "";
    }
    protected void Button5_Click(object sender, EventArgs e)
    {
        string uname = TextBox1.Text.Trim();
        Account a = new Account();
        a.iniacc(uname);
        Label6.Text = " ini acc " + uname;
    }
}