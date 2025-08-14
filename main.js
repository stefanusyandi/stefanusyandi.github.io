const tap = document.getElementById("tap-1");
const s2 = document.getElementById("scene-2");
const s3 = document.getElementById("scene-3");
const scenes = [tap, s2, s3];
const text = `
Semoga dengan bertambahnya usiamu, semakin sempurna juga imanmu, makin rajin ibadahnya, selalu diberi kesehatan oleh Yang Maha Kuasa, dipanjangkan umurnya, selalu bahagia, selalu berbakti kepada orang tua, dan semoga segala doa serta cita-cita yang kamu inginkan bisa terwujud dengan mudah. Aamiin.
<
Hari ini hari spesial kamu, sayang. Sekarang kamu semakin dewasa, yang pastinya udah tahu mana yang baik dan nggak baik buat dirimu. Aku harap kamu bisa lebih bijak dan dewasa dari sebelumnya, terus semangat untuk memperbaiki diri jadi pribadi yang lebih baik lagi. Jangan pernah lelah mengejar semua impian kamu, karena aku percaya kamu pasti bisa.
<
Jangan takut gagal ya, sayang. Selama aku ada, aku bakal selalu dukung kamu dan support kamu sepenuh hati. Tetap rendah hati, jadi anak yang baik, dan selalu sayang sama keluargamu. Jangan lupa untuk selalu bersyukur atas setiap hal kecil maupun besar yang kamu terima.
<
Hadiah dari aku memang cuma boneka sederhana, tapi ada artinya. Boneka ini aku titipin rasa sayangku. Biar saat kamu peluk dia, kamu ngerasa aku ada di situ, nemenin kamu. Walaupun aku nggak bisa selalu ada secara fisik, boneka ini jadi pengingat kalau ada seseorang di sini yang peduli dan sayang sama kamu tanpa syarat.
<
Walaupun kita terhalang jarak, percayalah… doaku nggak pernah jauh darimu. Aku selalu minta sama Allah supaya kamu selalu diberi kelancaran, keselamatan, dan dijaga dalam setiap langkahmu.
<
Semoga di ulang tahun berikutnya, aku bisa ada di sisimu, merayakan bareng, dan melihat senyum kamu dari dekat. Aamiin.
<
Selamat ulang tahun sekali lagi, sayangku. Semoga semua yang kamu lakukan hari ini, besok, dan seterusnya selalu dimudahkan dan diberkahi. 💙
`

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeScene(scene) {
    scene.classList.remove("opacity-100");
    scene.classList.add("opacity-0");
    await sleep(500);
    scenes.forEach(s => {s.classList.add("hidden")});

    const nextScene = scenes[scenes.indexOf(scene) + 1];
    nextScene.classList.remove("opacity-100");
    nextScene.classList.add("opacity-0");
    nextScene.classList.remove("hidden");
    void nextScene.offsetWidth;

    nextScene.classList.remove("opacity-0");
    nextScene.classList.add("opacity-100");

}

function typeText(element, text, delay = 100) {
    let index = 0;
    async function type() {
        if (index < text.length) {
            const char = text.charAt(index) == "<" ? "<br>" : text.charAt(index);
            element.innerHTML += char;
            index++;
            element.scrollTop = element.scrollHeight;
            await sleep(delay)
            setTimeout(type, delay);
        }
    }
    type();
}


let s3_visible = false;
function main() {
    const buttons = document.getElementsByClassName("button");
    const t = document.getElementById("tulisan");


    const observer = new MutationObserver(mutations => {
        mutations.forEach(async (mutation) => {
            if (mutation.attributeName === 'class') {
                if (!s3.classList.contains('hidden') && s3_visible == false) {
                    s3_visible = true;
                    console.log('Div became visible!');
                    s3.style.backgroundImage = "url('./confetti_opening.gif')";
                    await sleep(2000);
                    s3.style.backgroundImage = "url('./confetti.gif')";
                    await sleep(100);
                    typeText(t, text, 20);
                }
            }
        });
    });

    observer.observe(s3, { attributes: true });

    Array.from(buttons).forEach(button => {
        button.addEventListener("click", async () => {
            button.classList.remove('clicked');
            void button.offsetWidth;
            button.classList.add('clicked');
            await sleep(100);
            changeScene(button.parentElement);
        })
    })
}

main();