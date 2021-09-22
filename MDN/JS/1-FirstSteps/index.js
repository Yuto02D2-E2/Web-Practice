/*
はじめてのJavaScript
write on 2021/09/21
*/


/* MDNチュートリアルの数値あてゲーム */

// jsの変数定義ではvar/let/constの三種類が使えるが，let/constのみを使用する
// varは古い言語使用なので，letの方が安全．定数にはconstを使用する
// 全部書き終わってからコメント書いてるから今更やけど，JSでは変数名にlowerCamelCaseが使われるらしい
let random_num = Math.floor(Math.random() * 100) + 1;

const guess = document.querySelector(".guess");
const last_res = document.querySelector(".last_res");
const hi_low = document.querySelector(".hi_low");

const submit = document.querySelector(".submit");
const field = document.querySelector(".field");
const restart = document.querySelector(".restart");

let cnt = 1;
let reset_btn = null;

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
        last_res.style.backgroundColor = "yellow";
        if (user_guess < random_num) { hi_low.textContent = "too small"; }
        else if (random_num < user_guess) { hi_low.textContent = "too big"; }
    }
    cnt++;
    field.value = "";
    field.focus();
}

// submit要素に対してclickというイベントが発生したときにcheck関数を実行する「イベントリスナー」
submit.addEventListener("click", check);

function game_end() {
    field.disabled = true;
    submit.disabled = true;
    restart.disabled = true;
    let game = document.getElementById("guessing_game");
    reset_btn = document.createElement("button");
    reset_btn.textContent = "start new game";
    game.appendChild(reset_btn);
    reset_btn.addEventListener("click", reset_game);
}

restart.addEventListener("click", reset_game);
function reset_game() {
    cnt = 1;

    const reset_paras = document.querySelectorAll(".last_res");
    for (let i = 0; i < reset_paras.length; i++) {
        reset_paras[i].textContent = "";
    }

    if (reset_btn != null) {
        reset_btn.parentNode.removeChild(reset_btn);
        reset_btn = null;
    }

    field.disabled = false;
    field.value = "";
    field.focus();
    submit.disabled = false;
    restart.disabled = false;

    last_res.style.backgroundColor = "white";
    random_num = Math.floor(Math.random() * 100) + 1;
}


/* canvas */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 200); // (x, y, w, h)


/*  alert prompt */
let greeting = document.querySelector(".greeting");
greeting.onclick = function () {
    let user_name = prompt("what your name: ");
    // alert("hello " + user_name + ", have a nice day!");

    // プレースホルダー${}で文字列に変数を埋め込める
    // 注意：テンプレートリテラルを使用する場合はダブル/シングルクォートをバッククォートに変更しなければならない
    alert(`hello ${user_name}, have a nice day!`);
}


/* バカ話ジェネレーター */
const customName = document.getElementById('customname');
// customName.focus();
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const clear = document.querySelector(".clear");
clear.addEventListener("click", clear_story);
function clear_story() {
    story.style.visibility = "hidden"; // visibility := visible/hidden
}

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = "Willy the Goblin,Big Daddy,Father Christmas".split(",");
const insertY = "the soup kitchen,Disneyland,the White House".split(",");
const insertZ = "spontaneously combusted,melted into a puddle on the sidewalk,turned into a slug and crawled away".split(",");

randomize.addEventListener("click", result);
function result() {
    let newStory = storyText; // Rustだと所有権の問題でこんなことしたらダメだけど，JSならできちゃう
    let xItem = randomValueFromArray(insertX); // ここの処理汚いな．xItem-zItemを一つの配列にしてloopで回したい
    newStory = newStory.replace(/:insertx:/g, xItem);
    let yItem = randomValueFromArray(insertY);
    newStory = newStory.replace(/:inserty:/g, yItem);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replace(/:insertz:/g, zItem);

    if (customName.value !== "") {
        let name = customName.value;
        newStory = newStory.replace(/Bob/g, name);  // replaceは一度に一か所しか置換できないので正規表現を利用する
    }
    if (document.getElementById("uk").checked) {
        let weight = Math.round(300 * 0.071429) + " stone";
        newStory = newStory.replace(/300 pounds/g, weight);
        let temperature = Math.round((94 - 32) / 1.8) + " centigrade";
        newStory = newStory.replace(/94 fahrenheit/g, temperature);
    }
    story.textContent = newStory;
    story.style.visibility = "visible";
}
