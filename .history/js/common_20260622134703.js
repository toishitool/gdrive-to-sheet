/**
 * 外部HTMLファイルを指定した要素に読み込む関数
 * @param {string} url - 読み込むHTMLファイルのパス
 * @param {string} elementId - 挿入先のID
 */
function loadComponent(url, elementId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load ${url}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header.html', 'header-container');
  loadComponent('footer.html', 'footer-container');
});