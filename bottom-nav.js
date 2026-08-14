(function () {
  function currentPage() {
    var path = location.pathname.toLowerCase();
    if (path.indexOf('view.html') !== -1) return 'view';
    if (path.indexOf('admin.html') !== -1) return 'admin';
    return 'register';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var page = currentPage();
    var nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.innerHTML =
      '<a href="index.html" data-page="register">' +
        '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="4"></rect><line x1="7" y1="10" x2="7" y2="14"></line><line x1="5" y1="12" x2="9" y2="12"></line><circle cx="15" cy="10.5" r="1"></circle><circle cx="18" cy="13.5" r="1"></circle></svg>' +
        '<span>สมัคร</span>' +
      '</a>' +
      '<a href="view.html" data-page="view">' +
        '<svg viewBox="0 0 24 24"><line x1="6" y1="20" x2="6" y2="14"></line><line x1="12" y1="20" x2="12" y2="8"></line><line x1="18" y1="20" x2="18" y2="11"></line></svg>' +
        '<span>ผลการสมัคร</span>' +
      '</a>';
    document.body.appendChild(nav);
    var active = nav.querySelector('[data-page="' + page + '"]');
    if (active) active.classList.add('active');
  });
})();
