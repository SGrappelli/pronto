const CSS = `
.hm-wrap{width:100%}
.hm-label-row{display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-bottom:6px}
.hm-label{font-size:11px;color:#6b7280;text-align:center;letter-spacing:0.01em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',sans-serif}
.hm-frames{display:grid;grid-template-columns:1.4fr 1fr;gap:16px;align-items:stretch}
.hm-frame{background:#fff;border:0.5px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',sans-serif}
.hm-chrome{background:#f3f4f6;padding:8px 12px;display:flex;align-items:center;gap:5px;border-bottom:0.5px solid #e5e7eb;flex-shrink:0}
.hm-d{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.hm-url{font-size:10px;color:#9ca3af;margin-left:8px}
.hm-cal-head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:0.5px solid #e5e7eb;flex-shrink:0}
.hm-cal-nav-grp{display:flex;align-items:center;gap:8px}
.hm-nav-arr{font-size:14px;color:#6b7280;cursor:pointer;user-select:none}
.hm-cal-range{font-size:13px;font-weight:500;color:#111827}
.hm-btn-new{background:#16a34a;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;white-space:nowrap}
.hm-cal-body{flex:1;display:flex;flex-direction:column}
.hm-days-row{display:grid;grid-template-columns:44px repeat(4,1fr);border-bottom:0.5px solid #e5e7eb}
.hm-day-hdr{text-align:center;padding:8px 4px;border-right:0.5px solid #e5e7eb}
.hm-day-hdr:last-child{border-right:none}
.hm-wd{font-size:10px;color:#6b7280}
.hm-dn{font-size:15px;font-weight:500;color:#111827;margin-top:1px}
.hm-today .hm-dn{background:#16a34a;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;margin:2px auto 0}
.hm-time-rows{flex:1;display:flex;flex-direction:column}
.hm-trow{display:grid;grid-template-columns:44px repeat(4,1fr);flex:1;border-bottom:0.5px solid #e5e7eb;min-height:76px}
.hm-trow:last-child{border-bottom:none}
.hm-tcell-time{font-size:10px;color:#9ca3af;padding:8px 6px 0;text-align:right}
.hm-tcell{border-right:0.5px solid #e5e7eb;padding:4px}
.hm-tcell:last-child{border-right:none}
.hm-appt{border-radius:5px;padding:6px 8px;font-size:11px;line-height:1.4;height:100%;box-sizing:border-box}
.hm-an{font-weight:600;font-size:12px}
.hm-as{font-size:10px;margin-top:1px}
.hm-badge{display:inline-block;font-size:9px;border-radius:3px;padding:2px 6px;margin-top:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.02em}
.hm-m-ananda{background:#fef9c3;color:#713f12}
.hm-m-vadim{background:#ccfbf1;color:#134e4a}
.hm-m-lasha{background:#fce7f3;color:#9d174d}
.hm-m-unassigned{background:#f3f4f6;color:#374151}
.hm-st-confirmed{border-left:3px solid #16a34a}
.hm-st-completed{border-left:3px solid #3b82f6}
.hm-st-paid{border-left:3px solid #eab308}
.hm-st-pending{border-left:3px solid #9ca3af}
.hm-b-confirmed{background:#dcfce7;color:#166534}
.hm-b-completed{background:#dbeafe;color:#1e40af}
.hm-b-paid{background:#fef08a;color:#713f12}
.hm-b-pending{background:#e5e7eb;color:#374151}
.hm-bkg-body{flex:1;padding:14px;display:flex;flex-direction:column}
.hm-biz-row{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:0.5px solid #e5e7eb}
.hm-biz-av{width:34px;height:34px;border-radius:50%;background:#16a34a;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff;flex-shrink:0}
.hm-biz-nm{font-size:13px;font-weight:500;color:#111827}
.hm-svc-ttl{font-size:11px;color:#6b7280;margin-bottom:8px}
.hm-svc-list{display:flex;flex-direction:column;gap:7px;flex:1}
.hm-svc-row{display:flex;justify-content:space-between;align-items:center;padding:9px 11px;border:0.5px solid #e5e7eb;border-radius:8px}
.hm-svc-nm{font-size:12px;font-weight:500;color:#111827}
.hm-svc-dur{font-size:10px;color:#6b7280;margin-top:1px}
.hm-svc-pr{font-size:13px;font-weight:600;color:#16a34a}
.hm-svc-arr{font-size:12px;color:#9ca3af;margin-left:6px}
.hm-no-reg{text-align:center;font-size:10px;color:#9ca3af;margin-top:10px;padding-top:10px;border-top:0.5px solid #e5e7eb}
.hm-no-reg strong{color:#16a34a}
@media(max-width:768px){
  .hm-label-row{grid-template-columns:1fr;gap:4px}
  .hm-label-row .hm-label:last-child{display:none}
  .hm-frames{grid-template-columns:1fr}
  .hm-frames .hm-frame:last-child{display:none}
  .hm-trow{min-height:64px}
}
`

export function HeroMockup() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hm-wrap">
        <div className="hm-label-row">
          <div className="hm-label">Booking calendar — drag &amp; drop</div>
          <div className="hm-label">Client booking page</div>
        </div>
        <div className="hm-frames">

          {/* CALENDAR */}
          <div className="hm-frame">
            <div className="hm-chrome">
              <div className="hm-d" style={{background:'#ff5f57'}}></div>
              <div className="hm-d" style={{background:'#ffbd2e'}}></div>
              <div className="hm-d" style={{background:'#28c840'}}></div>
              <span className="hm-url">salon.trypronto.app/dashboard/booking</span>
            </div>
            <div className="hm-cal-head">
              <div className="hm-cal-nav-grp">
                <span className="hm-nav-arr">‹</span>
                <span className="hm-cal-range">Jun 2 – Jun 5, 2026</span>
                <span className="hm-nav-arr">›</span>
              </div>
              <button className="hm-btn-new">+ New booking</button>
            </div>
            <div className="hm-cal-body">
              <div className="hm-days-row">
                <div className="hm-day-hdr"></div>
                <div className="hm-day-hdr"><div className="hm-wd">Mon</div><div className="hm-dn">2</div></div>
                <div className="hm-day-hdr hm-today"><div className="hm-wd">Tue</div><div className="hm-dn">3</div></div>
                <div className="hm-day-hdr"><div className="hm-wd">Wed</div><div className="hm-dn">4</div></div>
                <div className="hm-day-hdr"><div className="hm-wd">Thu</div><div className="hm-dn">5</div></div>
              </div>
              <div className="hm-time-rows">
                {/* 9:00 */}
                <div className="hm-trow">
                  <div className="hm-tcell-time">9:00</div>
                  <div className="hm-tcell"></div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-ananda hm-st-confirmed">
                      <div className="hm-an">Sofia M.</div>
                      <div className="hm-as">Haircut · Ananda</div>
                      <span className="hm-badge hm-b-confirmed">Confirmed</span>
                    </div>
                  </div>
                  <div className="hm-tcell"></div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-lasha hm-st-pending">
                      <div className="hm-an">Maria L.</div>
                      <div className="hm-as">Hair Color · Lasha</div>
                      <span className="hm-badge hm-b-pending">Pending</span>
                    </div>
                  </div>
                </div>
                {/* 10:00 */}
                <div className="hm-trow">
                  <div className="hm-tcell-time">10:00</div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-vadim hm-st-paid">
                      <div className="hm-an">Anna P.</div>
                      <div className="hm-as">Blow Dry · Vadim</div>
                      <span className="hm-badge hm-b-paid">Paid</span>
                    </div>
                  </div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-lasha hm-st-confirmed">
                      <div className="hm-an">Carlos R.</div>
                      <div className="hm-as">Classic Cut · Lasha</div>
                      <span className="hm-badge hm-b-confirmed">Confirmed</span>
                    </div>
                  </div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-ananda hm-st-confirmed">
                      <div className="hm-an">Elena V.</div>
                      <div className="hm-as">Manicure · Ananda</div>
                      <span className="hm-badge hm-b-confirmed">Confirmed</span>
                    </div>
                  </div>
                  <div className="hm-tcell"></div>
                </div>
                {/* 11:00 */}
                <div className="hm-trow">
                  <div className="hm-tcell-time">11:00</div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-ananda hm-st-completed">
                      <div className="hm-an">James K.</div>
                      <div className="hm-as">Beard Trim · Ananda</div>
                      <span className="hm-badge hm-b-completed">Completed</span>
                    </div>
                  </div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-vadim hm-st-paid">
                      <div className="hm-an">Tom W.</div>
                      <div className="hm-as">Haircut · Vadim</div>
                      <span className="hm-badge hm-b-paid">Paid</span>
                    </div>
                  </div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-lasha hm-st-confirmed">
                      <div className="hm-an">Lisa B.</div>
                      <div className="hm-as">Manicure · Lasha</div>
                      <span className="hm-badge hm-b-confirmed">Confirmed</span>
                    </div>
                  </div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-vadim hm-st-completed">
                      <div className="hm-an">Mark Z.</div>
                      <div className="hm-as">Beard · Vadim</div>
                      <span className="hm-badge hm-b-completed">Completed</span>
                    </div>
                  </div>
                </div>
                {/* 12:00 */}
                <div className="hm-trow">
                  <div className="hm-tcell-time">12:00</div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-vadim hm-st-completed">
                      <div className="hm-an">David S.</div>
                      <div className="hm-as">Haircut · Vadim</div>
                      <span className="hm-badge hm-b-completed">Completed</span>
                    </div>
                  </div>
                  <div className="hm-tcell"></div>
                  <div className="hm-tcell">
                    <div className="hm-appt hm-m-ananda hm-st-paid">
                      <div className="hm-an">Nina T.</div>
                      <div className="hm-as">Color · Ananda</div>
                      <span className="hm-badge hm-b-paid">Paid</span>
                    </div>
                  </div>
                  <div className="hm-tcell"></div>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKING PAGE */}
          <div className="hm-frame">
            <div className="hm-chrome">
              <div className="hm-d" style={{background:'#ff5f57'}}></div>
              <div className="hm-d" style={{background:'#ffbd2e'}}></div>
              <div className="hm-d" style={{background:'#28c840'}}></div>
              <span className="hm-url">salon.trypronto.app/book</span>
            </div>
            <div className="hm-bkg-body">
              <div className="hm-biz-row">
                <div className="hm-biz-av">S</div>
                <span className="hm-biz-nm">The Style Studio</span>
              </div>
              <div className="hm-svc-ttl">Select a service</div>
              <div className="hm-svc-list">
                <div className="hm-svc-row">
                  <div><div className="hm-svc-nm">Classic Haircut</div><div className="hm-svc-dur">30 min</div></div>
                  <div style={{display:'flex',alignItems:'center'}}><span className="hm-svc-pr">$35</span><span className="hm-svc-arr">›</span></div>
                </div>
                <div className="hm-svc-row">
                  <div><div className="hm-svc-nm">Beard Trim</div><div className="hm-svc-dur">20 min</div></div>
                  <div style={{display:'flex',alignItems:'center'}}><span className="hm-svc-pr">$25</span><span className="hm-svc-arr">›</span></div>
                </div>
                <div className="hm-svc-row">
                  <div><div className="hm-svc-nm">Hair Color</div><div className="hm-svc-dur">90 min</div></div>
                  <div style={{display:'flex',alignItems:'center'}}><span className="hm-svc-pr">$85</span><span className="hm-svc-arr">›</span></div>
                </div>
                <div className="hm-svc-row">
                  <div><div className="hm-svc-nm">Blow Dry</div><div className="hm-svc-dur">30 min</div></div>
                  <div style={{display:'flex',alignItems:'center'}}><span className="hm-svc-pr">$30</span><span className="hm-svc-arr">›</span></div>
                </div>
                <div className="hm-svc-row">
                  <div><div className="hm-svc-nm">Haircut + Beard</div><div className="hm-svc-dur">50 min</div></div>
                  <div style={{display:'flex',alignItems:'center'}}><span className="hm-svc-pr">$55</span><span className="hm-svc-arr">›</span></div>
                </div>
              </div>
              <div className="hm-no-reg">✓ <strong>No registration required</strong> — name &amp; phone only</div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
