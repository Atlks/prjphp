<%@ Page Language="C#" AutoEventWireup="true" CodeFile="testopen.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    <asp:Button ID="Button1" runat="server" onclick="Button1_Click" 
        Text="close test" />
    <asp:Button ID="Button2" runat="server" onclick="Button2_Click" 
        Text="opentest" />
&nbsp;&nbsp; is test status:<asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
    <br />
    <br />
    <br />
    <br />
    db str:<asp:Label ID="Label2" runat="server" Text="Label"></asp:Label>
    <br />
    <br />
    <br />
    <br />
    <asp:Button ID="Button3" runat="server" onclick="Button3_Click" Text="login" />
    <asp:Button ID="Button4" runat="server" onclick="Button4_Click" Text="out" />
    islogin:<asp:Label ID="Label3" runat="server" Text="Label"></asp:Label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; manager login uid:<asp:Label 
        ID="Label4" runat="server" Text="Label"></asp:Label>
    &nbsp;&nbsp;&nbsp;&nbsp; manager login name:<asp:Label 
        ID="Label5" runat="server" Text="Label"></asp:Label>
    &nbsp;&nbsp;
    <br />
    <br />
    <br />
    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    <asp:Button ID="Button5" runat="server" onclick="Button5_Click" 
        Text="ini acc" />
    <asp:Label 
        ID="Label6" runat="server" Text="Label"></asp:Label>
    <br />
&nbsp;</form>
</body>
</html>
