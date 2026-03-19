/**
 * アプリケーションの初期化処理
 * ヘッダー、アンカーリンク
 */

(function () {

  /* =====================================
   *  ヘッダー（ハンバーガーメニュー）
   * ===================================== */
  const btn     = document.querySelector('.globalNav__button');
  const nav     = document.getElementById('globalNav');
  const overlay = document.querySelector('[data-nav-overlay]');

  const TRANS_MS = 250; // CSS transition と揃える

  function setOpen(open) {
    document.body.classList.toggle('nav-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (nav) nav.setAttribute('aria-hidden',   open ? 'false' : 'true');
  }

  if (btn)     btn.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
  if (overlay) overlay.addEventListener('click', () => setOpen(false));

  /* =====================================
   *  アンカースクロール（通常・ハンバーガー共通）
   * ===================================== */

  /**
   * アンカーリンクのクリックハンドラ
   * scroll-margin-top で位置制御するため JS 側のオフセットは 0
   */
  function handleAnchorClick(e) {
    e.preventDefault();

    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if (!target) return;

    const isNavOpen = document.body.classList.contains('nav-open');

    if (isNavOpen) {
      setOpen(false);
      // ドロワーの閉じアニメーション完了後にスクロール
      setTimeout(() => {
        document.body.classList.remove('no-scroll');
        smoothScrollToEl(target, 1000, 0);
      }, TRANS_MS + 20);
    } else {
      smoothScrollToEl(target, 1000, 0);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', handleAnchorClick);
  });

}());
