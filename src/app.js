$('#gas').click(function() {
    if (time.val() === '' || noAbsen.val() === '') {
        return alert('isi tanggal / no absen');
    }

    let formId = idsRayon;
    spamLKH(formId);
});

// new Date(new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' }))
const spamLKH = async (formId) => {
    idsQuestion = [];
    await getFormQuestions(formId);

    let now = new Date;
    let randomNum1 = Math.floor(Math.random() * 12);
    $('#terminal-wannabe-textarea').append(
        `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] Memulai proses hacking, ${tauntMessage[randomNum1]} &#13;&#10;`
    );

    $('#gas').prop('disabled', true);
    
    let waktu = new Date(time.val());
    await submitForm(formId, waktu, fillQuestion);
        
    $('#gas').prop('disabled', false);
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});