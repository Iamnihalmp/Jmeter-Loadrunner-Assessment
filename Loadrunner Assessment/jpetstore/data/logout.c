logout()
{

	lr_start_transaction("logout");

	web_add_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_url("Account.action_3", 
		"URL=https://petstore.octoperf.com/actions/Account.action?signoff=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://petstore.octoperf.com/actions/Order.action?newOrderForm=", 
		"Snapshot=t13.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("logout",LR_AUTO);

	return 0;
}