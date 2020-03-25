CREATE TABLE [dbo].[Bank_tixian](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[hy_num] [int] NULL,
	[hy_name] [varchar](50) NULL,
	[bank] [varchar](50) NULL,
	[acc] [varchar](50) NULL,
	[accname] [varchar](50) NULL,
	[realname] [varchar](50) NULL,
	[CardCode] [varchar](50) NULL,
	[money] [decimal](18, 0) NULL,
	[addtime] [datetime] NULL,
	[fktime] [datetime] NULL,
	[zt] [varchar](50) NULL,
	[zhifubao] [varchar](50) NULL,
	[accca] [varchar](50) NULL,
	[accadd] [varbinary](50) NULL,
	[type] [varchar](50) NULL,
	[chuliren] [varchar](50) NULL
) ON [PRIMARY]
