// ① 自動標出「本月」那一列：加底色＋「本月」文字，不只靠顏色
const month = new Date().getMonth() + 1;
const row = document.querySelector(`tr[data-month="${month}"]`);
if (row) {
  row.classList.add("now");
  row.setAttribute("aria-current", "date");
  row.querySelector("th").insertAdjacentHTML("beforeend", ' <span class="badge">本月</span>');
}

// ② 產季篩選：按按鈕只顯示符合狀態的月份
const filters = document.querySelector("#filters");
const buttons = filters.querySelectorAll("button");
const rows = document.querySelectorAll("#season tbody tr");
const result = document.querySelector("#filter-result");
filters.hidden = false; // 有 JS 才顯示按鈕列

buttons.forEach((button) => {
  // 事件：點某個按鈕時執行
  button.addEventListener("click", () => {
    const status = button.dataset.filter; // all／in／edge／out
    const months = [];
    // 資料處理：逐列比對 data-status，不符合就藏起來，符合就記下月份
    rows.forEach((tr) => {
      const match = status === "all" || tr.dataset.status === status;
      tr.hidden = !match;
      if (match) months.push(tr.dataset.month);
    });
    // 更新畫面：標出按下的按鈕，並顯示結果文字（aria-live 會念出）
    buttons.forEach((b) => b.setAttribute("aria-pressed", b === button));
    result.textContent = `${button.textContent}：共 ${months.length} 個月（${months.join("、")} 月）`;
  });
});
