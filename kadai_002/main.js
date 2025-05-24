let untyped = "";
let typed = "";
let score = "";
const typedfield = document.getElementById('typed');
const untypedfield = document.getElementById('untyped');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

const textLists = [
  'Hello World',
  'This is my App',
  'How are you?'
];

// ランダムなテキストを表示
const createText = () => {
  typed = "";
  typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  // 誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }
  score++;
  typed = typed + untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  if (untyped === "") {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

  // スコアの値を返す
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCランクです。\nBランクまで${score}文字です`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    if (result == true) {
      window.location.reload();
    }
  }, 10);
};

// カウントダウンタイマー
const timer = () => {
  let time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;
    if (time <= 0) {
      typed = "";
      untyped = "タイムアップ!";
      typedfield.textContent = typed;
      untypedfield.textContent = untyped;
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click', () => {
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';