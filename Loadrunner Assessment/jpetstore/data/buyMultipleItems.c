buyMultipleItems()
{

	lr_start_transaction("select category");

	web_add_auto_header("Accept-Language", 
		"en-GB,en;q=0.9");

	lr_think_time(15);

	web_url("Catalog.action", 
		"URL=https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://petstore.octoperf.com/actions/Catalog.action", 
		"Snapshot=t6.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("select category",LR_AUTO);

	lr_think_time(12);

	lr_start_transaction("select prodid");

	web_link("FI-SW-01", 
		"Text=FI-SW-01", 
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
		"URL=https://petstore.octoperf.com/actions/Cart.action?addItemToCart=&workingItemId=EST-2", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=FI-SW-01", 
		"Snapshot=t10.inf", 
		"Mode=HTML", 
		LAST);

	web_submit_form("Cart.action_3", 
		"Snapshot=t11.inf", 
		ITEMDATA, 
		"Name=EST-1", "Value=1", ENDITEM, 
		"Name=EST-2", "Value=1", ENDITEM, 
		"Name=updateCartQuantities", "Value=Update Cart", ENDITEM, 
		LAST);

	return 0;
}
