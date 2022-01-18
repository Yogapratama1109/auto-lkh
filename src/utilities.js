let idsQuestion = [];

const getFormQuestions = (formId) => {
    let url = 'https://docs.google.com/forms/d/' + formId + '/formResponse';
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            data = JSON.parse(
                data.split("var FB_PUBLIC_LOAD_DATA_ = ")[1].split(";")[0]
            );

            data[1][1].forEach(function(val) {
                idsQuestion.push(val[4][0][0]);
            });
        },
        error: function(error) {
            alert("Nyalakan extension \"Allow CORS\"!");
        }
    });
}

function fillQuestion(day) {
    let year = day.getFullYear();
    let month = ("0" + (day.getMonth() + 1)).slice(-2);
    let date = ("0" + day.getDate()).slice(-2);

    try {
        let entries = `?entry.${idsQuestion[0]}=${year}-${month}-${date}`;

        entries += `&entry.${idsQuestion[1]}=${noAbsen.val()}`;

        if (isH.is(':checked')) {
            entries += `&entry.${idsQuestion[2]}=H`;
        }else{
            activities.forEach(function (val) {
                entries += `&entry.${idsQuestion[2]}=${val}`;
            })
        }

        return entries;
    } catch (error) {
        return console.log(error);
    }
}

const submitForm = async (formId, day, entries) => {
    let url = 'https://docs.google.com/forms/d/' + formId + '/formResponse' + entries(day);

    return $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function() {
            let now = new Date;
            let randomNum2 = Math.floor(Math.random() * 12);

            $('#terminal-wannabe-textarea').append(
                `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ${tauntMessage2[randomNum2]}&#13;&#10;`
            );
        },
        success: function(data) {
            let now = new Date;
            let dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

            $('#terminal-wannabe-textarea').append(
                `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] SUCCESS Input sholat hari ${dayNames[day.getDay()]}, ${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}&#13;&#10;`
            );
        },
        error: function(xhr, status, error) {
            $('#terminal-wannabe-textarea').append(
                `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ERROR Terjadi Kesalahan Ketika Input sholat hari ${dayNames[day.getDay()]}, ${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}&#13;&#10;`
            );
            $('#terminal-wannabe-textarea').append(
                `Error: ${error} &#13;&#10;`
            );
        }
    });
}