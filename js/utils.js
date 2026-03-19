/** ===== UTILS ===== */

/**
 * イージング関数（easeInOutCubic）
 * スクロールの速度変化（加速→減速）に使用
 *
 * @param {number} p - 進行度（0-1）
 * @returns {number} イージング後の値
 */
function ease(p) {
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }
  /**
   * 要素までスムーズスクロールする関数
   *
   * 仕組み：
   * ・アニメーション開始位置（startY）を記録
   * ・requestAnimationFrame で毎フレーム滑らかに動かす
   * ・イージング関数で速度変化を制御
   * ・毎フレームごとに「最新の要素位置」を計算してるのでレイアウト変化に強い
   *
   * @param {HTMLElement} el - スクロール先の要素
   * @param {number} duration - アニメーション時間（ミリ秒）
   * @param {number} scrollMargin - 固定ヘッダー分の調整マージン
   */
function smoothScrollToEl(el, duration = 1000, scrollMargin = 40) {
  // アニメーション開始位置（現在のスクロール位置）を記録
  const startY = window.scrollY;
  // 目的地はスクロール開始時に1回だけ計算して固定する
  const targetY = window.scrollY + el.getBoundingClientRect().top - scrollMargin;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const dest = Math.min(targetY, maxY);
  // アニメーション開始時刻を記録
  let start = null;
  function step(t) {
    if (!start) start = t;
    // アニメーションの進行度（0〜1）
    const p = Math.min((t - start) / duration, 1);
    // イージングして滑らかにスクロール位置を決定
    const y = startY + (dest - startY) * ease(p);
    // 実際にスクロール
    window.scrollTo(0, y);
    // まだ完了してない場合は次のフレームで再実行
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/**
 * メールアドレスをコピーする関数
 */
function copyEmail() {
  const text = document.getElementById("email")?.innerText?.trim() ?? "";
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    showToast("コピーしました");
  });
}

let toastTimerId = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;

  if (toastTimerId) {
    clearTimeout(toastTimerId);
    toastTimerId = null;
  }

  toast.classList.remove("show");
  // reflow（連打時でもアニメが確実に走るように）
  void toast.offsetWidth;
  toast.classList.add("show");

  toastTimerId = setTimeout(() => {
    toast.classList.remove("show");
    toastTimerId = null;
  }, 1500);
}
