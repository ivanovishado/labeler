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

$(document).ready(function(){
	$('#left').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/left', {
			content: $('#content').val(),
		}, function (data) {
			updateData(data.title, data.content);
			updateCounter("#display-left-count", data.counter);
		});
		return false;
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
        });
		return false;
    })
});
