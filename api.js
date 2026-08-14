// ============================================================
// ตัวเรียก Apps Script JSON API — ใช้ร่วมกันทุกหน้า
//
// สำคัญ: ห้ามตั้ง header 'Content-Type: application/json' เอง เพราะจะทำให้
// เบราว์เซอร์ส่ง preflight (OPTIONS) ก่อน ซึ่ง Apps Script Web App ไม่รองรับ
// การไม่ตั้ง header ใดๆ เลยตอน POST string body ทำให้เบราว์เซอร์ใช้
// Content-Type: text/plain;charset=UTF-8 โดยอัตโนมัติ ซึ่งนับเป็น "simple request"
// ไม่ต้อง preflight — ฝั่ง Code.gs อ่าน e.postData.contents แล้ว JSON.parse เอง
// ============================================================

function apiCall(action, params, method) {
  params = params || {};
  method = method || 'POST';
  const url = window.APPS_SCRIPT_API_URL;

  if (!url || url.indexOf('YOUR_DEPLOYMENT_ID') !== -1) {
    return Promise.resolve({ ok: false, message: 'ยังไม่ได้ตั้งค่า APPS_SCRIPT_API_URL ในไฟล์ config.js กรุณา deploy backend แล้วนำ URL มาใส่ก่อนใช้งาน' });
  }

  if (method === 'GET') {
    const qs = new URLSearchParams();
    qs.set('action', action);
    Object.keys(params).forEach(function (k) {
      if (params[k] !== undefined && params[k] !== null) qs.set(k, params[k]);
    });
    return fetch(url + '?' + qs.toString(), { method: 'GET' })
      .then(function (r) { return r.json(); })
      .catch(function (err) { return { ok: false, message: 'เชื่อมต่อ API ไม่สำเร็จ: ' + err.message }; });
  }

  const payload = Object.assign({ action: action }, params);
  return fetch(url, { method: 'POST', body: JSON.stringify(payload) })
    .then(function (r) { return r.json(); })
    .catch(function (err) { return { ok: false, message: 'เชื่อมต่อ API ไม่สำเร็จ: ' + err.message }; });
}
