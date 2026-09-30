/* Pradip Portfolio V18.5 TEST */
(() => {
  const repos = [
    'industrial_pump_station_monitor',
    'embedded_firmware_STM32_motor_control',
    'smart_door_access_control',
    'smart_voice_assistant'
  ];
  const cards = document.querySelectorAll('#projects .project-card, .projects .project');
  [...cards].slice(0, 4).forEach((card, index) => {
    card.classList.add('project-expandable');
    const title = card.querySelector('h3, h2').textContent;
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'project-expand-toggle';
    control.setAttribute('aria-label', `Show GitHub link for ${title}`);
    control.setAttribute('aria-expanded', 'false');
    control.setAttribute('aria-controls', `project-github-${index}`);
    control.innerHTML = '<span aria-hidden="true">⌄</span>';
    const panel = document.createElement('div');
    panel.className = 'project-github-panel';
    panel.id = `project-github-${index}`;
    panel.inert = true;
    panel.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('div');
    inner.className = 'project-github-inner';
    const link = document.createElement('a');
    link.className = 'project-github-link';
    link.href = `https://github.com/pradip2059/${repos[index]}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View Project on GitHub ↗';
    link.setAttribute('aria-label', `${title}: View Project on GitHub (opens in a new tab)`);
    inner.append(link);
    panel.append(inner);
    card.append(control, panel);
    function toggle() {
      const open = control.getAttribute('aria-expanded') !== 'true';
      if (!open && panel.contains(document.activeElement)) control.focus();
      control.setAttribute('aria-expanded', String(open));
      control.setAttribute('aria-label', `${open ? 'Hide' : 'Show'} GitHub link for ${title}`);
      panel.inert = !open;
      panel.setAttribute('aria-hidden', String(!open));
      card.classList.toggle('project-expanded', open);
    }
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      if (event.target.closest('button') && !control.contains(event.target)) return;
      if (window.getSelection()?.toString()) return;
      toggle();
    });
  });
})();
