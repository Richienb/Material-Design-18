/* Material '18 by MartonDev
  https://martondev.github.io/Material-Design-18/
  Licensed under the MIT license
 */

var navOpened = false;
var mobile = false;
var uncloseableModals = [];
var marginbottom = 45;
var toasts = [];

$(document).ready(function() {

  Waves.init();
  Waves.attach('.waves-effect', ['waves-button', 'waves-float']);

  var navProtector = document.createElement("DIV");

  $(navProtector).addClass("nav-protector");
  $(navProtector).css("height", $("nav").css("height"));
  $("#sidenav").after(navProtector);

  if ($(window).width() <= 320) {

    mobile = true;

  }

  $("#menuTrigger").click(function() {

    if(navOpened) {

      $("#main").css("margin-left", "0");
      $("footer").css("margin-left", "-30px");

      if($(document).scrollTop() < 50) {

        $("nav.collapsing").css("width", "90%");
        $("nav.collapsing").css("margin-left", "5%");

      }else {

        if(mobile) {

          $("nav.collapsing").css("width", "90%");
          $("nav.collapsing").css("margin-left", "5%");

        }else {

          $("nav.collapsing").css("margin-left", "10px");

        }

      }

      $("#menuTrigger .close").fadeOut();
      $("#menuTrigger .menu").fadeIn();

      navOpened = false;

    }else {

      $("#main").css("margin-left", "250px");

      $("nav.collapsing").css("width", "30%");
      $("nav.collapsing").css("margin-left", "300px");

      $("#menuTrigger .menu").fadeOut();
      $("#menuTrigger .close").fadeIn();

      navOpened = true;

    }

  });

  $(".code").click(function() {

  	this.select();
  	document.execCommand("copy");

  });

  $('input[type="range"]').on('input', function() {

    if(!($(this).attr("disabled"))) {

      var control = $(this);
      var controlMin = control.attr('min');
      var controlMax = control.attr('max');
      var controlVal = control.val();
      var controlThumbWidth = control.data('thumbwidth');
      var range = controlMax - controlMin;
      var position = ((controlVal - controlMin) / range) * 100;
      var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
      var output = control.next('output');

      output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)');
      output.html("<span>" + controlVal + "</span>");

    }

  });

  $(document).on("scroll", function() {

    if(!mobile) {

      if(!navOpened) {

        if($(document).scrollTop() > 50) {

          $("nav.collapsing").css("width", "30%");
          $("nav.collapsing").css("margin-left", "10px");

        }else {

          $("nav.collapsing").css("width", "90%");
          $("nav.collapsing").css("margin-left", "5%");

        }

      }

    }

  });

  $(window).resize(function(){

    if ($(window).width() < 790) {

      mobile = true;

    }else {

      mobile = false;

    }

  });

});

jQuery(function($) {

  $('.field-input').focus(function() {

    $(this).parent().addClass('is-focused has-label');

    for(var i = 0; i < document.getElementsByClassName("character-counter").length; i++) {

      if($(document.getElementsByClassName("character-counter")[i]).attr("countChar") == $(this).attr("id")) {

        if($(this).parent().hasClass("success")) {

          $(document.getElementsByClassName("character-counter")[i]).css("color", "#64dd17");

        }else if($(this).parent().hasClass("warning")) {

          $(document.getElementsByClassName("character-counter")[i]).css("color", "#ffab00");

        }else if($(this).parent().hasClass("error")) {

          $(document.getElementsByClassName("character-counter")[i]).css("color", "#dd2c00");

        }else {

          $(document.getElementsByClassName("character-counter")[i]).css("color", "#1a73e8");

        }

      }

    }

  });

  $(".field-input").each(function() {

    if($(this).val() != "") {

      $(this).parent().addClass("has-label");

    }

  });

  $("select").each(function() {

    var dropdownTitle = $(this).attr("select-title");
    var dropdownId = $(this).attr("id") + "Dropdown";
    var options = "";

    $(this).append('<option value="" selected disabled></option>');

    $($(this).attr("id") + " option").each(function() {

      if($(this).html() != "") {

        options += '<li class="waves-effect" value="' + $(this).attr("value") + '">' + $(this).html() + '</li>';

      }

    });

    $(this).after('<div class="dropdown" id="' + dropdownId + '" select-id="' + $(this).attr("id") + '"><div class="dropdown-header waves-effect" onclick="toggleDropdown(' + dropdownId + 'Ul)" id="' + dropdownId + 'Header"><h1>' + dropdownTitle + '</h1><i class="material-icons">arrow_drop_down</i></div><ul id="' + dropdownId + 'Ul">' + options + '</ul></div>');

    var ulWidth = $("#" + dropdownId + "Header").width() + 24;

    $("#" + dropdownId + "Ul").css("width", ulWidth + "px");

    if($($("#" + dropdownId + "Header").parent().attr("select-id")).attr("disabled")) {

      $("#" + dropdownId + "Header").css("cursor", "not-allowed");

    }

  });

  $(window).click(function() {

    $(".dropdown ul").each(function() {

      if($(this).css("display") == "block") {

        toggleDropdown(this);

      }

    });

  });

  $(".dropdown-header").click(function(event) {

    event.stopPropagation();

  });

  $(".dropdown ul li").click(function() {

    $("#" + $($(this).parent()).parent().attr("select-id")).val($(this).attr("value"));
    $("#" + $($(this).parent()).parent().attr("id") + "Header h1").html($(this).html());

  });

  $(".character-counter").each(function() {

    $(this).html("0");

  });

  $('input[type=text], input[type=email], input[type=tel], input[type=url], input[type=password], input[type=search], textarea').each(function() {

    $(this).keyup(function() {

      for(var i = 0; i < document.getElementsByClassName("character-counter").length; i++) {

        if($(document.getElementsByClassName("character-counter")[i]).attr("countChar") == $(this).attr("id")) {

          $(document.getElementsByClassName("character-counter")[i]).html($(this).val().length);

        }

      }

    });

  });

  $('.field-input').blur(function() {

    if($(this).attr("type") != "date") {

      $parent = $(this).parent();

      if($(this).val() == '') {

        $parent.removeClass('has-label');

      }

      $parent.removeClass('is-focused');

    }

    for(var i = 0; i < document.getElementsByClassName("character-counter").length; i++) {

      if($(document.getElementsByClassName("character-counter")[i]).attr("countChar") == $(this).attr("id")) {

        $(document.getElementsByClassName("character-counter")[i]).css("color", "rgb(163, 163, 163)");

      }

    }

  });

  $(".checkbox-field").each(function() {

    $(this).find("span.checkbox").html('<i class="material-icons checked-icon">check_box</i><i class="material-icons unchecked-icon">check_box_outline_blank</i>');
    $(this).find("span.checkbox .material-icons.unchecked-icon").css("margin-left", "-" + $(this).find("span.checkbox .material-icons.unchecked-icon").css("font-size"));

    if($(this).find("input[type=checkbox]").is(":checked")) {

      $(this).find("span.checkbox").addClass("checked-checkbox");

    }else {

      $(this).find("span.checkbox").removeClass("checked-checkbox");

    }

  });

  $(".checkbox-field").click(function() {

    if($(this).find("input[type=checkbox]").is(":checked")) {

      $(this).find("span.checkbox i.material-icons").html("check_box");
      $(this).find("span.checkbox").addClass("checked-checkbox");

    }else {

      $(this).find("span.checkbox i.material-icons").html("check_box_outline_blank");
      $(this).find("span.checkbox").removeClass("checked-checkbox");

    }

  });

  $("input[type=date]").each(function() {

    $(this).parent().addClass("is-focused has-label");

  });

  $("input[type=file]").each(function() {

    var fileInpt = this;
    var btn = document.createElement("BUTTON");

    $(btn).addClass($(this).attr("theme"));
    $(btn).html($(this).attr("displayText"));

    $(btn).click(function() {

      $(fileInpt).click();

    });

    $(this).after(btn);

  });

  $("input[type=file]").change(function() {

    if($(this).val().split('\\').pop() != "") {

      $(this).next().html($(this).val().split('\\').pop());

    }else {

      $(this).next().html($(this).attr("displayText"));

    }

  });

  $(".modal-toggle").click(function() {

    toggleModal($(this).attr("modal-toggle"));

  });

  $(window).click(function(event) {

    if($(event.target).hasClass("modal")) {

      toggleModal($(event.target).attr("id"));

    }

  });

  $(".modal-header .close").click(function() {

    toggleModal($(this).parent().parent().parent().attr("id"));

  });

  $("input[type=number]").each(function() {

    console.warn("Number input use detected. We suggest you using range inputs instead (https://martondev.github.io/Material-Design-18/other-inputs).");

  });

  setInterval(function() {

    $("input.shadowed-input").each(function() {

      var setColor = false;

      if($(this).is(":focus")) {

        switch ($(this).css("caret-color")) {

          case "rgb(26, 115, 232)":
            $(this).css("caret-color", "#DB4437");

            break;

          case "rgb(219, 68, 55)":
            $(this).css("caret-color", "#F4B400");

            break;

          case "rgb(244, 180, 0)":
            $(this).css("caret-color", "#0F9D58");

            break;

          case "rgb(15, 157, 88)":
            $(this).css("caret-color", "#1a73e8");

            break;

        }

      }

    });

  }, 1500);

  setInterval(function() {

    marginbottom = 45;

    for (var i = 0; i < toasts.length; i++) {

      $("#" + toasts[i]).css("margin-bottom", marginbottom + "px");

      marginbottom += 45;

    }

  }, 100);

  $(".determinate").each(function() {

    $(this).css("width", $(this).attr("percentage") + "%");

  });

  $(".determinate").each(function() {



  });

});

function toggleDropdown(dropdownUl) {

  var dropdownHeader = "#" + $(dropdownUl).attr("id").replace("Ul", "Header");

  if($(dropdownUl).css("display") == "none" && !($($(dropdownHeader).parent().attr("select-id")).attr("disabled"))) {

    $(dropdownUl).css("display", "block");
    $(dropdownHeader).css("margin-bottom", "-5px");
    $(dropdownHeader).css("border-bottom-left-radius", "0");
    $(dropdownHeader).css("border-bottom-right-radius", "0");

  }else {

    $(dropdownUl).css("display", "none");
    $(dropdownHeader).css("margin-bottom", "7px");
    $(dropdownHeader).css("border-bottom-left-radius", "8px");
    $(dropdownHeader).css("border-bottom-right-radius", "8px");

  }

}

function toggleModal(modalID) {

  if($("#" + modalID).css("display") == "none") {

    $("#" + modalID).css("display", "block");

    setTimeout(function() {

      $("#" + modalID + " .modal-container").css("transform", "scale(1.0)");

    }, 200);

  }else {

    if(!uncloseableModals.includes(modalID)) {

      $("#" + modalID + " .modal-container").css("transform", "scale(0)");

      setTimeout(function() {

        $("#" + modalID).css("display", "none");

      }, 200);

    }

  }

}

function toggleCloseable(modalID, closeable) {

  if(!closeable) {

    uncloseableModals.push(modalID);

  }else {

    var indexOf = uncloseableModals.indexOf(modalID);

    if (indexOf > -1) {

      uncloseableModals.splice(indexOf, 1);

    }

  }

}

function showToast(content, durration) {

  var id = makeId();
  var idof = "#" + id;
  var marginBtm = marginbottom + "px";

  toasts.push(id);
  $("body").append('<div id="' + id + '" class="toast"><h1>' + content + '</h1></div>');
  $(idof).css("margin-bottom", "-100px");
  $(idof).css("opacity", "1");

  marginbottom += ($("#toast24405").height() + 15);

  setTimeout(function() {

    $(idof).css("right", "-100%");

  }, durration);

  durr = durration + 200;

  setTimeout(function() {

    var indexOf = toasts.indexOf(id);

    if (indexOf > -1) {

      toasts.splice(indexOf, 1);

      $(idof).remove();

    }

  }, durr);

}

function dismissToast(toast) {

  $(toast).css("right", "-100%");

  setTimeout(function() {

    var indexOf = toasts.indexOf($(toast).attr("id"));

    if (indexOf > -1) {

      toasts.splice(indexOf, 1);

      $(toast).remove();

    }

  }, 200);

}

function makeId() {

  var text = "toast";
  var possible = "0123456789";

  for (var i = 0; i < 5; i++) {

    text += possible.charAt(Math.floor(Math.random() * possible.length));

  }

  return text;

}
