/*!========================================================================
 *  hexo-theme-snippet: app.js v1.0.0
 * ======================================================================== */
window.onload = function () {
  var $body = document.body,
    $mnav = document.getElementById("mnav"), //获取导航三角图标
    $mainMenu = document.getElementById("main-menu"), //手机导航
    $process = document.getElementById("process"), //进度条
    $ajaxImgs = document.querySelectorAll(".img-ajax"), //图片懒加载
    $commentsCounter = document.getElementById("comments-count"),
    $gitcomment = document.getElementById("gitcomment"),
    $backToTop = document.getElementById("back-to-top"),
    $toc = document.getElementById("article-toc"),
    timer = null;

  //设备判断
  var isPC = true;
  (function (designPercent) {
    function params(u, p) {
      var m = new RegExp("(?:&|/?)" + p + "=([^&$]+)").exec(u);
      return m ? m[1] : "";
    }
    if (
      /iphone|ios|android|ipod/i.test(navigator.userAgent.toLowerCase()) ==
        true &&
      params(location.search, "from") != "mobile"
    ) {
      isPC = false;
    }
  })();

  //手机菜单导航
  $mnav.onclick = function () {
    var navOpen = $mainMenu.getAttribute("class");
    if (navOpen.indexOf("in") != "-1") {
      $mainMenu.setAttribute("class", "collapse navbar-collapse");
    } else {
      $mainMenu.setAttribute("class", "collapse navbar-collapse in");
    }
  };

  //首页文章图片懒加载
  function imgsAjax($targetEles) {
    if (!$targetEles) return;
    var _length = $targetEles.length;
    if (_length > 0) {
      var scrollBottom = getScrollTop() + window.innerHeight;
      for (var i = 0; i < _length; i++) {
        (function (index) {
          var $this = $targetEles[index];
          var $this_offsetZero =
            $this.getBoundingClientRect().top +
            window.pageYOffset -
            document.documentElement.clientTop;
          if (
            scrollBottom >= $this_offsetZero &&
            $this.getAttribute("data-src") &&
            $this.getAttribute("data-src").length > 0
          ) {
            if ($this.nodeName.toLowerCase() === "img") {
              $this.src = $this.getAttribute("data-src");
              $this.style.display = "block";
            } else {
              var imgObj = new Image();
              imgObj.onload = function () {
                $this.innerHTML = "";
              };
              imgObj.src = $this.getAttribute("data-src");
              $this.style.backgroundImage =
                "url(" + $this.getAttribute("data-src") + ")";
            }
            $this.removeAttribute("data-src"); //为了优化，移除
          }
        })(i);
      }
    }
  }

  //文章正文图片预览
  function initPostImagePreview() {
    var $postContent = document.querySelector(".post-content");
    if (!$postContent) return;

    var imageList = [];
    var $images = $postContent.querySelectorAll("img");
    if (!$images || $images.length === 0) return;

    for (var i = 0; i < $images.length; i++) {
      imageList.push($images[i]);
      $images[i].setAttribute("data-preview-index", i);
    }

    var activeIndex = -1;
    var $overlay = document.createElement("div");
    $overlay.className = "img-preview-overlay";
    $overlay.innerHTML =
      '<button class="img-preview-close" type="button" aria-label="关闭">&times;</button>' +
      '<button class="img-preview-nav img-preview-prev" type="button" aria-label="上一张">&#8249;</button>' +
      '<img class="img-preview-image" src="" alt="预览图">' +
      '<button class="img-preview-nav img-preview-next" type="button" aria-label="下一张">&#8250;</button>';
    document.body.appendChild($overlay);

    var $previewImage = $overlay.querySelector(".img-preview-image");
    var $btnClose = $overlay.querySelector(".img-preview-close");
    var $btnPrev = $overlay.querySelector(".img-preview-prev");
    var $btnNext = $overlay.querySelector(".img-preview-next");

    function normalizeIndex(index) {
      var total = imageList.length;
      return (index + total) % total;
    }

    function updatePreview(index) {
      activeIndex = normalizeIndex(index);
      var $target = imageList[activeIndex];
      var src = $target.getAttribute("src");
      if (!src && $target.getAttribute("data-src")) {
        src = $target.getAttribute("data-src");
      }
      $previewImage.setAttribute("src", src || "");
      $previewImage.setAttribute("alt", $target.getAttribute("alt") || "预览图");
    }

    function openPreview(index) {
      updatePreview(index);
      $overlay.classList.add("active");
      document.body.classList.add("img-preview-open");
    }

    function closePreview() {
      $overlay.classList.remove("active");
      document.body.classList.remove("img-preview-open");
      activeIndex = -1;
      $previewImage.setAttribute("src", "");
    }

    $postContent.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || target.tagName !== "IMG") return;
      var index = parseInt(target.getAttribute("data-preview-index"), 10);
      if (isNaN(index)) return;
      event.preventDefault();
      openPreview(index);
    });

    $btnClose.onclick = closePreview;
    $btnPrev.onclick = function (event) {
      event.stopPropagation();
      updatePreview(activeIndex - 1);
    };
    $btnNext.onclick = function (event) {
      event.stopPropagation();
      updatePreview(activeIndex + 1);
    };

    $overlay.onclick = function (event) {
      if (event.target === $overlay) {
        closePreview();
      }
    };

    document.addEventListener("keydown", function (event) {
      if (!$overlay.classList.contains("active")) return;
      if (event.key === "Escape") {
        closePreview();
        return;
      }
      if (event.key === "ArrowLeft") {
        updatePreview(activeIndex - 1);
        return;
      }
      if (event.key === "ArrowRight") {
        updatePreview(activeIndex + 1);
      }
    });
  }

  //获取滚动高度
  function getScrollTop() {
    return $body.scrollTop || document.documentElement.scrollTop;
  }
  //滚动回调
  var scrollCallback = function () {
    if ($process) {
      $process.style.width =
        (getScrollTop() / ($body.scrollHeight - window.innerHeight)) * 100 +
        "%";
    }
    isPC && getScrollTop() >= 300
      ? $backToTop.removeAttribute("class", "hide")
      : $backToTop.setAttribute("class", "hide");
    imgsAjax($ajaxImgs);
  };
  scrollCallback();
  initPostImagePreview();

  //监听滚动事件
  window.addEventListener("scroll", function () {
    if ($toc) {
      var top = $toc.offsetTop;
      var left = $toc.offsetLeft;
      var width = $toc.offsetWidth;
      if (getScrollTop() <= top) {
        $toc.style = "";
      } else {
        $toc.style.position = "fixed";
        $toc.style.top = "5px";
        $toc.style.left = left + "px";
        $toc.style.width = width + "px";
      }
    }
    clearTimeout(timer);
    timer = setTimeout(function fn() {
      scrollCallback();
    }, 200);
  });

  //返回顶部（点击立即到顶部）
  $backToTop.onclick = function () {
    // 立即跳转到顶部，并尽量清理已有的定时器或 requestAnimationFrame
    clearTimeout(timer);
    try {
      cancelAnimationFrame(timer);
    } catch (e) {
      // 某些环境 timer 可能不是 rAF id，忽略错误
    }
    $body.scrollTop = document.documentElement.scrollTop = 0;
  };
};
