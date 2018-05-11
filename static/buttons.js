$(document).ready(function(){
	$('#left').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/left', {
			content: $('#content').text(),
		}, function (data) {
			$("#title").text(data.title);
			$("#content").text(data.content);
		});
		return false;
	});
	$('#right').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/right', {
			content: $('#content').text(),
		}, function (data) {
			$("#title").text(data.title);
			$("#content").text(data.content);
		});
		return false;
    });
});
