// Menangkap elemen form
const rsvpForm = document.getElementById('rsvpForm');

// Menambahkan event listener saat form disubmit
rsvpForm.addEventListener('submit', function(e) {
    // Mencegah form memuat ulang halaman (default behavior)
    e.preventDefault();

    // 1. Ambil nilai dari inputan tamu
    const nama = document.getElementById('namaTamu').value;
    const kehadiran = document.querySelector('input[name="kehadiran"]:checked').value;
    const ucapan = document.getElementById('ucapanTamu').value;

    // Validasi sederhana: Pastikan nama diisi
    if (nama.trim() === '') {
        alert('Mohon isi nama Anda.');
        return;
    }

    // 2. Format pesan yang akan dikirim ke WhatsApp
    let pesanWA = `Halo, saya ${nama}.\n\n`;
    
    if (kehadiran === 'hadir') {
        pesanWA += `Saya *akan hadir* di acara pernikahan Anda.\n\n`;
    } else {
        pesanWA += `Mohon maaf, saya *tidak bisa hadir*.\n\n`;
    }
    
    pesanWA += `Ucapan & Doa:\n"${ucapan}"`;

    // 3. Encode pesan agar aman dikirim lewat URL (mengubah spasi jadi %20, dll)
    const pesanEncoded = encodeURIComponent(pesanWA);

    // 4. Nomor WhatsApp tujuan (Ganti dengan nomor tujuanmu. Gunakan format internasional tanpa '+', misal 62812...)
    const nomorTujuan = '6285751138801';

    // 5. Buka tab baru ke API WhatsApp
    window.open(`https://wa.me/${nomorTujuan}?text=${pesanEncoded}`, '_blank');
});

// Fitur Audio
const btnBuka = document.getElementById('btnBukaUndangan');
const audioLatar = document.getElementById('bgMusic');

btnBuka.addEventListener('click', function() {
    // Memutar musik
    audioLatar.play();
    
    // Opsional: Gulir layar otomatis ke bagian "Couple" setelah diklik
    document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
});

// Fitur Countdown Timer
// 1. Tentukan tanggal tujuan (Format: YYYY-MM-DDTHH:mm:ss)
const tanggalTujuan = new Date('2026-12-12T08:00:00').getTime();

// 2. Buat interval yang diperbarui setiap 1 detik (1000 milidetik)
const timer = setInterval(function() {
    // Waktu saat ini
    const sekarang = new Date().getTime();
    
    // Hitung selisih waktu
    const selisih = tanggalTujuan - sekarang;
    
    // Perhitungan waktu untuk hari, jam, menit, dan detik
    // 1000ms * 60dtk * 60mnt * 24jam = 1 hari
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);
    
    // 3. Tampilkan hasilnya ke elemen HTML
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