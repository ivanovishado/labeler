function updateData(updatedTitle, updatedContent) {
    $("#title").text(updatedTitle);
    $("#content").val(updatedContent);
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    });
}

function updateCounter(counterElement, updatedCounter) {
    $(counterElement).text(updatedCounter);
}

function updateInfo(route, display) {
	$.getJSON($SCRIPT_ROOT + route, {
		content: $('#content').val(),
	}, function (data) {
		updateData(data.title, data.content);
		updateCounter(display, data.counter);
	});
	return false;
}

$(document).ready(function(){
	$('#left').on('click', function() {
		updateInfo('/left', "#display-left-count");
	});

	$('#right').on('click', function() {
		updateInfo('/right', "#display-right-count");
    });

	$('#skip').on('click', function () {
		updateInfo('/skip', "#display-center-count");
    })
});
