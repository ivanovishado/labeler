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
		$.getJSON($SCRIPT_ROOT + '/right', {
			content: $('#content').val(),
		}, function (data) {
			updateData(data.title, data.content);
			updateCounter("#display-right-count", data.counter);
		});
		return false;
    });

	$('#skip').on('click', function () {
		$.getJSON($SCRIPT_ROOT + '/skip', {
		    content: $('#content').val(),
		}, function (data) {
			updateData(data.title, data.content);
			updateCounter("#display-center-count", data.counter);
        });
		return false;
    })
});
