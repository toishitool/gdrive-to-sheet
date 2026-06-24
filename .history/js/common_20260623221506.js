/**
 * 外部HTMLファイルを指定した要素に読み込む関数
 */
function loadComponent(url, elementId) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${url}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

/**
 * スクロールフェードインの初期化処理
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  
  reveals.forEach(el => observer.observe(el));
}


/** モーダル操作用の状態管理変数========================================================================== */

let currentStepIndex = 0;
const stepCards = document.querySelectorAll('.step-card');

/** * モーダルを開く関数 */
function openModal(index) {
  currentStepIndex = index;
  updateModalContent();
  document.getElementById('step-modal').style.display = 'flex';
  // 裏側のページを該当ステップへスクロール
  stepCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** * モーダルを閉じる関数 */
function closeModal() {
  document.getElementById('step-modal').style.display = 'none';
}

/** * モーダル内のコンテンツを更新する関数 */
function updateModalContent() {
  const card = stepCards[currentStepIndex];
  const h3Text = card.querySelector('h3').innerText;
  const content = card.querySelector('p').innerText; // 必要に応じて詳細を取得
  
  // モーダル内の要素を書き換え（HTMLに #modal-title 等がある前提）
  document.getElementById('modal-title').innerText = `Step ${currentStepIndex + 1}: ${h3Text}`;
  document.getElementById('modal-body').innerText = content;
  // 画像のソースもここで入れ替える
  document.getElementById('modal-img').src = `images/allow0${currentStepIndex + 1}.png`;

  // プログレスバーの更新（ステップ数は 1〜ステップカードの総数）
  const totalSteps = stepCards.length;
  const currentStep = currentStepIndex + 1;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = (currentStep / totalSteps) * 100 + '%';
  }
}

/*** ステップ移動（左右ボタン用）*/
function navigateStep(direction) {
  currentStepIndex = (currentStepIndex + direction + stepCards.length) % stepCards.length;
  updateModalContent();
  stepCards[currentStepIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** =======モーダルここまで===================================================================*/
// 共通のフォーム送信処理
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlist-form');
  const iframe = document.getElementById('hidden_iframe');
  const success = document.getElementById('waitlist-success');

  if (form && iframe) {
    let submitted = false;

    form.addEventListener('submit', function() {
      submitted = true;
    });

    iframe.onload = function() {
      if (submitted) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      }
    };
  }
});
/** =======共通のフォームここまで===================================================================*/

const selectElement = document.getElementById('t-size');

selectElement.addEventListener('change', function() {
  if (this.value !== "") {
    this.classList.add('selected');
    this.classList.remove('placeholder-active');
  } else {
    this.classList.remove('selected');
    this.classList.add('placeholder-active');
  }
});

/** =======選択肢を変えた瞬間にクラスを切り替えここまで===================================================================*/


// DOM読み込み完了後にまとめて実行
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header.html', 'header-container');
  loadComponent('footer.html', 'footer-container');
  
  // フェードイン処理を呼び出す
  initScrollReveal();
});