/* Получение фото из Инстаграм */

(function ($) {
	$.fn.instagramGet = function (options) {

		// По умолчанию
		var defaults = {
			"user_id": "1936041288",
			"access_token": "1936041288.ba4c844.ddddfe76df114df0bd94c9980c2122ac",
			"count": 10
		};

		var o = $.extend(defaults, options);

		return this.each(function () {

			// Переменные
			var elem = $(this),
				url = "https://api.instagram.com/v1/users/" + o.user_id + "/media/recent?access_token=" + o.access_token + "&count=" + o.count + "&callback=?";
			
			// Получение изображений
			$.getJSON(url, function(data){
				$.each(data.data, function (i, val) {
					var li = $("<li/>").appendTo(elem),
						a = $("<a/>", {"href": val.link, "target": "_blank"}).appendTo(li).addClass('fancybox').attr('rel','gallery1'),
						img = $("<img/>", {"src": val.images.thumbnail.url}).appendTo(a);

					if (val.caption){
						a.attr("title", val.caption.text);
					}
				});
			});

			if(o.user_id == null || o.access_token == null){
				elem.append("<li>Мы забыли идентификатор и токен пользователя Инстаграм.</li>");
			}

		});
	};
})(jQuery);
