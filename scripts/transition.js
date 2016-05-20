function newCaption(id) {
	var text;
	switch (id) {
		case 0:
			text = "This is a novel of layers. It is not meant to be read top to bottom, start to finish. It is meant to be read inwards.";
			break;
		case 1:
			text = "Use W and S to navigate.";
			break;
		case 2:
			text = "Michel Ge is a student living in Missouri.";
			break;
	}

	$(".caption").fadeOut(function() {
 		$(this).text(text).fadeIn();
	});
}