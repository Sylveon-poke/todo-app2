export function addMonths(date, months) {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months, 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, lastDay));
    return d;
}
/** 指定した日付に週数を加算するヘルパー関数 */
export function addWeeks(date, weeks) {
    // 年/月/日/時/分/秒 を保持して、日付だけを進める
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    const ms = date.getMilliseconds();
    const out = new Date(y, m, d + weeks * 7, hh, mm, ss, ms);
    return out;
}
/** 指定した日付に日数を加算するヘルパー関数 */
export function addDays(date, days) {
    // 年/月/日/時/分/秒 を保持して、日付だけを進める
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    const ms = date.getMilliseconds();
    return new Date(y, m, d + days, hh, mm, ss, ms);
}
//# sourceMappingURL=repeat.js.map