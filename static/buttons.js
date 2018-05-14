function updateData(title, content) {
    $("#title").text(title);
    $("#content").text(content);
}

$(document).ready(function(){
	$('#left').on('click keypress', function() {
		$.getJSON($SCRIPT_ROOT + '/left', {
			content: $('#content').text(),
		}, function (data) {
			updateData(data.title, data.content);
		});
		return false;
	});

	$('#right').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/right', {
			content: $('#content').text(),
		}, function (data) {
			updateData(data.title, data.content);
		});
		return false;
    });

	$('#skip').on('click', function () {
		$.getJSON($SCRIPT_ROOT + '/skip', {
		}, function (data) {
			updateData(data.title, data.content);
        });
		return false;
    })
});
