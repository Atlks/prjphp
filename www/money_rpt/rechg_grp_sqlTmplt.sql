WITH merid_amt_merGrp AS (
    select
        app_id,
        sum(amount) sum_amt_alreadyPay
    from
        order_bill
    WHERE
       date( order_time) = '%s'
        and pay_time is not null
    group by
        app_id
),
pay_joinUname AS (
    SELECT
        r.app_id,
        r.sum_amt_alreadypay AS "金额",
        m.mername,
        m.uname,
        m."feilv手续费率"
    FROM
        merid_amt_merGrp r
        LEFT JOIN merchan m ON r.app_id = m.id
)
SELECT
     t.app_id,
    t."金额" as ysj原始金额,
    t.mername,
    t.uname,
    t."feilv手续费率",
    ROUND("get_Daojo实际充值到账金额"(t."金额", t."feilv手续费率"), 4) AS "sjczje实际充值金额",
    ROUND(t."金额"*t."feilv手续费率", 4) AS "ssf手续费"
FROM
    pay_joinUname t