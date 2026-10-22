// Event listener
const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('namaTamu').value;
    const kehadiran = document.querySelector('input[name="kehadiran"]:checked').value;
    const ucapan = document.getElementById('ucapanTamu').value;

    if (nama.trim() === '') {
        alert('Mohon isi nama Anda.');
        return;
    }

    let pesanWA = `Halo, saya ${nama}.\n\n`;
    
    if (kehadiran === 'hadir') {
        pesanWA += `Saya *akan hadir* di acara pernikahan Anda.\n\n`;
    } else {
        pesanWA += `Mohon maaf, saya *tidak bisa hadir*.\n\n`;
    }
    
    pesanWA += `Ucapan & Doa:\n"${ucapan}"`;

    const pesanEncoded = encodeURIComponent(pesanWA);

    const nomorTujuan = '6285751138801';

    window.open(`https://wa.me/${nomorTujuan}?text=${pesanEncoded}`, '_blank');
});

// Fitur Audio
const btnBuka = document.getElementById('btnBukaUndangan');
const audioLatar = document.getElementById('bgMusic');

btnBuka.addEventListener('click', function() {
    audioLatar.play();
    document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
});

// Fitur Countdown Timer
const tanggalTujuan = new Date('2026-12-12T08:00:00').getTime();

const timer = setInterval(function() {
    const sekarang = new Date().getTime();
    
    const selisih = tanggalTujuan - sekarang;
    
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);
    
    const elemenCountdown = document.getElementById('countdown');
    
    if (selisih < 0) {
        clearInterval(timer);
        elemenCountdown.innerHTML = "<h4>Acara Sedang Berlangsung / Selesai</h4>";
    } else {
        elemenCountdown.innerHTML = `
            <div class="text-center"><h3 class="mb-0">${hari}</h3><small>Hari</small></div>
            <div class="text-center"><h3 class="mb-0">${jam}</h3><small>Jam</small></div>
            <div class="text-center"><h3 class="mb-0">${menit}</h3><small>Menit</small></div>
            <div class="text-center"><h3 class="mb-0">${detik}</h3><small>Detik</small></div>
        `;
    }
}, 1000);