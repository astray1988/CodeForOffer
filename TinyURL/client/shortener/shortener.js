// add your events or helpers here
Base_URL = "http://localhost:3000/";
Template.shortener.helpers({
	urls:function(){
		return URLs.find();
	}
});

Template.shortener.events({
	'submit form':function(event,template){
		event.preventDefault();
		// Get value from form element
        var longurl = event.target.text.value;
		
		if(validateURL(longurl) ){
			if(!isExistURL(longurl)){

				// get short url
			var longToShortSize = getURLsTableSize();
			var	shortUrlExtension = generateShortURL(longToShortSize);

			var shorturl = Base_URL + shortUrlExtension;
			// save in db
			URLs.insert({
				originUrl: longurl,
				shortUrl: shorturl
			});
			}

		}else{
			alert("This is not a valid URL.");
		}
	}
});

function getURLsTableSize(){
	return URLs.find().count();
};

function validateURL(textval) {
	var urlregex = new RegExp(
	"^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	return urlregex.test(textval);
}

function isExistURL(longurl){
	return  URLs.findOne({originUrl:longurl}) === undefined ? false : true;
}


function generateShortURL(longToShortSize){
	return convertTo62(longToShortSize);
}

function convertTo62(num){
	var rawStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var encode = rawStr.split('');
	var ret = '';
	while(num !== 0){
		ret = encode[num % 62] + ret;
		num = parseInt(num / 62);
	}
	return ret;
}