// script.js — form validation, UX helpers (Portuguese)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const messageEl = document.getElementById('formMessage');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Basic client-side validation
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const empresa = form.empresa.value.trim();
    const telefone = form.telefone.value.trim();
    const website = form.website.value; // honeypot

    if (website) {
      // Bot detected — silently ignore or show generic message
      showMessage('Obrigado! Entraremos em contato em breve.', 'ok');
      form.reset();
      return;
    }

    if (!nome || !email || !empresa || !telefone || !form.consent.checked) {
      showMessage('Por favor, preencha todos os campos e concorde com a Política de Privacidade.', 'error');
      return;
    }

    // Simula envio — substitua por fetch para seu endpoint real
    try {
      showMessage('Enviando... Aguarde.', 'info');
      // Exemplo de envio real (descomente e ajuste a url):
      // const resp = await fetch('/api/lead', {
      //   method: 'POST',
      //   headers: {'Content-Type':'application/json'},
      //   body: JSON.stringify({nome, email, empresa, telefone})
      // });
      // const data = await resp.json();

      // Simulação de delay
      await new Promise(r => setTimeout(r, 900));
      showMessage('Recebemos sua solicitação! Aguarde nosso contato para agendar a consultoria.', 'success');
      form.reset();
    } catch (err) {
      console.error(err);
      showMessage('Ocorreu um erro ao enviar. Tente novamente em instantes.', 'error');
    }
  });

  function showMessage(text, type) {
    messageEl.hidden = false;
    messageEl.textContent = text;
    messageEl.style.background = type === 'success' ? 'linear-gradient(90deg, #16a34a, #0ea5a2)' :
                              type === 'error' ? 'linear-gradient(90deg,#ff4d6d,#ff7a5c)' :
                              'rgba(255,255,255,0.04)';
    if (type === 'success') {
      messageEl.style.borderLeft = '4px solid #0ea5a2';
    } else {
      messageEl.style.borderLeft = '4px solid rgba(255,255,255,0.06)';
    }
  }

});