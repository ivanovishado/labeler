function updateData(updatedTitle, updatedContent) {
    $("#title").text(updatedTitle);
    let content = $("#content");
    content.val(updatedContent);
    content.height(content.scrollHeight);
}

$(document).ready(function(){
	$('#left').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/left', {
			content: $('#content').val(),
		}, function (data) {
			updateData(data.title, data.content);
		});
		return false;
	});

	$('#right').on('click', function() {
		$.getJSON($SCRIPT_ROOT + '/right', {
			content: $('#content').val(),
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
