Login()
{

	web_set_sockets_option("SSL_VERSION", "AUTO");

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	web_url("petstore.octoperf.com", 
		"URL=https://petstore.octoperf.com/", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTML", 
		LAST);

	lr_think_time(4);

	lr_start_transaction("enter the store");

	web_link("Enter the Store", 
		"Text=Enter the Store", 
		"Snapshot=t2.inf", 
		LAST);

	lr_end_transaction("enter the store",LR_AUTO);

	lr_think_time(5);

	lr_start_transaction("click sign in");

	web_link("Sign In", 
		"Text=Sign In", 
		"Snapshot=t3.inf", 
		LAST);

	lr_end_transaction("click sign in",LR_AUTO);

	lr_think_time(25);

	lr_start_transaction("enter username and password");

	web_submit_form("Account.action", 
		"Snapshot=t4.inf", 
		ITEMDATA, 
		"Name=username", "Value=nihalmp", ENDITEM, 
		"Name=password", "Value=iamihalmp", ENDITEM, 
		"Name=signon", "Value=Login", ENDITEM, 
		LAST);

	lr_end_transaction("enter username and password",LR_AUTO);

	lr_start_transaction("enter username and password");

	web_submit_form("Account.action_2", 
		"Snapshot=t5.inf", 
		ITEMDATA, 
		"Name=username", "Value=nihalmp", ENDITEM, 
		"Name=password", "Value=iamnihalmp", ENDITEM, 
		"Name=signon", "Value=Login", ENDITEM, 
		LAST);

	lr_end_transaction("enter username and password",LR_AUTO);

	return 0;
}
