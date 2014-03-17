$(function() {
var Weather = Backbone.Model.extend({
  defaults: {
	  city: 'New York'
	  },
	  
    url: function() {
        return "http://api.openweathermap.org/data/2.5/weather?q=" + this.get("city") + "&mode=json&units=imperial";
    },	
	
    parse : function( response ) {
        console.log(response.name);
        return {
			
            id: response.name,
            desc: response.weather[0].description,
            temp: response.main.temp,
            high: response.main.temp_max,
            low: response.main.temp_min,
            wind: response.wind.speed    
        };
    },
	
});
var WeatherCollection = Backbone.Collection.extend({
	model: Weather
});

var SearchView = Backbone.View.extend({
    events: {
        "click #search": "addZip"
    },
    addZip: function(e) {
        e.preventDefault();
        this.model = new Weather();
		this.model.set({city: this.$("#zip").val()});
            this.model.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.model.get("city") + "&mode=json&units=imperial";
            this.model.fetch({success: WeatherView.render, reset:true});
    },
});

var WeatherView = Backbone.View.extend({
    el: $("#content"),
	template: _.template($("#forcast-template").html()),
    initialize: function() {
        _.bindAll(this, "render");
		this.model = new Weather();
        this.model.fetch({success: this.render, reset:true})        
    },
    render: function(model) {
        var content = this.template(model.toJSON());
        this.$el.html(content);
        return this;      
    }
});
var weathercollection = new WeatherCollection(); 
var WeatherView = new WeatherView({ collection: weathercollection });
var searchView = new SearchView({ el: $("#weather"), collection: weathercollection });
var weather = new Weather();
});