(function () {
  var brandFull = "Nitin Dental Care";
  var brandShort = "Nitin Dental";
  var contactName = "Nitin";
  var contactEmail = "nitin.devsecops@gmail.com";
  var bookingHref =
    "mailto:" +
    contactEmail +
    "?subject=Book%20a%20Visit%20-%20Nitin%20Dental%20Care";
  var callHref =
    "mailto:" + contactEmail + "?subject=Call%20Request%20-%20Nitin";
  var appointmentHref =
    "mailto:" +
    contactEmail +
    "?subject=Dental%20Appointment%20-%20Nitin%20Dental%20Care&body=";

  function swapText(value) {
    if (!value) return value;
    return value
      .split("Lumora Dental")
      .join(brandFull)
      .split("Lumora")
      .join(brandFull)
      .split("Shreyas Raj")
      .join(contactName)
      .split("hello@lumoradental.com")
      .join(contactEmail)
      .split("+91 9307512816")
      .join("Contact " + contactName)
      .split("+919307512816")
      .join("Contact " + contactName)
      .split("9307512816")
      .join("Contact " + contactName)
      .split("9193007512816")
      .join("Contact " + contactName);
  }

  function updateHead() {
    document.title = swapText(document.title);
    document.querySelectorAll("meta[content]").forEach(function (meta) {
      meta.setAttribute("content", swapText(meta.getAttribute("content")));
    });
  }

  function setAnchorCopy(anchor, text) {
    var target =
      anchor.querySelector(".our-info_item-para") ||
      anchor.querySelector("div") ||
      anchor.querySelector("span");
    if (target) {
      target.textContent = text;
      return;
    }
    anchor.textContent = text;
  }

  function updateLinks() {
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var href = anchor.getAttribute("href") || "";

      if (href.indexOf("calendly.com/shreyasrajsony11") !== -1) {
        anchor.setAttribute("href", bookingHref);
        anchor.removeAttribute("target");
      }

      if (href.indexOf("mailto:hello@lumoradental.com") === 0) {
        var query = href.indexOf("?") !== -1 ? href.slice(href.indexOf("?")) : "";
        anchor.setAttribute("href", "mailto:" + contactEmail + query);
      }

      if (
        href.indexOf("tel:+91 9307512816") === 0 ||
        href.indexOf("tel:+919307512816") === 0
      ) {
        anchor.setAttribute("href", callHref);
      }
    });

    document.querySelectorAll(".our-info_item-link[href^='mailto:']").forEach(function (anchor) {
      if ((anchor.textContent || "").toLowerCase().indexOf("email") !== -1) {
        setAnchorCopy(anchor, "Email: " + contactEmail);
      }
    });

    document.querySelectorAll(".our-info_item-link[href^='mailto:']").forEach(function (anchor) {
      if ((anchor.textContent || "").toLowerCase().indexOf("call") !== -1) {
        setAnchorCopy(anchor, "Call: Contact " + contactName);
      }
    });

    document.querySelectorAll(".footer-contact_link[href^='mailto:']").forEach(function (anchor, index) {
      setAnchorCopy(anchor, index === 0 ? "Contact " + contactName : contactEmail);
    });
  }

  function updateImages() {
    document.querySelectorAll("img[alt]").forEach(function (image) {
      image.alt = swapText(image.alt);
    });
  }

  function updateTextNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        var parent = node.parentNode;
        if (!parent) {
          return NodeFilter.FILTER_REJECT;
        }
        var tagName = parent.nodeName.toLowerCase();
        if (tagName === "script" || tagName === "style" || tagName === "noscript") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    var nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(function (node) {
      var updated = swapText(node.nodeValue);
      if (updated !== node.nodeValue) {
        node.nodeValue = updated;
      }
    });
  }

  window.lumoraLead = function (event) {
    event.preventDefault();
    var form = event.target;
    var name = (form.querySelector('input[name="name"]').value || "").trim();
    var phone = (form.querySelector('input[name="phone"]').value || "").trim();
    if (!name || !phone) {
      return false;
    }
    var message = encodeURIComponent(
      "Hi " +
        contactName +
        ", I'm " +
        name +
        ". Please contact me at " +
        phone +
        " about a dental appointment."
    );
    try {
      window.open(appointmentHref + message, "_blank");
    } catch (_) {}
    var card = form.closest(".lead-form_card");
    if (card) {
      form.style.display = "none";
      var head = card.querySelector(".lead-form_head");
      if (head) head.style.display = "none";
      var ok = card.querySelector(".lead-form_success");
      if (ok) ok.style.display = "block";
    }
    return false;
  };

  updateHead();
  updateLinks();
  updateImages();
  updateTextNodes();
})();
