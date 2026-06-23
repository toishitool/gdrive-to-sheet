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
}

/*** ステップ移動（左右ボタン用）*/
function navigateStep(direction) {
  currentStepIndex = (currentStepIndex + direction + stepCards.length) % stepCards.length;
  updateModalContent();
  stepCards[currentStepIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** =======モーダルここまで===================================================================*/


// DOM読み込み完了後にまとめて実行
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header.html', 'header-container');
  loadComponent('footer.html', 'footer-container');
  
  // フェードイン処理を呼び出す
  initScrollReveal();
});