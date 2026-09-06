const C = window.HB_CONFIG || {};
const app = document.getElementById("app");


const state = {
  route: "home",
  step: 0,
  selectedTier: null,
  customer: { name: "", email: "" },
  answers: { idea: "", why: "", hungry: "", want: "" },
  review: { name: "", rating: 5, text: "", privateName: false },
  contact: { name: "", email: "", message: "" }
};

function go(route) {
  state.route = route;
  if (route === "recipe") {
    state.route = "customer";
    state.step = 0;
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function emailReady() {
  return C.EMAILJS_PUBLIC_KEY &&!C.EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
      && C.EMAILJS_SERVICE_ID &&!C.EMAILJS_SERVICE_ID.startsWith("YOUR_");
}

function initEmailJS() {
  if (window.emailjs && C.EMAILJS_PUBLIC_KEY &&!C.EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
    emailjs.init({ publicKey: C.EMAILJS_PUBLIC_KEY });
  }
}
initEmailJS();

function escapeHtml(value) {
  return String(value?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}
function footer() {
  return `
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2026 Half Baked Ideas Lab</p>
        <div class="footer-links">
          <a href="#" data-route="privacy">Privacy Policy</a>
          <span>·</span>
          <a href="#" data-route="terms">Terms of Service</a>
          <a href="#" data-route="contact">Contact</a>
        </div>
      </div>
    </footer>
  `;
}
function layout(content) {
  return `
    <div class="app">
      
      <main>
        ${content}
      </main>
      ${footer()}
    </div>
  `;
}

function home() {
  return layout(`
    <section class="hero">
      <img class="hero-logo" src="assets/logo.png" alt="Half Baked Ideas Lab">
      <div class="kicker">Welcome to the Lab</div>
      <h1>Got an <span class="script">idea?</span></h1>
      <p>
  We help name it and make it real. Business names, product names, logos, mascots, stickers, merch, and characters for your socials.<br>
  If you can describe it badly, we can make it look good.<br>
  <strong>Even if it's a terrible idea. We actually like those.</strong>
</p>
      <div class="action-stack">
        <button class="btn" data-route="how">🧪 HOW IT WORKS</button>
        <button class="btn primary" data-route="reviews">🧠 CUSTOMER REVIEWS</button>
        <button class="btn" data-route="support">💗 SUPPORT THE LAB</button>
        <button class="btn" data-route="contact">💬 CONTACT / TEXT US</button>
      </div>
    </section>
  `);
}
function privacy() {
  return layout(`
    <div class="step-shell">
      <div class="section-title">
        <h2>Privacy Policy</h2>
      </div>
      <article class="recipe-card">
        <h3>What we collect</h3>
        <p>Name and email when you submit your idea. Payment handled by Cash App/PayPal — we never see card details.</p>
        
        <h3>How we use it</h3>
        <p>To deliver your recipe and contact you about your submission. We don’t sell your data.</p>
        
        <h3>Delete your data</h3>
        <p>Email hello@halfbakedideaslab.com</p>
        
        <p><em>Last updated: Sept 4, 2026</em></p>
        
        <div class="action-stack" style="margin-top:24px">
          <button class="btn ghost" data-route="home">← Back to Home</button>
        </div>
      </article>
    </div>
  `);
}

function terms() {
  return layout(`
    <div class="step-shell">
      <div class="section-title">
        <h2>Terms of Service</h2>
      </div>
      <article class="recipe-card">
        <p>By using Half Baked Ideas Lab, you agree not to submit illegal ideas. All digital product sales are final.</p>
        <p>We reserve the right to refuse service.</p>
        
        <p><em>Last updated: Sept 4, 2026</em></p>
        
        <div class="action-stack" style="margin-top:24px">
          <button class="btn ghost" data-route="home">← Back to Home</button>
        </div>
      </article>
    </div>
  `);
}

function how() {
  return layout(`
    <div class="step-shell">
      <div class="section-title">
        <h2>How the Lab Works</h2>
        <p>Pick an experiment. We’ll make it real.</p>
      </div>
      
      <div class="grid">
        <article class="card">
          <div style="font-size:2.4rem">🎲</div>
          <h3>MULTI-ROLL</h3>
          <p><strong>Stickers, Logos, Tees</strong><br>
          We make 2-3 options. You pick your fave. 1 tiny tweak included. 48hrs.</p>
        </article>
        
        <article class="card">
          <div style="font-size:2.4rem">🎯</div>
          <h3>ONE-SHOT</h3>
          <p><strong>Mascot Birth</strong><br>
          We aim once. 1 finished character. No redos. 72hrs. New birth = $35.</p>
        </article>
      </div>

      <article class="recipe-card" style="margin-top:24px">
        <h3>🧪 LAB RULES</h3>
        <p><strong>What we DO:</strong> Name things. Make visuals. Stickers, logos, tees, mascots.</p>
        <p><strong>What we DON'T do:</strong> Build apps, websites, or business plans. We're not your co-founder.</p>
        <p><strong>No calls. No Zooms.</strong> Text/email only.</p>
        <p><strong>Turnaround starts</strong> after you fill the form, not when you pay.</p>
      </article>

      <div class="action-stack" style="margin-top:32px">
        <button class="btn primary" data-route="experiments">🧪 ENTER THE LAB</button>
        <button class="btn ghost" data-route="home">← Back to Home</button>
      </div>
    </div>
  `);
}


function reviews() {
  return layout(`
    <div class="section-title"><h2>What Are People Saying?</h2><p>Real experiences can be added here as your Lab grows.</p></div>
    <div class="card review"><div class="stars">★★★★★</div><p>“I came in with an idea that made absolutely no sense. They helped me find the actual business hiding inside it.”</p><div class="by">— Sample Review</div></div>
    <div class="card review"><div class="stars">★★★★★</div><p>“They took my half-baked thought and turned it into a full-blown plan I could actually use.”</p><div class="by">— Sample Review</div></div>
    <div class="action-stack"><button class="btn primary" data-route="leave-review">⭐ LEAVE A REVIEW</button></div>
  `);
}

function leaveReview() {
  return layout(`
    <div class="step-shell">
      <div class="section-title"><h2>Tell Us How We Did</h2><p>Your feedback helps the Lab grow.</p></div>
      <article class="recipe-card">
        <div class="form-group"><label class="form-label">Your name</label><input id="reviewName" type="text" value="${escapeHtml(state.review.name)}"></div>
        <div class="form-group">
          <label class="form-label">How would you rate your experience?</label>
          <div class="nav-row" style="flex-wrap:wrap">
            ${[1,2,3,4,5].map(n => `<button type="button" class="btn ${state.review.rating===n?"primary":""}" data-rating="${n}" style="flex:0 0 auto">${"★".repeat(n)}</button>`).join("")}
          </div>
        </div>
        <div class="form-group"><label class="form-label">Tell us about your experience</label><textarea id="reviewText" maxlength="3000" placeholder="What did you think?">${escapeHtml(state.review.text)}</textarea></div>
        <label style="display:flex;gap:9px;align-items:center;color:var(--muted);margin:10px 0 18px"><input id="privateName" type="checkbox" ${state.review.privateName?"checked":""}> Keep my name private</label>
        <button class="btn primary" id="sendReview">SEND MY REVIEW</button>
        <div id="reviewStatus"></div>
      </article>
    </div>
          <div class="action-stack" style="margin-top:32px">
        <button class="btn ghost" data-route="home">← Back to Home</button>
      </div>
          
  `);
}

function support() {
  const cash = C.CASH_APP_URL;
  const paypal = C.PAYPAL_URL;
  return layout(`
    <div class="section-title"><h2>Got Some Extra Dough?</h2><p>Half Baked Ideas Lab exists because we believe ideas are worth exploring. If you want to help support the Lab, you can leave a tip or donation.</p></div>
    <div class="grid">
      <article class="card pink">
        <h3>💵 CASH APP</h3>
        <p>Support the Lab through Cash App.</p>
        <div class="action-stack"><button class="btn primary" ${cash? `onclick="window.open('${escapeHtml(cash)}','_blank','noopener')"` : "disabled"}>DONATE WITH CASH APP</button></div>
      </article>
      <article class="card">
        <h3>💙 PAYPAL</h3>
        <p>Support the Lab through PayPal.</p>
        <div class="action-stack"><button class="btn" ${paypal? `onclick="window.open('${escapeHtml(paypal)}','_blank','noopener')"` : "disabled"}>DONATE WITH PAYPAL</button></div>
      </article>
    </div>
    <div class="notice" style="margin-top:16px;text-align:center">No pressure. Your ideas are welcome whether you donate a penny or not.</div>
    <div class="action-stack" style="margin-top:32px">
  <button class="btn ghost" data-route="home">← Back to Home</button>
</div>
  `);
}

function contact() {
  return layout(`
    <div class="step-shell">
      <div class="section-title"><h2>Text Us!</h2><p>Have a question? Need help? We'd love to hear from you.</p></div>
      <div class="grid">
        <article class="card pink" style="text-align:center"><h3>💬 Text Only — No Calls</h3><p style="font-size:1.35rem;color:var(--cyan)">(575) 707-2480</p><div class="action-stack"><a class="btn primary" href="sms:+15757072480">TEXT US</a></div></article>
        <article class="card" style="text-align:center"><h3>✉️ Email Us</h3><p style="font-size:1.05rem;color:var(--cyan)">Halfbakedideaslab@gmail.com</p><div class="action-stack"><a class="btn" href="mailto:Halfbakedideaslab@gmail.com">EMAIL US</a></div></article>
      </div>
      <div class="section-title" style="margin-top:34px"><h2>Or Send a Message</h2></div>
        <div class="form-group"><label class="form-label">Name</label><input id="contactName" type="text" value="${escapeHtml(state.contact.name)}"></div>
        <div class="form-group"><label class="form-label">Email</label><input id="contactEmail" type="email" value="${escapeHtml(state.contact.email)}"></div>
        <div class="form-group"><label class="form-label">Message</label><textarea id="contactMessage" maxlength="3000" placeholder="How can we help?">${escapeHtml(state.contact.message)}</textarea></div>
        <button class="btn primary" id="sendContact">SEND MESSAGE</button>
        <div id="contactStatus"></div>
      </article>
    </div>
  `);
}

function render() {
  const routes = {
    home, how, reviews, support, contact, "leave-review": leaveReview,
    "experiments": experiments,
    "privacy": privacy,
    "terms": terms
  };
  app.innerHTML = (routes[state.route] || home)();
  document.querySelectorAll("[data-route]").forEach(el => el.addEventListener("click", 
    (e) => { e.preventDefault(); go(el.dataset.route); }
  ));
  bindCurrent();
}

function bindCurrent() {
  if (state.route === "recipe") {
    document.getElementById("recipeAnswer")?.addEventListener("input", e => {
      state.answers[recipe[state.step].key] = e.target.value;
    });
    document.getElementById("backStep")?.addEventListener("click", () => {
      if (state.step > 0) { state.step--; render(); }
    });
    document.getElementById("nextStep")?.addEventListener("click", () => {
      state.answers[recipe[state.step].key] = document.getElementById("recipeAnswer").value.trim();
      if (state.step < recipe.length - 1) { state.step++; render(); }
      else { state.route = "review-recipe"; render(); }
    });
  }
  if (state.route === "customer") {
    document.getElementById("customerName")?.addEventListener("input", e => state.customer.name = e.target.value);
    document.getElementById("customerEmail")?.addEventListener("input", e => state.customer.email = e.target.value);
    document.getElementById("backCustomer")?.addEventListener("click", () => go("home"));
    document.getElementById("toRecipe")?.addEventListener("click", () => {
      const name = document.getElementById("customerName").value.trim();
      const email = document.getElementById("customerEmail").value.trim();
      if (!name ||!email) return alert("Please enter your name and email so we know where to send your finished ideas.");
      state.customer = { name, email };
      state.step = 0; state.route = "recipe"; render();
    });
  } 
  
  if (state.route === "leave-review") {
    document.querySelectorAll("[data-rating]").forEach(b => b.addEventListener("click", () => { state.review.rating = Number(b.dataset.rating); render(); }));
    document.getElementById("sendReview")?.addEventListener("click", sendReview);
  }
  if (state.route === "contact") {
    document.getElementById("sendContact")?.addEventListener("click", sendContact);
  }
}

async function sendViaEmailJS(templateId, params) {
  if (!emailReady() ||!templateId || templateId.startsWith("YOUR_")) {
    throw new Error("EmailJS is not connected yet. Add your EmailJS public key, service ID, and template ID in config.js.");
  }
  return emailjs.send(C.EMAILJS_SERVICE_ID, templateId, params);
}

async function sendRecipe() {
  const status = document.getElementById("sendStatus");
  status.innerHTML = `<p class="hint">🧪 Sending your recipe to the Lab...</p>`;
  const params = {
    form_type: "IDEAS RECIPE",
    customer_name: state.customer.name,
    customer_email: state.customer.email,
    tier: state.selectedTier || "none",
    tier_name: state.selectedTier === "egg"? "Free - Idea Roast" : state.selectedTier === "half-baked"? "$49 - Reality Check Sprint" : state.selectedTier === "fully-baked"? "$299 - Fully Baked" : "No tier",
    idea: state.answers.idea,
    why: state.answers.why,
    hungry: state.answers.hungry,
    what_you_want: state.answers.want,
    submitted_at: new Date().toLocaleString()
  };
  try {
    await sendViaEmailJS(C.EMAILJS_TEMPLATE_ID, params);
    go("success");
  } catch (err) {
    status.innerHTML = `<div class="notice">We couldn't send the recipe yet. Please check your connection or text us at <strong>(575) 707-2480</strong>. The app is ready; EmailJS just needs to be connected.</div>`;
    console.error(err);
  }
}

async function sendReview() {
  state.review.name = document.getElementById("reviewName").value.trim();
  state.review.text = document.getElementById("reviewText").value.trim();
  state.review.privateName = document.getElementById("privateName").checked;
  const status = document.getElementById("reviewStatus");
  if (!state.review.text) { status.innerHTML = `<p class="hint">Please tell us a little about your experience.</p>`; return; }
  status.innerHTML = `<p class="hint">⭐ Sending your review...</p>`;
  try {
    await sendViaEmailJS(C.EMAILJS_REVIEW_TEMPLATE_ID, {
      form_type: "CUSTOMER REVIEW",
      customer_name: state.review.privateName? "Private" : state.review.name,
      rating: state.review.rating,
      review: state.review.text,
      submitted_at: new Date().toLocaleString()
    });
    status.innerHTML = `<div class="notice">THANK YOU! ⭐ Your review has been sent to the Lab for review before publication.</div>`;
  } catch (err) {
    status.innerHTML = `<div class="notice">We couldn't send the review yet. Please text us at <strong>(575) 707-2480</strong>.</div>`;
    console.error(err);
  }
}

async function sendContact() {
  state.contact.name = document.getElementById("contactName").value.trim();
  state.contact.email = document.getElementById("contactEmail").value.trim();
  state.contact.message = document.getElementById("contactMessage").value.trim();
  const status = document.getElementById("contactStatus");
  if (!state.contact.name ||!state.contact.email ||!state.contact.message) {
    status.innerHTML = `<p class="hint">Please enter your name, email, and message.</p>`;
    return;
  }
  status.innerHTML = `<p class="hint">Sending...</p>`;
  try {
    await sendViaEmailJS(C.EMAILJS_TEMPLATE_ID, {
      form_type: "CONTACT MESSAGE",
      customer_name: state.contact.name,
      customer_email: state.contact.email,
      message: state.contact.message,
      submitted_at: new Date().toLocaleString()
    });
    status.innerHTML = `<div class="notice">Sent! We'll get back to you
 ASAP.</div>`;
    state.contact = { name: "", email: "", message: "" };
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
  } catch (err) {
    status.innerHTML = `<div class="notice">We couldn't send the message yet. Please text us at <strong>(575) 707-2480</strong>.</div>`;
    console.error(err);
  }
}

// Chat Widget Logic
const chatBubble = document.getElementById("chatBubble");
const chatModal = document.getElementById("chatModal");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");

if (chatBubble && chatModal) {
  chatBubble.addEventListener("click", function() {
    chatModal.classList.toggle("open");
  });
  closeChat?.addEventListener("click", function() {
    chatModal.classList.remove("open");
  });
  sendChat?.addEventListener("click", async function() {
    const name = document.getElementById("chatName").value.trim();
    const contact = document.getElementById("chatContact").value.trim();
    const message = document.getElementById("chatMessage").value.trim();
    const status = document.getElementById("chatStatus");
    if (!name ||!contact ||!message) {
      status.innerHTML = `<p class="hint">Please fill out all fields.</p>`;
      return;
    }
    status.innerHTML = `<p class="hint">Sending...</p>`;
    try {
      await sendViaEmailJS(C.EMAILJS_TEMPLATE_ID, {
        form_type: "LIVE CHAT QUESTION",
        customer_name: name,
        customer_contact: contact,
        message: message,
        page: state.route,
        submitted_at: new Date().toLocaleString()
      });
      status.innerHTML = `<div class="notice">Sent! We'll text you back ASAP.</div>`;
      setTimeout(() => {
        chatModal.classList.remove("open");
        document.getElementById("chatName").value = "";
        document.getElementById("chatContact").value = "";
        document.getElementById("chatMessage").value = "";
        status.innerHTML = "";
      }, 2000);
    } catch (err) {
      status.innerHTML = `<div class="notice">Couldn't send. Text us: (575) 707-2480</div>`;
      console.error("Chat error:", err);
    }
  });
}

// 
render();
