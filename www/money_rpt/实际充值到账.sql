-- FUNCTION: public."get原始金额"(numeric, numeric)
-- DROP FUNCTION public."get原始金额"(numeric, numeric);


CREATE FUNCTION "get_Daojo实际充值到账金额"("原始金额" numeric, "手续费率" numeric)
 RETURNS numeric LANGUAGE 'plpgsql' 
 
  AS $BODY$ BEGIN
  
   return 原始金额 *(1 - 手续费率);

--实际金额/(1-手续费率);
end $BODY$;

ALTER FUNCTION public."get原始金额"(numeric, numeric) OWNER TO postgres;