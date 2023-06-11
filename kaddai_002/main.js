let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedcount = document.getElementById('typedcount');
const timeupfield = document.getElementById('timeup')

const textLists = [
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

const createText = () => {
    typed = '';
    typedfield.textContent = typed;
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;                // textContent にセットするだけで HTML で表示される？
};    

const keyPress = e => {                          // ここがゲーム本体のループ？から抜けている
    if(e.key !== untyped.substring(0,1)){        // 入力キーが間違っていた時の処理 
        wrap.classList.add('mistyped');          // CSS を当てる mistyped クラスを一時的に追加
        setTimeout(() => {
            wrap.classList.remove('mistyped'); 
        },100)
        return;
    }                                           
    score ++;                                    // 入力キーが合っていた時の処理
    typedCount(score);
    typed += untyped.substring(0, 1);                
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    if(untyped === '') {
        createText();
    }
};

const rankCheck = score => {
    let text = '';
    if(score < 100) {
        text = `Your rank is C.\nFor the B rank need ${100 - score} characters more.`;
    } else if(score < 200) {
        text = `Your rank is B.\nFor the A rank need ${200 - score} characters more.`;
    } else if(score < 300) {
        text = `Your rank is A.\nFor the S rank need ${300 - score} characters more.`;
    } else if(score >= 300) {
        text = `Your rank is S.\nCongratulations.`;
    }

    return `${score} characters typed.\n${text}\n[OK] retry / [Cancel] quit`;
};

const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));      // confirm メソッドで、OK、キャンセルボタン付きのダイアログ表示 (入力待ちで１度処理が止まる)
    if(result == true) {
        window.location.reload();                  // OK ボタンが押された場合、ブラウザをリロード
    }
};

const timer =() => {
    showTimeOut();                      // 15s がうまくシンクロする？               
    let time = count.textContent;       // time に HTML から 60 を取ってくる
    const id = setInterval(() => {      // id はタイマーの id
        time--;
        count.textContent = time;
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);                          // 1000ミリ(1)秒毎のループ処理 
};                            

start.addEventListener("click", () => {                   // start ボタンが押されたらゲームが始まる　　ここが本体。
    timer();
    createText();
    start.style.display = 'none';                         // start ボタンを非表示にする
    document.addEventListener('keypress', keyPress);      // ここの処理は何？
});

untypedfield.textContent = 'press start begin the game.';  // なぜここで宣言を？


const typedCount =(score) => {
    typedcount.textContent = score;
};

const showTimeOut =() => {                           // setTimeout を使うと gameOver 関数の外で動かさないといけないので、上手くないのでは？
    setTimeout(() => {                               // gameOver 関数の中に入れちゃうのが自然         
        typedfield.style.display = 'none';           
        untypedfield.style.display = 'none';         // getElementById で取ってきたオブジェクトに対して適用させる
        timeupfield.textContent = 'タイムアップ！';  
    },14900)                                         // 15秒のつじつま合わせをしています           
};