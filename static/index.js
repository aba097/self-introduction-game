$(document).ready(function(){
    $("#time-slider").slider({
        range: "min",
        min: 0,
        max: 300, // 5 minutes * 60 seconds
        step: 1, // 1 second interval
        value: 0, // Default to 1 minute (60 seconds)
        slide: function(event, ui){
            const minutes = Math.floor(ui.value / 60);
            const seconds = ui.value % 60;
            const formattedMinutes = (minutes > 0 ) ? minutes.toString() + "分" : ""
            const formattedSeconds = seconds.toString() + "秒"

            $("#selected-time").text(formattedMinutes + formattedSeconds);
        }
    });

    $("#start-game").click(function(){
        var selectedTime = $("#time-slider").slider("value");
        window.location.href = "game.html?time=" + selectedTime;
    });
});