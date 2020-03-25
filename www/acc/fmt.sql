select *,	floor("get原始金额"(金额,feilv手续费率)) as "ysj原始金额" ,
floor("get手续费"(金额,feilv手续费率)) get手续费 from 
(

 SELECT r.app_id,
    r.sum_amt_alreadypay AS "金额",

	
    m.mername,
    m.uname,
    m."feilv手续费率"
   FROM "todayRchg今天充值金额" r
     LEFT JOIN merchan m ON r.app_id = m.id) as t
	 
	 
	 --补单inset他   test
	 
	 select * from order_bill order by id desc
	 
	 INSERT INTO public.order_bill(
	id, order_id, app_id, channel, remark, status, amount, order_time, pay_time, oncall, outer_order_sn)
	VALUES (88, 20200115test, 8,'sojiaguma','', '', 100, '2020-01-15 12:12:12', null, '', '');
	
	
	update order_bill  set  pay_time=null  where  order_id='20200115test' and app_id=8 
	
	
	SELECT b.*,m."feilv手续费率"
	FROM public.order_bill b
	left join merchan m on b.app_id=m.id
	where order_id='20200115test'