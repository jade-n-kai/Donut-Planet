// 穴埋め形式です。空いている箇所を埋めて実装してください

$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".toggle_btn").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
  $(".menu.b").on("click", function () {
    $("header").toggleClass("open");
  });
});

/*=================================================
アコーディオンメニュー
===================================================*/
let accordionDetails = '.js-details';
let accordionSummary = '.js-details-summary';
let accordionContent = '.js-details-content';
let speed = 300

$(accordionSummary).each(function () {
  $(this).on("click", function (event) {
    // デフォルトの挙動を無効化
    event.preventDefault();
    // summaryにis-activeクラスを切り替え
    $(this).toggleClass("is-active");

    if ($(this).parent($(accordionDetails)).attr("open")) {
      // アコーディオンを閉じるときの処理
      $(this).nextAll($(accordionContent)).slideUp(speed, function () {
        // アニメーションの完了後にopen属性を取り除く
        $(this).parent($(accordionDetails)).removeAttr("open");
      });
    } else {
      // アコーディオンを開くときの処理
      // open属性を付ける
      $(this).parent($(accordionDetails)).attr("open", "true");
      // いったんdisplay:none;してからslideDownで開く
      $(this).nextAll($(accordionContent)).hide().slideDown(speed);
    }
  })
});

/*=================================================
スムーススクロール
===================================================*/
var headerHeight = 300;
$('a[href^="#"]').click(function () {
  // クリックしたaタグのリンクを取得
  let href = $(this).attr("href");
  // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
  let target = $(href == "#" || href == "" ? "html" : href);
  // ページトップからジャンプ先の要素までの距離を取得
  let position = target.offset().top - headerHeight;
  // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
  // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
  $("html, body").animate({ scrollTop: position }, 600, "swing");
  // urlが変化しないようにfalseを返す
  $("header").removeClass("open");
  return false;
});

// 別ページ遷移後のスムーススクロール
const urlHash = location.hash;
if (urlHash) {
  const target = jQuery(urlHash);
  if (target.length) {
    // ページトップから開始（ブラウザ差異を考慮して併用）
    history.replaceState(null, '', window.location.pathname);
    jQuery("html,body").stop().scrollTop(0);

    jQuery(window).on("load", function () {
      const headerHeight = jQuery("header").outerHeight();
      const position = target.offset().top - headerHeight - 20;
      jQuery("html, body").animate({ scrollTop: position }, 600, "swing");

      // ハッシュを再設定
      history.replaceState(null, '', window.location.pathname + urlHash);
    });
  }
}




