buyMultipleItems()
{

	lr_start_transaction("select category");

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(15);

/*Correlation comment - Do not change!  Original value='FI-SW-01' Name ='Text' Type ='ResponseBased'*/
	web_reg_save_param_regexp(
		"ParamName=Text",
		"RegExp=productId=(.*?)\">FI-SW-01",
		SEARCH_FILTERS,
		"Scope=Body",
		"IgnoreRedirections=No",
		LAST);

	web_url("Catalog.action", 
		"URL=https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://petstore.octoperf.com/actions/Catalog.action", 
		"Snapshot=t6.inf", 
		"Mode=HTML", 
		LAST);
		
	web_image_check("web_image_check",
		"Src=../images/splash.gif",
		LAST);


	lr_end_transaction("select category",LR_AUTO);

	lr_think_time(12);

	lr_start_transaction("select prodid");

/*Correlation comment - Do not change!  Original value='EST-2' Name ='workingItemId' Type ='ResponseBased'*/
	web_reg_save_param_regexp(
		"ParamName=workingItemId",
		"RegExp=itemId=(.*?)\">EST-2",
		SEARCH_FILTERS,
		"Scope=Body",
		"IgnoreRedirections=No",
		LAST);

	web_link("FI-SW-01",
		"Text={Text}",
		"Snapshot=t7.inf",
		LAST);

	lr_end_transaction("select prodid",LR_AUTO);

	lr_think_time(14);

	lr_start_transaction("select items");

	web_link("Add to Cart", 
		"Text=Add to Cart", 
		"Ordinal=1", 
		"Snapshot=t8.inf", 
		LAST);

	lr_think_time(5);

	web_submit_form("Cart.action", 
		"Snapshot=t9.inf", 
		ITEMDATA, 
		"Name=EST-1", "Value=1", ENDITEM, 
		"Name=updateCartQuantities", "Value=Update Cart", ENDITEM, 
		LAST);

	lr_think_time(4);

	web_url("Cart.action_2",
		"URL=https://petstore.octoperf.com/actions/Cart.action?addItemToCart=&workingItemId={workingItemId}",
		"Resource=0",
		"RecContentType=text/html",
		"Referer=https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId={Text}",
		"Snapshot=t10.inf",
		"Mode=HTML",
		LAST);

	web_submit_form("Cart.action_3",
		"Snapshot=t11.inf",
		ITEMDATA,
		"Name=EST-1", "Value=1", ENDITEM,
		"Name={workingItemId}", "Value=1", ENDITEM,
		"Name=updateCartQuantities", "Value=Update Cart", ENDITEM,
		LAST);

	return 0;
}
