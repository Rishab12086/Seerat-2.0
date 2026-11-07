/*
 * Enquiry form + "Volunteer / Partner / Support" buttons.
 *
 * Buttons anywhere on the site use  href="index.html#contact" data-topic="…"
 * (volunteer | partner | support | general). On the Home page the click scrolls
 * to the form and pre-selects the topic. On other pages the topic is kept in
 * sessionStorage for the Home page to pick up, so nothing goes in the URL.
 *
 * The form posts to the Formspree endpoint in assets/js/config.js. If sending
 * fails (or the ID has not been set yet), it opens an email to the fallback
 * address with the subject and message pre-filled.
 */
(function () {
  var cfg = (window.SWT_CONFIG && window.SWT_CONFIG.contactForm) || {};
  var FALLBACK = cfg.fallbackEmail || "swt@seerat.org.in";
  var ENDPOINT = cfg.endpoint || "";
  var KEY = "swt-topic";
  var form = document.getElementById("enquiry");
  var topicSel = form ? form.querySelector("#cf-topic") : null;

  function selectTopic(topic) {
    if (!topicSel || !topic) return;
    for (var i = 0; i < topicSel.options.length; i++) {
      if (topicSel.options[i].getAttribute("data-topic") === topic) {
        topicSel.selectedIndex = i;
        return;
      }
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[data-topic]") : null;
    if (!a) return;
    var topic = a.getAttribute("data-topic");
    if (form) {
      e.preventDefault();
      selectTopic(topic);
      var target = document.getElementById("contact");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (location.hash !== "#contact" && history.pushState) history.pushState(null, "", "#contact");
      setTimeout(function () {
        var n = form.querySelector("#cf-name");
        if (n) n.focus({ preventScroll: true });
      }, 700);
    } else {
      try { sessionStorage.setItem(KEY, topic); } catch (_) {}
    }
  });

  if (!form) return;

  try {
    var saved = sessionStorage.getItem(KEY);
    if (saved) { selectTopic(saved); sessionStorage.removeItem(KEY); }
  } catch (_) {}

  // Arriving from another page: settle on the form once the page has loaded
  // (late-loading fonts can shift the browser's own jump to #contact).
  if (location.hash === "#contact") {
    window.addEventListener("load", function () {
      var target = document.getElementById("contact");
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 150);
    });
  }

  var status = form.querySelector(".cf-status");
  var btn = form.querySelector(".cf-submit");
  var btnHTML = btn ? btn.innerHTML : "";

  function setStatus(text, kind) {
    status.className = "cf-status" + (kind ? " " + kind : "");
    status.textContent = text;
  }

  function val(name) {
    var el = form.elements[name];
    return el ? String(el.value || "").trim() : "";
  }

  function openMailFallback(subject, body) {
    window.location.href = "mailto:" + FALLBACK +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    // Honeypot: real visitors never fill this in.
    if (val("_gotcha")) { form.reset(); setStatus("Thank you, we'll be in touch soon.", "ok"); return; }

    var name = val("name"), email = val("email"), phone = val("phone");
    var topic = val("topic"), message = val("message");
    var subject = "[" + topic + "] Website message from " + name;
    var body = message + "\n\n—\nName: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "");

    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("topic", topic);
    data.append("message", message);
    data.append("_subject", subject);
    data.append("_replyto", email);
    data.append("_gotcha", "");

    if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }
    setStatus("Sending...", "");

    function done() { if (btn) { btn.disabled = false; btn.innerHTML = btnHTML; } }
    function fail() {
      setStatus("Sorry, your message could not be sent. We're opening your email app so you can send it to " + FALLBACK + " instead.", "err");
      done();
      openMailFallback(subject, body);
    }

    if (!ENDPOINT || ENDPOINT.indexOf("FORMSPREE_ID") !== -1 || !window.fetch) { fail(); return; }

    fetch(ENDPOINT, { method: "POST", headers: { "Accept": "application/json" }, body: data })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        form.reset();
        setStatus("Thank you, we'll be in touch soon.", "ok");
        done();
      })
      .catch(fail);
  });
})();
