var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var app = express();
var request = require('request');

app.get('/scrape',function(req,res){

	url = 'http://www.imdb.com/title/tt0109830/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=3376940102&pf_rd_r=1AQ7W5PYV4CGHZGJNB19&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_12';

	request(url,function(error,response,html){
		if(!error){
			var $ = cheerio.load(html);

			var rating, title, release, genre;

			var json = {
				title : "", 
				release : "",
				rating : "" ,
				genre: ""
			};

			$('.title_wrapper').filter(function(){

				var ans = $(this);

				title = ans.children().first().text();

				json.title = title;

				//release = ans.children().second().children().last().text();

				//json.release = release;

			});

			$('.itemprop').filter(function(){
				var ans2 = $(this);

				genre = ans2.text();

				json.genre = genre;
			});

			$('.ratingValue').filter(function(){

				var ans3 = $(this);

				rating = ans3.children().first().children().text();

				json.rating = rating;
			});

		}

		fs.writeFile('output.json', JSON.stringify(json,null,4),function(err){
			res.send('Check directory for output file');
			console.log("json file made");

		});


	});

});


app.listen('3000',function(){
	console.log("Server started");
});

exports = module.exports = app;