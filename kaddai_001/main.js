let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedcount = document.getElementById('typedcount');

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
    untypedfield.textContent = untyped;
};    

const keyPress = e => {
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped'); 
        },100)
        return;
    }                                           
    score ++;
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
    const result = confirm(rankCheck(score));
    if(result == true) {
        window.location.reload();
    }
};

const timer =() => {
    let time = count.textContent;
    const id = setInterval(() => {
        time--;
        count.textContent = time;
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};                            

start.addEventListener("click", () => {
    timer();
    createText();
    start.style.display = 'none';
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'press start begin the game.';   

const typedCount =(score) => {
    typedcount.textContent = score;
}