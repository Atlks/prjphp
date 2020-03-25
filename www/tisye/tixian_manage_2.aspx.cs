
#region
//using System;
//using System.Collections;
//using System.ComponentModel;
//using System.Data;
//using System.Drawing;
//using System.Web;
//using System.Web.SessionState;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.Web.UI.HtmlControls;
//using CoreClass;
//
//namespace Cm818.com.Zh_MI
//{
//	/// <summary>
//	/// 2007.4.4为了满足时时彩客户的支付宝提现要求开发的，主要是增加显示支付宝账户
//	/// </summary>
//	public class tixian_manage_2 : System.Web.UI.Page
//	{
//		protected System.Web.UI.WebControls.DataGrid wd_DataGrid;
//		protected System.Web.UI.HtmlControls.HtmlInputHidden deletehid;
//		protected System.Web.UI.HtmlControls.HtmlInputHidden fanhui;
//		protected System.Web.UI.HtmlControls.HtmlInputHidden hid_edit;
//		protected System.Web.UI.HtmlControls.HtmlInputHidden Hidden_zt;
//		protected System.Web.UI.HtmlControls.HtmlInputHidden Hidden_id;
//		protected System.Web.UI.WebControls.TextBox TextBox1;
//		protected System.Web.UI.WebControls.Button Btn_serch;
//		protected System.Web.UI.WebControls.DropDownList ddlPay;
//		protected System.Web.UI.WebControls.TextBox txtTime1;
//		protected System.Web.UI.WebControls.TextBox txtTime2;
//		protected System.Web.UI.WebControls.Button Button3;
//		protected BillySir.Web.UI.WebControls.ChangePage PageChange;
//		public int pgsize;
//	
//		private void Page_Load(object sender, System.EventArgs e)
//		{
//
////			for(int i=0; i< Request.Cookies.Count; i++)
////			{
////				string bb = Request.Cookies[i].Name;
////				string bbb = Request.Cookies[i].Value;
////				string cc = bbb;
////			}
//
//
//
//
//
////			//验证是否登录
//			//验证是否登录
////			if(Request.Cookies["userid"]==null|| Request.Cookies["userid"].Value==""||Request.Cookies["username"]==null||Request.Cookies["username"].Value=="")
////			{
////				this.Response.Redirect("/z8/alert.aspx?z8_alert=noquanxian");
////				return;
////			}
//			if(!IsPostBack)
//			{
////				if(this.Session["aspuid"]==null)
////					this.Response.Redirect("/z8/alert.aspx?z8_alert=noquanxian");  
//			}
//
//			if(!Page.IsPostBack)
//			{ 
//				//**********************屏蔽页面缓存 前台方法效果不太好*****************
//				Response.Buffer=true;      
//				Response.ExpiresAbsolute=System.DateTime.Now.AddSeconds(-1); 
//				Response.Expires=0;
//				Response.CacheControl="no-cache";
//				//**************************缓存结束******************
//				
//				this.hid_edit.Value="0";//初始hid-edit为”0“
//				databind();//初始绑定
//				string id=this.fanhui.Value;
//			}
//			else
//			{ 
//				//**********************屏蔽页面缓存 前台方法效果不太好*****************
//				Response.Buffer=true;      
//				Response.ExpiresAbsolute=System.DateTime.Now.AddSeconds(-1); 
//				Response.Expires=0;
//				Response.CacheControl="no-cache";
//				//**************************缓存结束******************
//				//				if(this.hid_edit.Value=="1")//如果 hi_edit 的值改为”1“
//				//				{
////				this.hid_edit.Value="0";
////				databind();//
//				// dc_dtxs.getdata();
//
//				//				}
//				if(this.Hidden_zt.Value=="updatezt")
//				{
//                  this.Hidden_zt.Value="";
//				 // this.update_zt();
//				}
//			}
//			
//		}
//
//		#region Web 窗体设计器生成的代码
//		override protected void OnInit(EventArgs e)
//		{
//			//
//			// CODEGEN: 该调用是 ASP.NET Web 窗体设计器所必需的。
//			//
//			InitializeComponent();
//			base.OnInit(e);
//			this.Btn_serch.Click += new System.EventHandler(this.Btn_serch_Click);
//			this.wd_DataGrid.ItemCreated += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemCreated);
//			this.wd_DataGrid.ItemCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_ItemCommand);
//			this.wd_DataGrid.PageIndexChanged += new System.Web.UI.WebControls.DataGridPageChangedEventHandler(this.wd_DataGrid_PageIndexChanged);
//			this.wd_DataGrid.DeleteCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_DeleteCommand);
//			this.wd_DataGrid.ItemDataBound += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemDataBound);
//		}
//		
//		/// <summary>
//		/// 设计器支持所需的方法 - 不要使用代码编辑器修改
//		/// 此方法的内容。
//		/// </summary>
//		private void InitializeComponent()
//		{    
//			this.Button3.Click += new System.EventHandler(this.Button3_Click);
//			this.Btn_serch.Click += new System.EventHandler(this.Btn_serch_Click);
//			this.wd_DataGrid.ItemCreated += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemCreated);
//			this.wd_DataGrid.ItemCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_ItemCommand);
//			this.wd_DataGrid.PageIndexChanged += new System.Web.UI.WebControls.DataGridPageChangedEventHandler(this.wd_DataGrid_PageIndexChanged);
//			this.wd_DataGrid.DeleteCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_DeleteCommand);
//			this.wd_DataGrid.ItemDataBound += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemDataBound);
//			this.wd_DataGrid.SelectedIndexChanged += new System.EventHandler(this.PageChange_PageIndexChanged);
//			this.PageChange.PageIndexChanged += new System.EventHandler(this.PageChange_PageIndexChanged);
//			this.Load += new System.EventHandler(this.Page_Load);
//
//		}
//		#endregion
//
//		#region DataGrid数据绑定
//		/// <summary>
//		/// 用途：给DataGrid绑定数据
//		/// 参数：无
//		/// </summary>
//		private void databind()
//		{
//			string pay = ddlPay.SelectedValue;
//			string Time1 = txtTime1.Text.Trim();
//			string Time2 = txtTime2.Text.Trim();
//			
//			
//				
//
//
//
//
//			string strid=this.TextBox1.Text.ToString().Trim();
//			string yeara=string.Empty;
//			string montha=string.Empty;
//			string daya = string.Empty;
//			string yearb = string.Empty;
//			string monthb = string.Empty;
//			string dayb = string.Empty;
//			try
//			{
//				yeara = Time1.Substring(0,4);
//				montha = Time1.Substring(4,2);
//				daya = Time1.Substring(6);
//
//
//				yearb = Time2.Substring(0,4);
//				monthb = Time2.Substring(4,2);
//				dayb = Time2.Substring(6);
//
//			}
//			catch
//			{}
//
//			string strSql ="select a.*,b.* from Bank_tixian as a ,Bank as b  where a.hy_num=b.hy_num ";
//			if(strid != "")
//				strSql += " and a.hy_num = '"+strid+"' ";
//			if(pay != "0")
//					strSql += " and a.type = '"+pay+"' ";
//
//			if(Time1.Length != 0  && Time2.Length == 0 )
//			{
//				strSql += " and  year(a.addtime) = '"+yeara+"' ";
//				strSql += " and  month(a.addtime) = '"+montha+"' ";
//				strSql += " and  day(a.addtime) = '"+daya+"' ";
//			}
//
//			if(Time1.Length != 0  && Time2.Length != 0 )
//			{
//				strSql += " and  year(a.addtime) >= '"+yeara+"' ";
//				strSql += " and  month(a.addtime) >= '"+montha+"' ";
//				strSql += " and  day(a.addtime) >= '"+daya+"' ";
//
//				strSql += " and  year(a.addtime) <= '"+yearb+"' ";
//				strSql += " and  month(a.addtime) < = '"+monthb+"' ";
//				strSql += " and  day(a.addtime) <= '"+dayb+"' ";
//			}
//
//
//
//			strSql += " order by a.addtime DESC";//sql语句
//
//
//
////			if(strid=="")
////			{
////				strSql="select  a.*,b.*  from Bank_tixian as a ,Bank as b  where a.hy_num=b.hy_num order by a.addtime DESC";//sql语句
////			}
////			else
////			{
////				strSql="select  a.*,b.*  from Bank_tixian as a,Bank as b where a.hy_num=b.hy_num and a.hy_num='"+strid+"'order by a.addtime DESC";//sql语句
////			}
////		
//			CoreClass.DBCommon db = new DBCommon();
//
//			DataTable DT= db.GetDataTableBySql(strSql);//执行sql返回数据集
//		//	DataTable Dv= (DataTable)Ds.Tables[0];//tbl视图
//			if(DT.Rows.Count == 0 )
//				NsingCHM.Common.Tips.Alert("无数据！");
//			PageChange.DataSource= DT;// DataTable(Ds.Tables[0]);//tbl视图
//
//			
//			PageChange.DataBind();//数据绑定
//
//		}
//		#endregion
//
//		#region 分页操作
//		/// <summary>
//		/// 用途：为DataGrid进行分页
//		/// </summary>
//		/// <param name="source"></param>
//		/// <param name="e"></param>
//		private void wd_DataGrid_PageIndexChanged(object source, System.Web.UI.WebControls.DataGridPageChangedEventArgs e)
//		{
//
//	 
//			databind();
////			try
////			{
////				wd_DataGrid.CurrentPageIndex=e.NewPageIndex;
////				this.databind();
////			}
////			catch
////			{
////				wd_DataGrid.CurrentPageIndex=0;
////				this.databind();
////			}
//		
//		}
//		#endregion
//
//		#region 鼠标指向datagrid某一行变色 和 单击某行弹出窗口
//		/// <summary>
//		/// DataGrid 响应鼠标事件
//		/// </summary>
//		/// <param name="sender"></param>
//		/// <param name="e"></param>
//		private void wd_DataGrid_ItemDataBound(object sender, System.Web.UI.WebControls.DataGridItemEventArgs e)
//		{
//
//
//
//
//
//
//			
//			if(e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
//			{
//				Label AccAlipay=(Label)e.Item.FindControl("labAlipay");
//				Label Acc=(Label)e.Item.FindControl("labAcc");
//				Label Accca=(Label)e.Item.FindControl("labAccCA");
//				Label Type=(Label)e.Item.FindControl("labType");
//				Label AccAdd=(Label)e.Item.FindControl("labAccAdd");
//
//
//				AccAlipay.Style.Add("display","none");
//				AccAlipay.Style.Add("cursor","hand");
//				AccAlipay.Attributes.Add("title","单击复制本帐号！");
//				AccAlipay.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+AccAlipay.Text+"\"); alert('复制　"+AccAlipay.Text+"　成功！');");
//
//				Acc.Style.Add("display","none");
//				Acc.Style.Add("cursor","hand");
//				Acc.Attributes.Add("title","单击复制本帐号！");
//				Acc.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+Acc.Text+"\"); alert('复制　"+Acc.Text+"　成功！');");
//				Accca.Style.Add("display","none");
//				Accca.Style.Add("cursor","hand");
//				Accca.Attributes.Add("title","单击复制！");
//				Accca.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+Accca.Text+"\"); alert('复制　"+Accca.Text+"　成功！');");
//				AccAdd.Style.Add("display","none");
//				AccAdd.Style.Add("cursor","hand");
//				AccAdd.Attributes.Add("title","单击复制！");
//				AccAdd.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+AccAdd.Text+"\"); alert('复制　"+AccAdd.Text+"　成功！');");
//		 
//				if(Type.Text.Trim().ToLower()=="bank")
//				{
//					Acc.Style.Add("display","");
//					Accca.Style.Add("display","");
//					AccAdd.Style.Add("display","");
//
//				}
//				else if(Type.Text.Trim().ToLower()=="alipay" || Type.Text.Trim().ToLower()=="" )
//				{
//					AccAlipay.Style.Add("display","");
//				}
//				else
//				{
//
//				}
//				
//
//				if (e.Item.ItemIndex >= 0)
//				{
//					//e.Item.Attributes.Add("onmouseover","this.style.backgroundColor='#efefef';this.style.cursor = 'hand';");
//					//e.Item.Attributes.Add("onmouseout","this.style.backgroundColor='#d6d8ef';");
//					string[] CurrenSBrecord=new string[]{e.Item.Cells[0].Text};
//					//掸出窗口
//					if(e.Item.Cells[9].Text=="未处理")
//					{
//						e.Item.Cells[11].FindControl("Button1").Visible=true;
//						e.Item.Cells[11].FindControl("Button2").Visible=true;
//					}
//					else
//					{
//						e.Item.Cells[11].FindControl("Button1").Visible=false;
//						e.Item.Cells[11].FindControl("Button2").Visible=false;
//					}
//					e.Item.Cells[9].Attributes.Add("onmouseover","this.style.cursor = 'hand';");
//					if(e.Item.Cells[9].Text=="未处理")
//					{
//						e.Item.Cells[9].Text="<FONT color=Red><b>未处理</b></Font>";
//					}
//					else
//						if(e.Item.Cells[9].Text=="已撤消")
//					{
//						e.Item.Cells[9].Text="<FONT color=Black><b>已撤消</b></Font>";
//					}
//					
//					//	e.Item.Cells[8].Attributes.Add("onclick","update_zt('"+CurrenSBrecord[0]+"')");
//					//					//掸出窗口
//					e.Item.Cells[8].Attributes.Add("onmouseover","this.style.cursor = 'hand';");
//					//					e.Item.Cells[11].Attributes.Add("onclick","ViewSBrecord('"+CurrenSBrecord[0]+"')");
//					//						
//					//					e.Item.Cells[12].Attributes.Add("onclick","showdelete()");
//				}
//
//			}
//
//			
//			string username = Request.Cookies["username"].Value;
//
//			bool tempss = false;
//			if(username == "kuaiji")
//				tempss = true;
//			
//			DataGrid dg = (DataGrid)Page.FindControl("wd_DataGrid");
//			if(tempss)
//				dg.Columns[11].Visible = false;
//
//
//	
//			
//		}
//		#endregion
//
//
//		#region 修改状态
//		private void update_zt(string zt,string id)
//		{
//		
//			string 	str_update="update Bank_tixian set zt='"+zt+"' where id="+id;
//			try
//			{ 
//				string 	str_update_time="update Bank_tixian set fktime='"+System.DateTime.Now.ToString()+"' where id="+id;
//				DBbase.excuteSql(str_update);
//				DBbase.excuteSql(str_update_time);
//			}
//			catch
//			{
//
//			}
//			databind();//数据绑定datagrid
//		
//
//		}
//		#endregion 
//
//		private void wd_DataGrid_DeleteCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)
//		{
//			 
//			string id ;
//			if( this.deletehid.Value=="1")//如果删除i数据id为1 
//			{
//				if( e.Item.ItemIndex == 0 && wd_DataGrid.PageCount!=1 &&wd_DataGrid.Items.Count == e.Item.ItemIndex+1)//如果最后一页只有一条记录删除记录后显示前一页
//				{
//					if(wd_DataGrid.PageCount==1)//如果只有一页只有一条记录删除记录后显示第一页
//					{
//						id = wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选择id 
//						DBbase.excuteSql("delete from DaiGou where id=" + id);//执行sql
//						//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
//						wd_DataGrid.CurrentPageIndex=0;//初始态
//						//this.databind();//数据从新绑定
//						Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
//					}
//					else
//					{
//						id= wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选定id 
//						DBbase.excuteSql( "delete from DaiGou where id="+id);//执行sql
//						//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
//						wd_DataGrid.CurrentPageIndex=wd_DataGrid.PageCount-2;//显示前一页
//						//this.databind();//数据从新绑定
//						Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
//					}
//				}
//				else
//				{
//					id = wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选定id 
//					DBbase.excuteSql( "delete  from DaiGou where id="+id);//执行sql
//					//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
//					//this.databind();//数据从新绑定
//					Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
//				}
//				this.deletehid.Value="";
//			
//			
//			}
//		}
//
//		private void wd_DataGrid_ItemCreated(object sender, System.Web.UI.WebControls.DataGridItemEventArgs e)
//		{
//			if(e.Item.ItemType==ListItemType.Pager)
//			{
//		        Label lab=new Label();
//				lab.Text="页码：";
//				e.Item.Cells[0].Controls.AddAt(0,lab);
//			}
//		}
//
//		private void wd_DataGrid_ItemCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)//撤销 
//		{
//			if(e.Item.ItemIndex == -1)
//				return;
//			Business bus=new Business();
//			//撤消提现
//			string hy_num=e.Item.Cells[13].Text.Trim();
//			string money=e.Item.Cells[6].Text.Trim();
//			if(e.CommandName=="chexiaobutton")
//			{				
//				Decimal d=Convert.ToDecimal(e.Item.Cells[6].Text.Trim());//金额
//				
//				if(bus.BankOperation(Convert.ToInt32(hy_num),Convert.ToDecimal(money)))
//				{
//
//                    this.update_zt("撤消",hy_num);
//					bus.BankLog_updatebz(Convert.ToInt32(e.Item.Cells[0].Text.Trim()),Convert.ToInt32(hy_num),"撤消提现");
//					 this.update_zt("已撤消",e.Item.Cells[0].Text.Trim());
//				　　//Response.Write("<script>alert('撤消提现成功！')</script>");
//				}
//				else
//				{
//					 Response.Write("<script>alert('撤消提现失败！')</script>");
//				}
//			}
//		  //处理提现
//			if(e.CommandName=="chulibutton")
//			{
//              
//				if( bus.BankLog_updatebz(Convert.ToInt32(e.Item.Cells[0].Text.Trim()),Convert.ToInt32(hy_num),"提现成功"))
//				{
//					string y=e.Item.Cells[6].Text.Trim();
//					Decimal ee= - Convert.ToDecimal(e.Item.Cells[6].Text.Trim());
//					string 	str3="update Bank_log set balance="+ee+" where tx_id='"+e.Item.Cells[0].Text.Trim()+"'";
//					DBbase.excuteSql(str3);//2007.3.6张加  体现成功后将体现金额改成负数。
//					this.update_zt("已处理",e.Item.Cells[0].Text.Trim());
//					///Response.Write("<script>alert('111111！')</script>");
//				}
//				else
//				{
//                   //Response.Write("<script>alert('2222222！')</script>");
//				}
//			}
//		}	
//		private void Btn_serch_Click(object sender, System.EventArgs e)
//		{
//		        databind();
//		}
//
//		private void Button3_Click(object sender, System.EventArgs e)
//		{
//
////			string Time1 = txtTime1.Text.Trim();
////			string Time2 = txtTime2.Text.Trim();
////			
////			if( Time1.Length == 0 )
////				return;
////			if( Time2.Length != 0)
////			{
////				if(Time1.Length == 0 )
////					return;
////			}
//			databind();
//		
//
//			
//		}
//
//		private void PageChange_PageIndexChanged(object sender, System.EventArgs e)
//		{
//			databind();
//		}
//	}
//}




#endregion




using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using CoreClass;
using MOLE.account;

namespace Cm818.com.Zh_MI
{
	/// <summary>
	/// 2007.4.4为了满足时时彩客户的支付宝提现要求开发的，主要是增加显示支付宝账户
	/// </summary>
    public partial  class tixian_manage_2 : System.Web.UI.Page
	{
        //protected System.Web.UI.WebControls.DataGrid wd_DataGrid;
        //protected System.Web.UI.HtmlControls.HtmlInputHidden deletehid;
        //protected System.Web.UI.HtmlControls.HtmlInputHidden fanhui;
        //protected System.Web.UI.HtmlControls.HtmlInputHidden hid_edit;
        //protected System.Web.UI.HtmlControls.HtmlInputHidden Hidden_zt;
        //protected System.Web.UI.HtmlControls.HtmlInputHidden Hidden_id;
        //protected System.Web.UI.WebControls.TextBox TextBox1;
        //protected System.Web.UI.WebControls.Button Btn_serch;
        //protected System.Web.UI.WebControls.DropDownList ddlPay;
        //protected System.Web.UI.WebControls.TextBox txtTime1;
        //protected System.Web.UI.WebControls.TextBox txtTime2;
        //protected BillySir.Web.UI.WebControls.ChangePage PageChange;
        //protected System.Web.UI.WebControls.Button btnSSearch;
        //protected System.Web.UI.WebControls.Label lbManager;
        //protected System.Web.UI.WebControls.DropDownList ddlManager;
		public int pgsize;
	

		void ManagerSet()
		{
            //CoreClass.DBCommon db = new DBCommon();
            //string Uid = Request.Cookies["userid"].Value;
            //string sql = "select * from z8 where id ='"+Uid+"'";
			
            //DataTable dt =  db.GetDataTableBySql(sql);
            //string name = dt.Rows[0]["name"].ToString();

        //    ati  2012.7.5  rem sheomyard  ,syelei hamyard .
            string name = c.getCurUserForAdmin();
            c.add();
          lbManager.Text = "当前操作员： " + name;

		}

		void test ()
		{
			int a = Request.Cookies.Count;
			for(int i=0; i<a ; i++)
			{
				string b = Request.Cookies[i].Name;
				string c = Request.Cookies[i].Value;
				string cc = "";
			}
		}
        //ati 2012.7.5
        //此处可注入不同的实现
    
  tyeasye c = new tyeasye();  //我的项目中的实现
  // tyeasye c = new testpkg.teasyeProcess();   //另一项目实现

		private void Page_Load(object sender, System.EventArgs e)
		{
		//	test();
       
			ManagerSet();
			
			loadDefault();
		
			if(!IsPostBack)
				DDlManagerSet();

            //ati 2012.7.5 
            if (!IsPostBack)
             databind();
		}
		void DDlManagerSet()
		{
			
			ddlManager.DataSource = allCpUser();
			ddlManager.DataTextField= "name";
			ddlManager.DataValueField = "id";
			ddlManager.DataBind();
			ddlManager.Items.Add("(操作员选择)");
			ddlManager.SelectedIndex = ddlManager.Items.Count-1 ;
			

		}

		DataTable allCpUser()
		{
			CoreClass.DBCommon db = new CoreClass.DBCommon();
			string sql = "select * from z8 where sign = 'user'";
			DataTable dt = db.GetDataTableBySql(sql);
			return dt;
			
		}
		void loadDefault()
		{
			if(!Page.IsPostBack)
			{ 
				//**********************屏蔽页面缓存 前台方法效果不太好*****************
				Response.Buffer=true;      
				Response.ExpiresAbsolute=System.DateTime.Now.AddSeconds(-1); 
				Response.Expires=0;
				Response.CacheControl="no-cache";
				//**************************缓存结束******************
				
				this.hid_edit.Value="0";//初始hid-edit为”0“
		//		databind();//初始绑定
				string id=this.fanhui.Value;
			}
			else
			{ 
				//**********************屏蔽页面缓存 前台方法效果不太好*****************
				Response.Buffer=true;      
				Response.ExpiresAbsolute=System.DateTime.Now.AddSeconds(-1); 
				Response.Expires=0;
				Response.CacheControl="no-cache";
				//**************************缓存结束******************
				//				if(this.hid_edit.Value=="1")//如果 hi_edit 的值改为”1“
				//				{
				//				this.hid_edit.Value="0";
				//				databind();//
				// dc_dtxs.getdata();

				//				}
				if(this.Hidden_zt.Value=="updatezt")
				{
					this.Hidden_zt.Value="";
					// this.update_zt();
				}
			}
		}
		#region Web 窗体设计器生成的代码
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: 该调用是 ASP.NET Web 窗体设计器所必需的。
			//
			InitializeComponent();
			base.OnInit(e);
			this.Btn_serch.Click += new System.EventHandler(this.Btn_serch_Click);
			this.wd_DataGrid.ItemCreated += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemCreated);
		//	this.wd_DataGrid.ItemCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_ItemCommand);
			this.wd_DataGrid.PageIndexChanged += new System.Web.UI.WebControls.DataGridPageChangedEventHandler(this.wd_DataGrid_PageIndexChanged);
			this.wd_DataGrid.DeleteCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.wd_DataGrid_DeleteCommand);
			this.wd_DataGrid.ItemDataBound += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemDataBound);
		}
		
		/// <summary>
		/// 设计器支持所需的方法 - 不要使用代码编辑器修改
		/// 此方法的内容。
		/// </summary>
		private void InitializeComponent()
		{    
			this.btnSSearch.Click += new System.EventHandler(this.Button3_Click);
			this.ddlManager.SelectedIndexChanged += new System.EventHandler(this.ddlManager_SelectedIndexChanged);
			this.wd_DataGrid.ItemCreated += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemCreated);
			this.wd_DataGrid.ItemDataBound += new System.Web.UI.WebControls.DataGridItemEventHandler(this.wd_DataGrid_ItemDataBound);
			//this.PageChange.PageIndexChanged += new System.EventHandler(this.PageChange_PageIndexChanged);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		#region DataGrid数据绑定
		/// <summary>
		/// 用途：给DataGrid绑定数据
		/// 参数：无
        ///     public  string pay = ddlPay.SelectedValue;
    //    public string 
    //    public string
    //    public string strid = this.TextBox1.Text.ToString().Trim();
		/// </summary>
        private void databind()
        {
            //	PageChange.DataBind();//数据绑定

            c.Time1 = txtTime1.Text.Trim().Replace("-", "");
            c.Time2 = txtTime2.Text.Trim().Replace("-", "");
            wd_DataGrid.DataSource = c.databind();
            wd_DataGrid.DataBind();
        }
 



		#endregion

		#region 分页操作
		/// <summary>
		/// 用途：为DataGrid进行分页
		/// </summary>
		/// <param name="source"></param>
		/// <param name="e"></param>
		private void wd_DataGrid_PageIndexChanged(object source, System.Web.UI.WebControls.DataGridPageChangedEventArgs e)
		{
			try
			{
				wd_DataGrid.CurrentPageIndex=e.NewPageIndex;
				this.databind();
			}
			catch
			{
				wd_DataGrid.CurrentPageIndex=0;
				this.databind();
			}
		
		}
		#endregion

		#region 鼠标指向datagrid某一行变色 和 单击某行弹出窗口
		/// <summary>
		/// DataGrid 响应鼠标事件
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void wd_DataGrid_ItemDataBound(object sender, System.Web.UI.WebControls.DataGridItemEventArgs e)
		{
			
			if(e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
			{
				Label AccAlipay=(Label)e.Item.FindControl("labAlipay");
				Label Acc=(Label)e.Item.FindControl("labAcc");
				Label Accca=(Label)e.Item.FindControl("labAccCA");
				Label Type=(Label)e.Item.FindControl("labType");
				Label AccAdd=(Label)e.Item.FindControl("labAccAdd");


				AccAlipay.Style.Add("display","none");
				AccAlipay.Style.Add("cursor","hand");
				AccAlipay.Attributes.Add("title","单击复制本帐号！");
				AccAlipay.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+AccAlipay.Text+"\"); alert('复制　"+AccAlipay.Text+"　成功！');");

				Acc.Style.Add("display","none");
				Acc.Style.Add("cursor","hand");
				Acc.Attributes.Add("title","单击复制本帐号！");
				Acc.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+Acc.Text+"\"); alert('复制　"+Acc.Text+"　成功！');");
				Accca.Style.Add("display","none");
				Accca.Style.Add("cursor","hand");
				Accca.Attributes.Add("title","单击复制！");
				Accca.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+Accca.Text+"\"); alert('复制　"+Accca.Text+"　成功！');");
				AccAdd.Style.Add("display","none");
				AccAdd.Style.Add("cursor","hand");
				AccAdd.Attributes.Add("title","单击复制！");
				AccAdd.Attributes.Add("onclick","window.clipboardData.setData(\"Text\",\""+AccAdd.Text+"\"); alert('复制　"+AccAdd.Text+"　成功！');");
		 

				
				if(Type.Text.Trim().ToLower()=="bank")
				{
					Acc.Style.Add("display","");
					Accca.Style.Add("display","");
					AccAdd.Style.Add("display","");

				}
				else if(Type.Text.Trim().ToLower()=="alipay" || Type.Text.Trim().ToLower()=="" )
				{
					AccAlipay.Style.Add("display","");
				}
				else
				{

				}
				
				Label lbuer = (Label)e.Item.FindControl("lbUser");
				lbuer.Visible = false;

				if (e.Item.ItemIndex >= 0)
				{
					//e.Item.Attributes.Add("onmouseover","this.style.backgroundColor='#efefef';this.style.cursor = 'hand';");
					//e.Item.Attributes.Add("onmouseout","this.style.backgroundColor='#d6d8ef';");
					string[] CurrenSBrecord=new string[]{e.Item.Cells[0].Text};
					//掸出窗口
					if(e.Item.Cells[9].Text=="未处理" || e.Item.Cells[9].Text == "<FONT color=Red><b>未处理</b></Font>")
					{
						e.Item.Cells[11].FindControl("Button1").Visible=true;
                    //    this.wd_DataGrid.Columns
						e.Item.Cells[11].FindControl("Button2").Visible=true;
					}
					else
					{
						e.Item.Cells[11].FindControl("Button1").Visible=false;
						e.Item.Cells[11].FindControl("Button2").Visible=false;
						lbuer.Visible = true;
						lbuer.Text = getManager(e.Item.Cells[0].Text.Trim());
					}
					e.Item.Cells[9].Attributes.Add("onmouseover","this.style.cursor = 'hand';");
					if(e.Item.Cells[9].Text=="未处理")
					{
						e.Item.Cells[9].Text="<FONT color=Red><b>未处理</b></Font>";
					}
					else
						if(e.Item.Cells[9].Text=="已撤消")
					{
						e.Item.Cells[9].Text="<FONT color=Black><b>已撤消</b></Font>";

						lbuer.Visible = true;
						lbuer.Text = getManager(e.Item.Cells[0].Text.Trim());

					}
					
					//	e.Item.Cells[8].Attributes.Add("onclick","update_zt('"+CurrenSBrecord[0]+"')");
					//					//掸出窗口
					e.Item.Cells[8].Attributes.Add("onmouseover","this.style.cursor = 'hand';");
					//					e.Item.Cells[11].Attributes.Add("onclick","ViewSBrecord('"+CurrenSBrecord[0]+"')");
					//						
					//					e.Item.Cells[12].Attributes.Add("onclick","showdelete()");
				}

			}

//会计只能查看 隐藏11列
            string username = "";
            try { username = Request.Cookies["username"].Value; }
            catch (Exception ex) { }
			 
            //ati 2012.7.5
            username = "xx";
            

			bool tempss = false;
			if(username == "kuaiji")
				tempss = true;
			
			DataGrid dg = (DataGrid)Page.FindControl("wd_DataGrid");
			if(tempss)
				dg.Columns[11].Visible = false;
	
			
		}
		#endregion


		#region 修改状态
		private void update_zt(string zt,string Manager,string id)
		{
		
			string 	str_update="update Bank_tixian set zt='"+zt+"' , chuliren='"+Manager+"' where id="+id;
			try
			{ 
				string 	str_update_time="update Bank_tixian set fktime='"+System.DateTime.Now.ToString()+"' where id="+id;
				DBbase.excuteSql(str_update);
				DBbase.excuteSql(str_update_time);
			}
			catch
			{

			}
			databind();//数据绑定datagrid
		

		}
		#endregion 

		private void wd_DataGrid_DeleteCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)
		{
			 
			string id ;
			if( this.deletehid.Value=="1")//如果删除i数据id为1 
			{
				if( e.Item.ItemIndex == 0 && wd_DataGrid.PageCount!=1 &&wd_DataGrid.Items.Count == e.Item.ItemIndex+1)//如果最后一页只有一条记录删除记录后显示前一页
				{
					if(wd_DataGrid.PageCount==1)//如果只有一页只有一条记录删除记录后显示第一页
					{
						id = wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选择id 
						DBbase.excuteSql("delete from DaiGou where id=" + id);//执行sql
						//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
						wd_DataGrid.CurrentPageIndex=0;//初始态
						//this.databind();//数据从新绑定
						Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
					}
					else
					{
						id= wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选定id 
						DBbase.excuteSql( "delete from DaiGou where id="+id);//执行sql
						//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
						wd_DataGrid.CurrentPageIndex=wd_DataGrid.PageCount-2;//显示前一页
						//this.databind();//数据从新绑定
						Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
					}
				}
				else
				{
					id = wd_DataGrid.DataKeys[e.Item.ItemIndex].ToString();//选定id 
					DBbase.excuteSql( "delete  from DaiGou where id="+id);//执行sql
					//Response.Write("<script language=javascript>alert('系统提醒您：删除成功！')</script>");
					//this.databind();//数据从新绑定
					Response.Write("<script language=javascript>window.location.href=window.location.href;</script>");
				}
				this.deletehid.Value="";
			
			
			}
		}

		private void wd_DataGrid_ItemCreated(object sender, System.Web.UI.WebControls.DataGridItemEventArgs e)
		{
			if(e.Item.ItemType==ListItemType.Pager)
			{
				Label lab=new Label();
				lab.Text="页码：";
				e.Item.Cells[0].Controls.AddAt(0,lab);
			}
		}

		public void wd_DataGrid_ItemCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)//撤销 
		{
			if(e.Item.ItemIndex == -1)
				return;
			Business bus=new Business();
			//撤消提现
			string hy_num=e.Item.Cells[13].Text.Trim();
			string money=e.Item.Cells[6].Text.Trim();
			if(e.CommandName=="chexiaobutton")
			{	
			    //ATI 
                if (true)
                    return;
				Decimal d=Convert.ToDecimal(e.Item.Cells[6].Text.Trim());//金额
				
				if(bus.BankOperation(Convert.ToInt32(hy_num),Convert.ToDecimal(money)))
				{

					this.update_zt("撤消",getCpUser(), hy_num);
					bus.BankLog_updatebz(Convert.ToInt32(e.Item.Cells[0].Text.Trim()),Convert.ToInt32(hy_num),"撤消提现");
					this.update_zt("已撤消",getCpUser(),e.Item.Cells[0].Text.Trim());
				　　//Response.Write("<script>alert('撤消提现成功！')</script>");
				}
				else
				{
					Response.Write("<script>alert('撤消提现失败！')</script>");
				}
			}
			//处理提现
			if(e.CommandName=="chulibutton")
			{

                //2012.7.5   set jweotai 
                int teasye_id = Convert.ToInt32(e.Item.Cells[0].Text.Trim());
                int hy_numInt = Convert.ToInt32(hy_num);
                
                c.process(teasye_id);   
                databind();
                //ati end

				if( bus.BankLog_updatebz(Convert.ToInt32(e.Item.Cells[0].Text.Trim()),Convert.ToInt32(hy_num),"提现成功"))
				{
					string y=e.Item.Cells[6].Text.Trim();
					Decimal ee= - Convert.ToDecimal(e.Item.Cells[6].Text.Trim());
					string 	str3="update Bank_log set balance="+ee+" where tx_id='"+e.Item.Cells[0].Text.Trim()+"'";
					DBbase.excuteSql(str3);//2007.3.6张加  体现成功后将体现金额改成负数。
					this.update_zt("已处理",getCpUser(),e.Item.Cells[0].Text.Trim());
					///Response.Write("<script>alert('111111！')</script>");
				}
				else
				{
					//Response.Write("<script>alert('2222222！')</script>");
				}
			}
		}	
		private void Btn_serch_Click(object sender, System.EventArgs e)
		{
			databind();
		}

		private void Button3_Click(object sender, System.EventArgs e)
		{
			databind();
		}

		private void PageChange_PageIndexChanged(object sender, System.EventArgs e)
		{
			databind();
		}

		string getCpUser()
		{
			string uid = Request.Cookies["userid"].Value;
			string sql ="select * from z8 where id = "+uid;
			CoreClass.DBCommon db = new DBCommon();
			DataTable dt = db.GetDataTableBySql(sql);
			return  dt.Rows[0]["name"].ToString();
		}

		string getManager(string id)
		{
			CoreClass.DBCommon db = new DBCommon();
			string sql = "select chuliren from Bank_tixian where id ="+id;
			DataTable dt = db.GetDataTableBySql(sql);
			string temp = dt.Rows[0][0].ToString();
			return temp;
		}

		private void ddlManager_SelectedIndexChanged(object sender, System.EventArgs e)
		{
			databind();
		}
	}
}

