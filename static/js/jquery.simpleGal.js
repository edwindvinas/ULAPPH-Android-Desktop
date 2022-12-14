/*
 * simpleGal -v0.0.1
 * A simple image gallery plugin.
 * https://github.com/steverydz/simpleGal
 * 
 * Made by Steve Rydz
 * Under MIT License
 */
(function($){

  $.fn.extend({

    simpleGal: function (options) {

      var defaults = {
        mainImage: ".placeholder"
      };

      options = $.extend(defaults, options);

      return this.each(function () {

        var thumbnail = $(this).find("a"),
            mainImage = $(this).siblings().find(options.mainImage);

        thumbnail.on("click", function (e) {
          e.preventDefault();
          var galleryImage = $(this).attr("href");
		  var galleryImageAlt = $(this).attr("alt");
          mainImage.attr("src", galleryImage);
		  document.getElementById("main-image-title").innerHTML = galleryImageAlt;
        });

      });

    }

  });

})(jQuery);
