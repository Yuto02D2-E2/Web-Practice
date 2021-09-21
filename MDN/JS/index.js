/*
はじめてのJavaScript
write on 2021/09/21
*/


/* MDNチュートリアルの数値あてゲーム */
let random_num = Math.floor(Math.random() * 100) + 1; // constとletの違いが分からん

const guess = document.querySelector(".guess");
const last_res = document.querySelector(".last_res");
const hi_low = document.querySelector(".hi_low");

const submit = document.querySelector(".submit");
const field = document.querySelector(".field");

let cnt = 1;
let reset_btn;

// jsファイルがこの場所まで読み込まれた時点で入力フォーム(field)にフォーカスする
// ちなみに，focus()はhtmlのinputタグに対応するメソッド
field.focus();

// alert("guessing game start!!!");

function check() {
    // alert("check now");
    let user_guess = Number(field.value);
    if (cnt === 1) { guess.textContent = "prev guess: "; } // 比較演算子はイコール3つ
    guess.textContent += user_guess + " ";

    if (user_guess === random_num) {
        last_res.textContent = "wow, great!";
        last_res.style.backgroundColor = "green";
        hi_low.textContent = "";
        game_end();
    } else if (cnt === 10) {
        last_res.textContent = "time over...";
        last_res.style.backgroundColor = "red";
        game_end();
    } else {
        last_res.textContent = "wrong answer";
        last_res.style.backgroundColor = "red";
        if (user_guess < random_num) { hi_low.textContent = "too small"; }
        else if (random_num < user_guess) { hi_low.textContent = "too big"; }
    }
    cnt++;
    field.value = "";
    field.focus();
}

// clickというイベントが発生したときにcheck関数を実行する「イベントリスナー」
submit.addEventListener("click", check);

function game_end() {
    field.disabled = true;
    submit.disabled = true;
    reset_btn = document.createElement("button");
    reset_btn.textContent = "start new game";
    document.body.appendChild(reset_btn);
    reset_btn.addEventListener("click", reset_game);
}

function reset_game() {
    cnt = 1;

    const reset_paras = document.querySelectorAll(".res_paras p");
    for (let i = 0; i < reset_paras.length; i++) {
        reset_paras[i].textContent = "";
    }

    reset_btn.parentNode.removeChild(reset_btn);

    field.disabled = false;
    field.value = "";
    field.focus();
    submit.disabled = false;

    last_res.style.backgroundColor = "white";
    random_num = Math.floor(Math.random() * 100) + 1;
}


/* その他 */
let greeting = document.querySelector(".greeting");
greeting.onclick = function () {
    let user_name = prompt("what your name: ");
    alert("hello ${user_name}, have a nice day!");
}
