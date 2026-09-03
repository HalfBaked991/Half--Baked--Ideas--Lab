const C = window.HB_CONFIG || {};
const app = document.getElementById("app");

const recipe = [
  { label: "IDEA:", question: "What are we cooking?", icon: "💡", key: "idea" },
  { label: "THE WHY:", question: "Why does this idea matter?", icon: "🧠", key: "why" },
  { label: "WHO'S HUNGRY:", question: "Who might actually want this?", icon: "👥", key: "hungry" },
  { 
    label: "WHAT DO YOU WANT FROM US:", 
    question: "In a few sentences, tell us what you want us to do for you specifically.", 
    icon: "🎯", 
    key: "want" 
  }
];

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
  return C.EMAILJS_PUBLIC_KEY && !C.EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
      && C.EMAILJS_SERVICE_ID && !C.EMAILJS_SERVICE_ID.startsWith("YOUR_");
}

function initEmailJS() {
  if (window.emailjs && C.EMAILJS_PUBLIC_KEY && !C.EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
    emailjs.init({ publicKey: C.EMAILJS_PUBLIC_KEY });
  }
}
initEmailJS();

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

function layout(content) {
  return `<section class="screen">${content}</section>`;
}

function home() {
  return layout(`
    <section class="hero">
      <img class="hero-logo" src="assets/logo.png" alt="Half Baked Ideas Lab">
      <div class="kicker">Welcome to the Lab</div>
      <h1>Got an <span class="script">idea?</span></h1>
      <p>
        We help brainstorm, organize, develop and explore ideas for businesses,
        products, social media, parties, groups, and everything in between.
        <strong>Even if it's a terrible idea.</strong> We actually like those.
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

function how() {
  return layout(`
    <div class="section-title"><h2>How the Lab Works</h2><p>Simple. You bring the ingredients. We see what we can cook.</p></div>
    <div class="grid">
      <article class="card">
        <div style="font-size:2.4rem">💡</div>
        <h3>YOU BRING THE IDEA</h3>
        <p>Tell us what's bouncing around in your head. It can be polished, messy, ridiculous, or barely an idea at all.</p>
      </article>
      <article class="card">
        <div style="font-size:2.4rem">🧪</div>
        <h3>WE COOK</h3>
        <p>Your Ideas Recipe goes into the Lab. We spend dedicated time to develop, organize, brainstorm and exploring what's possible.</p>
      </article>
      <article class="card">
        <div style="font-size:2.4rem">🧠</div>
        <h3>YOU GET YOUR IDEAS</h3>
        <p>We'll send your completed work back to you using the contact information you provide within 7 Days (Depends on Tier chosen).</p>
      </article>
    </div>
    
    <div class="section-title" style="margin-top:34px"><h2>How far can we take it?</h2></div>
    <div class="grid">
      <article class="card pink tier-card" data-tier="egg">
        <h3>🥚 Just an Idea</h3>
        <p>"I have this thought..."</p>
      </article>
      <article class="card pink tier-card" data-tier="half-baked">
        <h3>🥣 Half Baked</h3>
        <p>"I think there's something here."</p>
      </article>
      <article class="card tier-card disabled">
        <h3>🍞 Fully Baked</h3>
        <p>"Let's develop this into a real concept."</p>
      </article>
      <article class="card tier-card disabled">
        <h3>🔥 Napkin to Net Worth</h3>
        <p>"Let's explore the whole thing."</p>
      </article>
    </div>
    <div class="notice" style="margin-top:16px;text-align:center">Pick a tier above to start your recipe.</div>
  `);
}

function tierEgg() {
  return layout(`
    <div class="section-title">
      <h2>🥚 Tier (Free) - Just an Idea</h2>
      <p>This is the IDEA ROAST. No fluff, no follow-ups, just signal.</p>
    </div>
    <article class="card">
      <h3>You get:</h3>
      <div class="tier-spec">
        <p><strong>1. Gut Reaction:</strong><br>
        This is my honest, no-BS first impression of your idea. I’ll tell you if the core problem feels real, who’d actually care, and what similar ideas have tried before — good or bad. You’ll know in 30 seconds if you’re onto something or if there’s a landmine you didn’t see.</p>
        <p><strong>2. 3 ways this could go:</strong><br>
        • <strong>The lazy test:</strong> How to test in 1 day, $0<br>
        • <strong>The scrappy version:</strong> What a v1 could look like if you built it this weekend<br>
        • <strong>The “if you had money” version:</strong> Big picture if this actually worked</p>
        <p><strong>3. Do THIS next:</strong><br>
        This is the exact, single action I’d take today if I were you. Not “research your market” — I mean the one click, post, email, or conversation that moves you from thinking to knowing. It’ll be specific to your idea and take under 15 minutes. Do this before you spend another dollar or hour on it.</p>
        <p><strong>4. Biggest risk to watch:</strong><br>
        This is the #1 reason your idea would fail that most people miss. I’ll call out the legal, demand, or competition landmine you’re most likely to hit. You get 1 sentence that could save you months of wasted work. If you only avoid one mistake, avoid this one.</p>
      </div>
      <div class="notice">
        <strong>Delivery:</strong> 12-24 hours • <strong>Follow-ups:</strong> 1 clarification email max if needed • <strong>Price:</strong> Free • Donations appreciated but never required
      </div>
      <div class="action-stack" style="margin-top:24px">
        <button class="btn primary" data-route="customer" data-selected-tier="egg">🥣 START MY IDEA ROAST</button>
        <button class="btn ghost" data-route="how">← BACK TO TIERS</button>
      </div>
    </article>
  `);
}

function tierHalfBaked() {
  return layout(`
    <div class="section-title">
      <h2>🥣 Tier ($49) - Half Baked: Reality Check Sprint</h2>
      <p><em>"I think there's something here."</em></p>
    </div>
    <article class="card">
      <h3>What you get:</h3>
      <p>We spend 7 days figuring out if real people would actually pay for your idea.</p>
      <h3>Here's how it works:</h3>
      <p><strong>1. We find your first customers</strong><br>
      You get the exact words to post on Reddit, LinkedIn, or wherever your customers hang out. 
      It asks one question: <em>"If this existed, would you pay for it?"</em> You post it.</p>
      <p><strong>2. We build your test page</strong><br>
      We make you a 1-page test site in 24 hours using free tools. It explains your idea and has one button: "Join waitlist" or "Pre-order." Nobody gets charged. We're just counting how many people click.</p>
      <p><strong>3. We run the test together</strong><br>
      You share the post. You share the page. We watch what happens for 5 days. 
      How many people visited? How many clicked? What did they say?</p>
      <p><strong>4. You get the verdict</strong><br>
      We send you a <strong>Demand Results email</strong>. It tells you 3 things:</p>
      <ul>
        <li><strong>Do people actually want this?</strong> Yes or no.</li>
        <li><strong>What did they really ask for?</strong></li>
        <li><strong>Should you kill it, change it, or go all in?</strong> No guessing.</li>
      </ul>
      <h3>What you keep forever:</h3>
      <ol>
        <li>The exact post that got people talking</li>
        <li>The test site + all the clicks/emails you collected</li>
        <li>The Demand Results write-up with customer comments + next steps</li>
      </ol>
      <h3>What this IS NOT:</h3>
      <p>We don't build your app. We don't become your lawyer, accountant, or developer. We don't promise you'll make money. We test if strangers care enough to click "buy."</p>
      <p><strong>Time from you:</strong> About 2 hours total over 7 days. Post once. Share a link. Read the results in your email and make your kill it, change it, or go all in decision!</p>
      <button class="btn primary" data-route="paywall-half-baked" data-selected-tier="half-baked" style="display:block; text-align:center; margin-top:30px;">
        🥣 START MY RECIPE
      </button>
    </article>
  `);
}

function recipeStep() {
  const r = recipe[state.step];
  const pct = ((state.step + 1) / recipe.length) * 100;
  return layout(`
    <div class="step-shell">
      <div class="section-title">
        <h2>Your Half Baked Idea Recipe</h2>
        <p>Don't overthink it. Give us the messy version.</p>
      </div>
      <div class="progress-label"><span>STEP ${String(state.step+1).padStart(2,"0")} / ${recipe.length}</span><span>${Math.round(pct)}%</span></div>
      <div class="progress"><span style="width:${pct}%"></span></div>
      <article class="recipe-card">
        <div class="recipe-icon">${r.icon}</div>
        <div class="recipe-label">${r.label}</div>
        <div class="recipe-question">${r.question}</div>
        <textarea id="recipeAnswer" maxlength="5000" placeholder="Type your answer here...">${escapeHtml(state.answers[r.key])}</textarea>
        <div class="hint">No perfect answers. No grammar test. No bad ideas.</div>
        <div class="nav-row">
          ${state.step > 0 ? `<button class="btn ghost" id="backStep">← BACK</button>` : `<button class="btn ghost" data-route="home">← CANCEL</button>`}
          <button class="btn" id="nextStep">${state.step === recipe.length-1 ? "RECIPE COMPLETE ✓" : "NEXT INGREDIENT →"}</button>
        </div>
      </article>
    </div>
  `);
}

function customerInfo() {
  let tierLabel = "No tier selected";
  if (state.selectedTier === "egg") tierLabel = "🥚 Free Tier - Idea Roast";
  if (state.selectedTier === "half-baked") tierLabel = "🥣 $49 Tier - Reality Check Sprint";

  return layout(`
    <div class="step-shell">
      <div class="section-title"><h2>Who's Cooking?</h2><p>Give us a way to get your finished ideas back to you.</p></div>
      <div class="notice" style="margin-bottom:16px">
        <strong>Selected:</strong> ${tierLabel}
      </div>
      <article class="recipe-card">
        <div class="form-group"><label class="form-label" for="customerName">Your name</label><input id="customerName" type="text" value="${escapeHtml(state.customer.name)}" autocomplete="name" required></div>
        <div class="form-group"><label class="form-label" for="customerEmail">Best email address</label><input id="customerEmail" type="email" value="${escapeHtml(state.customer.email)}" autocomplete="email" required></div>
        <div class="notice">We use your email to send your completed work and important submission information.</div>
        <div class="nav-row"><button class="btn ghost" id="backCustomer">← BACK</button><button class="btn" id="toRecipe">NEXT: MY IDEA →</button></div>
      </article>
    </div>
  `);
}

function reviewRecipe() {
  return layout(`
    <div class="step-shell">
      <div class="section-title"><h2>Let's Review Your Recipe</h2><p>Take a look at what you've cooked up. You can go back and edit anything before sending it to the Lab.</p></div>
      <article class="recipe-card">
        <div class="summary-list">
          ${recipe.map(r => `<div class="summary-item"><strong>${r.icon} ${r.label}</strong><p>${escapeHtml(state.answers[r.key]) || "<em>Nothing entered.</em>"}</p></div>`).join("")}
        </div>
        <div class="nav-row">
          <button class="btn ghost" id="editRecipe">← EDIT RECIPE</button>
          <button class="btn primary" id="sendRecipe">🧪 SEND TO THE LAB</button>
        </div>
        <p class="hint">By submitting this recipe, you're asking Half Baked Ideas Lab to review and develop your idea. We do not promise a particular outcome.</p>
        <div id="sendStatus"></div>
      </article>
    </div>
  `);
}

function success() {
  return layout(`
    <div class="success">
      <div class="big">🔥</div>
      <h2>IT'S IN THE OVEN!</h2>
      <p>Your Half Baked Idea Recipe has been delivered to the Lab. Our idea cooks can now begin working on it.</p>
      <p><strong>Please allow 3–7 business days for your idea to cook.</strong></p>
      <div class="action-stack">
        <button class="btn" data-route="home">🏠 BACK TO THE LAB</button>
        <button class="btn primary" data-route="recipe">🥣 START ANOTHER RECIPE</button>
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
        <div class="action-stack"><button class="btn primary" ${cash ? `onclick="window.open('${escapeHtml(cash)}','_blank','noopener')"` : "disabled"}>DONATE WITH CASH APP</button></div>
      </article>
      <article class="card">
        <h3>💙 PAYPAL</h3>
        <p>Support the Lab through PayPal.</p>
        <div class="action-stack"><button class="btn" ${paypal ? `onclick="window.open('${escapeHtml(paypal)}','_blank','noopener')"` : "disabled"}>DONATE WITH PAYPAL</button></div>
      </article>
    </div>
    <div class="notice" style="margin-top:16px;text-align:center">No pressure. Your ideas are welcome whether you donate a penny or not.</div>
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
      <article class="recipe-card">
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
    "tier-egg": tierEgg,
    "tier-half-baked": tierHalfBaked,
    "paywall-half-baked": paywallHalfBaked,
  
    "recipe": () => recipeStep(),
    "customer": customerInfo,
    "review-recipe": reviewRecipe,
    success
  };
  app.innerHTML = (routes[state.route] || home)();
  document.querySelectorAll("[data-route]").forEach(el => el.addEventListener("click", () => go(el.dataset.route)));
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
      if (!name || !email) return alert("Please enter your name and email so we know where to send your finished ideas.");
      state.customer = { name, email };
      state.step = 0; state.route = "recipe"; render();
    });
  }   
  if (state.route === "how") {
    document.querySelectorAll('[data-tier="egg"]')?.forEach(el => {
      el.addEventListener('click', () => go('tier-egg'));
    });
    document.querySelectorAll('[data-tier="half-baked"]')?.forEach(el => {
      el.addEventListener('click', () => go('tier-half-baked'));
    });
  }
  if (state.route === "review-recipe") {
    document.getElementById("editRecipe")?.addEventListener("click", () => { state.step = 0; state.route = "recipe"; render(); });
    document.getElementById("sendRecipe")?.addEventListener("click", sendRecipe);
  }
  if (state.route === "tier-egg" || state.route === "tier-half-baked") {
    document.querySelector('[data-route="customer"]')?.addEventListener('click', (e) => {
      const tier = e.target.dataset.selectedTier;
      if (tier) state.selectedTier = tier;
      go('customer');
    });
  
 }
  if (state.route === "paywall-half-baked") {
  document.getElementById("skipPaywall")?.addEventListener("click", () => {
    state.selectedTier = "half-baked";
    go("customer");
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
  if (!emailReady() || !templateId || templateId.startsWith("YOUR_")) {
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
    tier_name: state.selectedTier === "egg" ? "Free - Idea Roast" : state.selectedTier === "half-baked" ? "$49 - Reality Check Sprint" : "No tier",
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
      customer_name: state.review.privateName ? "Private" : state.review.name,
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
  if (!state.contact.name || !state.contact.email || !state.contact.message) {
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
    status.innerHTML = `<div class="notice">Sent! We'll get back to you ASAP.</div>`;
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
    if (!name || !contact || !message) {
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
function paywallHalfBaked() {
  return layout(`
    <div class="step-shell">
      <div class="section-title">
        <h2>🥣 Half Baked - Reality Check Sprint</h2>
        <p>Complete your $49 payment to start your 7-day test.</p>
      </div>
      <article class="recipe-card">
        <div class="notice" style="margin-bottom:20px">
          <strong>What happens next:</strong> After payment, you'll fill out your Ideas Recipe. We'll email you within 24 hours to kick off your Reality Check Sprint.
        </div>
        <h3 style="text-align:center;margin-bottom:20px">Pay $49 to Continue</h3>
        <div class="action-stack">
          <button class="btn primary" onclick="window.open('https://paypal.me/halfbakedideaslab/49','_blank','noopener')">💙 PAY WITH PAYPAL</button>
          <button class="btn" onclick="window.open('https://cash.app/$HalfBakedIdeasLab/49','_blank','noopener')">💵 PAY WITH CASH APP</button>
        </div>
        <div class="notice" style="margin-top:20px;text-align:center">
          <strong>Already paid?</strong> Tap below to continue to your recipe.
        </div>
        <button class="btn" id="skipPaywall" style="width:100%;margin-top:12px">I'VE PAID → START MY RECIPE</button>
        <button class="btn ghost" data-route="tier-half-baked" style="width:100%;margin-top:8px">← BACK</button>
      </article>
    </div>
  `);
}
render();
