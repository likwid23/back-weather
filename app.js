$(function() {
var Weather = Backbone.Model.extend({
//urlRoot: "http://api.openweathermap.org/data/2.5/weather?q=New%20York&mode=json&units=imperial",
initialize: function (response) {
		//console.log(response.wind.speed);	 
//console.log(response.main.temp);	 
 //console.log(response.name);
 //console.log(response.main.temp_min);
 //console.log(response.main.temp_max);
 //console.log();
 return response;	
}

});
 
var WeatherCollection = Backbone.Collection.extend({
 model: Weather,
 url: 'http://api.openweathermap.org/data/2.5/weather?q=New%York&mode=json&units=imperial',
 parse: function(response) {
		//console.log(response.wind.speed);	 
//console.log(response.main.temp);	 
 //console.log(response.name);
 //console.log(response.main.temp_min);
 //console.log(response.main.temp_max);
 //console.log();
 return response;
 }
 });


var WeatherView = Backbone.View.extend({
    el: 'body',
	template: _.template($("#details").html()),
	events: {
        "click #search": "addZip"
    },
	 addZip: function(e) {
        e.preventDefault();
        alert('test');
    },
	initialize: function() {
     _.bindAll(this, 'render');
	 weatherCollectionInstance = new WeatherCollection();
            weatherCollectionInstance.fetch({
                success: function(response, xhr) {
					$('#loading').hide();
					//console.log(weatherCollectionInstance.models[0].attributes.main.temp_max);
                    WeatherView.render();
                }
            });
        },
        render: function() {
			var date = new Date();
            //$(this.el).html(this.template(weatherCollectionInstance.models));
			$(this.el).append("<ul></ul>");
            for (var i = 0; i < weatherCollectionInstance.length; i++) {
                $('ul', this.el).append("<li><span>" + weatherCollectionInstance.models[0].get("name") + "</span></li>"
				+ "<li>" + date + "</li>"
				+ "<li>" + weatherCollectionInstance.models[0].attributes.weather[0].description + "</li>"
				+ "<li> Temperature " + weatherCollectionInstance.models[0].attributes.main.temp + "</li>"
				+ "<li> High Temperature " + weatherCollectionInstance.models[0].attributes.main.temp_max + "</li>"
				+ "<li> Low Temperature " + weatherCollectionInstance.models[0].attributes.main.temp_min + "</li>"																		 
				);
            }
        }
   
});
 
var WeatherView = new WeatherView();



});