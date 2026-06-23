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

// DOM読み込み完了後にまとめて実行
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header.html', 'header-container');
  loadComponent('footer.html', 'footer-container');
  
  // フェードイン処理を呼び出す
  initScrollReveal();
});