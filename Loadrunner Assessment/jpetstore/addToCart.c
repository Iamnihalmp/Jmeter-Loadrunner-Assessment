addToCart()
{

	lr_start_transaction("chcekout");

	web_add_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(38);

	web_url("Order.action", 
		"URL=https://petstore.octoperf.com/actions/Order.action?newOrderForm=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://petstore.octoperf.com/actions/Cart.action", 
		"Snapshot=t12.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("chcekout",LR_AUTO);

	return 0;
}
