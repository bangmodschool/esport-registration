(function () {
  var ua = navigator.userAgent || '';
  var isInApp = /Line\//i.test(ua) || /FBAN|FBAV/i.test(ua) || /Instagram/i.test(ua) ||
                /MicroMessenger/i.test(ua) || /Twitter/i.test(ua) ||
                (/; wv\)/i.test(ua)) || (/Android.*Version\/[\d.]+.*Chrome\/[.\d]* Mobile/i.test(ua) && /; wv/i.test(ua));
  if (!isInApp) return;

  document.addEventListener('DOMContentLoaded', function () {
    const bar = document.createElement('div');
    bar.id = 'iabBanner';
    bar.style.cssText = 'position:sticky;top:0;z-index:999;background:linear-gradient(90deg,#ff3d81,#ff8a3d);color:#1a0510;padding:10px 14px;font-family:\'Rajdhani\',sans-serif;font-weight:700;font-size:13.5px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;';
    bar.innerHTML =
      '<span style="flex:1;min-width:220px;">⚠ ตรวจพบว่าเปิดผ่านแอปแชท/โซเชียล (เช่น LINE, Facebook, Instagram) ซึ่งมักทำให้เข้าใช้งานไม่ได้หากมีหลายบัญชี Google ในเครื่อง — กรุณาเปิดด้วย Chrome หรือ Safari แทน</span>' +
      '<button id="iabCopyBtn" style="font-family:\'Orbitron\',sans-serif;font-size:11px;font-weight:800;letter-spacing:.05em;padding:8px 12px;border:none;background:#1a0510;color:#fff;cursor:pointer;white-space:nowrap;">คัดลอกลิงก์</button>' +
      '<button id="iabCloseBtn" style="font-family:\'Orbitron\',sans-serif;font-size:11px;font-weight:800;padding:8px 12px;border:1px solid #1a0510;background:transparent;color:#1a0510;cursor:pointer;">ปิด</button>';
    document.body.insertBefore(bar, document.body.firstChild);

    document.getElementById('iabCloseBtn').onclick = function () { bar.style.display = 'none'; };
    document.getElementById('iabCopyBtn').onclick = function () {
      const url = location.href;
      function fallback() {
        const ta = document.createElement('textarea');
        ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); alert('คัดลอกลิงก์แล้ว วางในเบราว์เซอร์ Chrome/Safari ได้เลย'); }
        catch (e) { alert('คัดลอกไม่สำเร็จ กรุณาคัดลอกลิงก์ด้านบนเอง: ' + url); }
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          alert('คัดลอกลิงก์แล้ว วางในเบราว์เซอร์ Chrome/Safari ได้เลย');
        }).catch(fallback);
      } else { fallback(); }
    };
  });
})();
