(function(){
  "use strict";

  /* ================= DATA ================= */

  var schools = [
    { id:'sp',  name:'EMEF Rio Claro',               city:'São Paulo, SP',    region:'Sudeste',      lat:-23.5505, lon:-46.6333, x:178, y:303,
      offers:['Laboratório de informática (20 máquinas)','Biblioteca com 4.200 títulos'],
      needs:['Parceiros para a Feira Regional de Ciências'] },
    { id:'mn',  name:'Escola Estadual Beira-Rio',    city:'Manaus, AM',       region:'Norte',        lat:-3.1190,  lon:-60.0217, x:40,  y:60,
      offers:['Projeto replicável: Horta na Palafita'],
      needs:['Laboratório de ciências','Conexão de internet estável'] },
    { id:'rc',  name:'Colégio Municipal Cais do Porto', city:'Recife, PE',    region:'Nordeste',     lat:-8.0476,  lon:-34.8770, x:300, y:118,
      offers:['Projeto replicável: Clube de Robótica com Sucata'],
      needs:['Livros didáticos de matemática (6º ao 9º ano)'] },
    { id:'sv',  name:'E.E. Pituba',                   city:'Salvador, BA',     region:'Nordeste',     lat:-12.9714, lon:-38.5014, x:263, y:177,
      offers:['Quadra poliesportiva para eventos regionais'],
      needs:['Kits de laboratório de química'] },
    { id:'bsb', name:'CEM Planalto',                  city:'Brasília, DF',     region:'Centro-Oeste', lat:-15.7801, lon:-47.9292, x:165, y:210,
      offers:['Mentoria para olimpíadas científicas'],
      needs:['Escolas parceiras para a Feira Nacional'] },
    { id:'poa', name:'Colégio Sul da Serra',          city:'Porto Alegre, RS', region:'Sul',          lat:-30.0346, lon:-51.2177, x:131, y:380,
      offers:['Acervo de 6.800 livros para empréstimo entre escolas'],
      needs:['Turmas parceiras para intercâmbio de projetos'] },
    { id:'goi', name:'Escola Municipal Cerrado Novo', city:'Goiânia, GO',      region:'Centro-Oeste', lat:-16.6869, lon:-49.2648, x:151, y:221,
      offers:['Projeto replicável: Agricultura Urbana'],
      needs:['Equipamentos de informática'] },
    { id:'bel', name:'E.E. Ribeirinha',                city:'Belém, PA',        region:'Norte',        lat:-1.4558,  lon:-48.4902, x:159, y:40,
      offers:['Projeto replicável: Memória Ribeirinha'],
      needs:['Laboratório de ciências','Conexão de internet estável'] },
    { id:'cwb', name:'Instituto Técnico Araucária',    city:'Curitiba, PR',     region:'Sul',          lat:-25.4284, lon:-49.2733, x:151, y:325,
      offers:['Laboratório de robótica avançado','Mentoria técnica'],
      needs:['Escolas parceiras para olimpíada regional'] }
  ];
  var schoolsById = {};
  schools.forEach(function(s){ schoolsById[s.id] = s; });

  var resources = [
    { id:'r1', schoolId:'sp',  title:'Laboratório de informática (20 máquinas)', categoria:'Equipamento',   status:'Disponível',        desc:'Uso agendado às terças e quintas, fora do horário de aula.' },
    { id:'r2', schoolId:'sp',  title:'Biblioteca com 4.200 títulos',             categoria:'Biblioteca',    status:'Disponível',        desc:'Empréstimo entre escolas via retirada agendada.' },
    { id:'r3', schoolId:'poa', title:'Acervo de 6.800 livros',                   categoria:'Biblioteca',    status:'Disponível',        desc:'Inclui coleção de literatura infantojuvenil e paradidáticos.' },
    { id:'r4', schoolId:'sv',  title:'Quadra poliesportiva',                     categoria:'Espaço',        status:'Disponível',        desc:'Capacidade para até 300 pessoas — ideal para feiras regionais.' },
    { id:'r5', schoolId:'cwb', title:'Laboratório de robótica avançado',         categoria:'Equipamento',   status:'Disponível',        desc:'Kits de robótica educacional e impressora 3D.' },
    { id:'r6', schoolId:'mn',  title:'Laboratório de ciências',                  categoria:'Equipamento',   status:'Buscando parceria', desc:'Escola busca acesso remoto ou parceria com laboratório de outra instituição.' },
    { id:'r7', schoolId:'rc',  title:'Livros didáticos de matemática',           categoria:'Biblioteca',    status:'Buscando parceria', desc:'Necessário para turmas do 6º ao 9º ano do fundamental.' },
    { id:'r8', schoolId:'sv',  title:'Kits de laboratório de química',           categoria:'Equipamento',   status:'Buscando parceria', desc:'Para retomar aulas práticas de química no ensino médio.' },
    { id:'r9', schoolId:'goi', title:'Equipamentos de informática',              categoria:'Equipamento',   status:'Buscando parceria', desc:'Laboratório atual tem apenas 4 máquinas funcionando.' },
    { id:'r10',schoolId:'bel', title:'Laboratório de ciências',                  categoria:'Equipamento',   status:'Buscando parceria', desc:'Nenhum laboratório disponível na unidade atualmente.' },
    { id:'r11',schoolId:'bel', title:'Conexão de internet estável',              categoria:'Conectividade', status:'Buscando parceria', desc:'Rede atual não suporta uso pedagógico simultâneo em sala.' },
    { id:'r12',schoolId:'mn',  title:'Conexão de internet estável',              categoria:'Conectividade', status:'Buscando parceria', desc:'Acesso instável dificulta uso de recursos digitais em aula.' }
  ];

  var projects = [
    { id:'p1', schoolId:'mn',  title:'Horta na Palafita',                    area:'Sustentabilidade', tags:['Ensino Fundamental','Educação Ambiental'], desc:'Sistema de cultivo suspenso adaptado à realidade ribeirinha, usado para ensinar ciências e nutrição.' },
    { id:'p2', schoolId:'rc',  title:'Clube de Robótica com Sucata',         area:'Tecnologia',       tags:['Ensino Fundamental II','Robótica'],          desc:'Robôs simples construídos com material eletrônico reaproveitado, sem custo de kits comerciais.' },
    { id:'p3', schoolId:'goi', title:'Agricultura Urbana',                   area:'Sustentabilidade', tags:['Ensino Médio','Educação Ambiental'],         desc:'Horta comunitária integrada ao currículo de Biologia e Geografia.' },
    { id:'p4', schoolId:'bel', title:'Memória Ribeirinha',                   area:'Cultura',          tags:['Ensino Fundamental','História Oral'],        desc:'Registro em áudio e vídeo de histórias de moradores ribeirinhos, com os estudantes como entrevistadores.' },
    { id:'p5', schoolId:'bsb', title:'Mentoria para Olimpíadas Científicas', area:'Ciências',         tags:['Ensino Médio','Iniciação Científica'],       desc:'Grupo de professores voluntários orienta estudantes de outras escolas na preparação para olimpíadas.' },
    { id:'p6', schoolId:'cwb', title:'Robótica Educacional Aberta',          area:'Tecnologia',       tags:['Ensino Médio','Robótica'],                   desc:'Roteiro de aulas e lista de peças de baixo custo para montar um laboratório básico de robótica.' }
  ];

  var events = [
    { id:'e1', title:'Feira Regional de Ciências do Centro-Oeste', type:'Feira',       hostId:'bsb', date:'14 nov. 2026', participants:['bsb','goi','sp','cwb'] },
    { id:'e2', title:'Olimpíada Norte-Nordeste de Robótica',       type:'Olimpíada',   hostId:'rc',  date:'22 out. 2026', participants:['rc','sv','mn','bel'] },
    { id:'e3', title:'Mostra Cultural Rios e Redes',               type:'Mostra',      hostId:'bel', date:'05 dez. 2026', participants:['bel','mn','rc'] },
    { id:'e4', title:'Intercâmbio de Clubes de Leitura',           type:'Intercâmbio', hostId:'poa', date:'18 fev. 2027', participants:['poa','sp','sv'] }
  ];

  var opportunities = [
    { id:'o1', title:'Olimpíada Brasileira de Robótica (OBR)',        org:'Sociedade Brasileira de Computação',            area:'Tecnologia', deadline:'2026-12-10', desc:'Inscrições abertas para escolas de todo o país, modalidade prática e teórica.' },
    { id:'o2', title:'Feira Brasileira de Ciências e Engenharia (FEBRACE)', org:'USP',                                     area:'Ciências',    deadline:'2027-01-20', desc:'Seleção de projetos de ensino médio e técnico para a mostra nacional.' },
    { id:'o3', title:'Olimpíada Nacional de Ciências (ONC)',          org:'Ministério da Ciência, Tecnologia e Inovação',  area:'Ciências',    deadline:'2027-03-05', desc:'Aberta a estudantes do fundamental II ao ensino médio.' },
    { id:'o4', title:'Bolsa de Iniciação Científica Júnior',          org:'CNPq',                                          area:'Pesquisa',    deadline:'2027-02-28', desc:'Bolsas para estudantes do ensino médio orientados por pesquisadores parceiros.' }
  ];

  /* ================= STATE ================= */
  var state = {
    activeSchool: null,
    recurso: { busca:'', categoria:'todas', status:'todas' },
    projeto: { busca:'', area:'todas' }
  };

  var map, markers = {};

  /* ================= HELPERS ================= */
  function el(tag, cls, html){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function showToast(msg){
    var c = document.getElementById('toast-container');
    var t = el('div','toast',msg);
    c.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){
      t.classList.remove('show');
      setTimeout(function(){ c.removeChild(t); }, 250);
    }, 2600);
  }

  function uniqueSorted(arr){
    return Array.from(new Set(arr)).sort(function(a,b){ return a.localeCompare(b,'pt-BR'); });
  }

  /* ================= NAV ================= */
  function showView(id){
    document.querySelectorAll('.view').forEach(function(v){
      v.classList.toggle('active', v.id === 'view-' + id);
    });
    document.querySelectorAll('.navlink').forEach(function(a){
      a.classList.toggle('active', a.dataset.view === id);
    });
    if (id === 'mapa' && map) setTimeout(function(){ map.invalidateSize(); }, 60);
    if (history.replaceState) history.replaceState(null,'', '#' + id);
  }

  document.getElementById('navtabs').addEventListener('click', function(e){
    var btn = e.target.closest('.navlink');
    if (!btn) return;
    showView(btn.dataset.view);
  });
  document.body.addEventListener('click', function(e){
    var btn = e.target.closest('[data-view-link]');
    if (!btn) return;
    showView(btn.dataset.viewLink);
  });

  /* ================= HERO NETWORK ART ================= */
  function renderHeroNetwork(){
    var svg = document.getElementById('hero-network');
    var hubs = {};
    events.forEach(function(e){ hubs[e.hostId] = true; });

    var lines = '';
    events.forEach(function(e){
      var host = schoolsById[e.hostId];
      e.participants.filter(function(id){ return id !== e.hostId; }).forEach(function(pid){
        var p = schoolsById[pid];
        lines += '<line class="net-line" x1="'+host.x+'" y1="'+host.y+'" x2="'+p.x+'" y2="'+p.y+'"></line>';
      });
    });

    var nodes = schools.map(function(s){
      var ringClass = hubs[s.id] ? 'net-node__ring pulse' : 'net-node__ring';
      return '<g class="net-node" data-id="'+s.id+'" tabindex="0" role="button" aria-label="'+s.name+'">'+
        '<circle class="'+ringClass+'" cx="'+s.x+'" cy="'+s.y+'" r="9"></circle>'+
        '<circle class="net-node__dot" cx="'+s.x+'" cy="'+s.y+'" r="4"></circle>'+
        '</g>';
    }).join('');

    svg.innerHTML = lines + nodes;
    svg.querySelectorAll('.net-node').forEach(function(g){
      g.addEventListener('click', function(){
        showView('mapa'); selectSchool(g.dataset.id);
      });
      g.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); showView('mapa'); selectSchool(g.dataset.id); }
      });
    });
  }

  /* ================= LIVE COUNTER ================= */
  function renderLiveCount(){
    document.getElementById('livecount-text').textContent =
      schools.length + ' escolas conectadas · ' + resources.length + ' recursos · ' + projects.length + ' projetos replicáveis';
  }

  /* ================= MAPA ================= */
  function initMap(){
    map = L.map('map-canvas', { zoomControl:true, scrollWheelZoom:false }).setView([-14.2,-51.9], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd', maxZoom: 18
    }).addTo(map);

    schools.forEach(function(s){
      var icon = L.divIcon({
        className: '',
        html: '<div class="map-pin" id="pin-'+s.id+'"><span class="map-pin__ring"></span><span class="map-pin__dot"></span></div>',
        iconSize: [18,18], iconAnchor: [9,9]
      });
      var m = L.marker([s.lat, s.lon], { icon: icon }).addTo(map);
      m.bindTooltip(s.name + ' · ' + s.city, { direction:'top', offset:[0,-10], className:'map-tooltip' });
      m.on('click', function(){ selectSchool(s.id); });
      markers[s.id] = m;
    });

    renderSchoolList();
  }

  function renderSchoolList(){
    var list = document.getElementById('school-list');
    list.innerHTML = '';
    schools.forEach(function(s){
      var li = el('li');
      var btn = el('button','schoolrow'+(state.activeSchool===s.id?' active':''),
        '<span>'+s.name+'</span><small>'+s.region+'</small>');
      btn.addEventListener('click', function(){ selectSchool(s.id); map.flyTo([s.lat,s.lon], 6, {duration:.6}); });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function selectSchool(id){
    var prev = state.activeSchool;
    state.activeSchool = id;
    var s = schoolsById[id];

    if (prev){ var prevEl = document.getElementById('pin-'+prev); if (prevEl) prevEl.classList.remove('active'); }
    var curEl = document.getElementById('pin-'+id); if (curEl) curEl.classList.add('active');

    var panel = document.getElementById('school-panel');
    var offers = s.offers.map(function(o){ return '<span class="chip chip--offer">'+o+'</span>'; }).join('');
    var needs  = s.needs.map(function(n){ return '<span class="chip chip--need">'+n+'</span>'; }).join('');

    panel.innerHTML =
      '<h3>'+s.name+'</h3>'+
      '<p class="muted">'+s.city+' · '+s.region+'</p>'+
      '<div class="chipgroup"><h4>Oferece</h4>'+offers+'</div>'+
      '<div class="chipgroup"><h4>Precisa</h4>'+needs+'</div>'+
      '<div style="margin-top:16px"><button class="btn btn--ghost btn--sm" id="goto-recursos-btn">Ver recursos desta escola</button></div>'+
      '<ul class="schoollist" id="school-list"></ul>';

    document.getElementById('goto-recursos-btn').addEventListener('click', function(){
      document.getElementById('recurso-busca').value = '';
      state.recurso.busca = ''; state.recurso.categoria = 'todas'; state.recurso.status = 'todas';
      document.getElementById('recurso-categoria').value = 'todas';
      document.getElementById('recurso-status').value = 'todas';
      state.__recursoSchoolFilter = id;
      showView('recursos');
      renderResources();
    });

    renderSchoolList();
  }

  /* ================= RECURSOS ================= */
  function populateRecursoFilters(){
    var sel = document.getElementById('recurso-categoria');
    uniqueSorted(resources.map(function(r){ return r.categoria; })).forEach(function(c){
      var o = el('option'); o.value = c; o.textContent = c; sel.appendChild(o);
    });
  }

  function categoriaCardClass(categoria){
    if (categoria === 'Biblioteca') return 'card--violet';
    if (categoria === 'Espaço') return 'card--coral';
    if (categoria === 'Conectividade') return 'card--sky';
    return '';
  }

  function renderResources(){
    var grid = document.getElementById('recurso-grid');
    var busca = state.recurso.busca.toLowerCase();
    var schoolFilter = state.__recursoSchoolFilter;

    var list = resources.filter(function(r){
      var s = schoolsById[r.schoolId];
      if (state.recurso.categoria !== 'todas' && r.categoria !== state.recurso.categoria) return false;
      if (state.recurso.status !== 'todas' && r.status !== state.recurso.status) return false;
      if (schoolFilter && r.schoolId !== schoolFilter) return false;
      if (busca && (r.title+' '+r.desc+' '+s.name).toLowerCase().indexOf(busca) === -1) return false;
      return true;
    });

    document.getElementById('recurso-count').textContent = list.length + (list.length===1?' recurso':' recursos');

    var chipWrap = document.getElementById('recurso-schoolchip');
    if (schoolFilter){
      chipWrap.innerHTML = '<span class="chip chip--offer">Escola: '+schoolsById[schoolFilter].name+' <button id="clear-schoolchip" style="background:none;border:none;color:inherit;cursor:pointer;font-weight:700;margin-left:4px">×</button></span>';
      document.getElementById('clear-schoolchip').addEventListener('click', function(){
        state.__recursoSchoolFilter = null; renderResources();
      });
    } else {
      chipWrap.innerHTML = '';
    }

    if (!list.length){
      grid.innerHTML = '<div class="empty">Nenhum recurso encontrado com esses filtros. Ajuste a busca ou limpe os filtros.</div>';
      return;
    }

    grid.innerHTML = '';
    list.forEach(function(r){
      var s = schoolsById[r.schoolId];
      var card = el('div','card ' + categoriaCardClass(r.categoria));
      var pillClass = r.status === 'Disponível' ? 'pill--ok' : 'pill--wait';
      card.innerHTML =
        '<div class="card__top"><h3 class="card__title">'+r.title+'</h3><span class="pill '+pillClass+'">'+r.status+'</span></div>'+
        '<button class="card__school" data-school="'+s.id+'">'+s.name+' · '+s.city+'</button>'+
        '<p class="card__desc">'+r.desc+'</p>'+
        '<div class="tags"><span class="tag">'+r.categoria+'</span></div>'+
        '<div class="card__foot"><button class="btn btn--ghost btn--sm" data-request="'+r.id+'">'+(r.status==='Disponível' ? 'Solicitar recurso' : 'Oferecer ajuda')+'</button></div>';
      grid.appendChild(card);
    });
  }

  /* ================= PROJETOS ================= */
  function populateProjetoFilters(){
    var sel = document.getElementById('projeto-area');
    uniqueSorted(projects.map(function(p){ return p.area; })).forEach(function(a){
      var o = el('option'); o.value = a; o.textContent = a; sel.appendChild(o);
    });
  }

  function areaCardClass(area){
    if (area === 'Tecnologia') return 'card--sky';
    if (area === 'Cultura') return 'card--coral';
    if (area === 'Ciências') return 'card--amber';
    return 'card--violet';
  }

  function renderProjects(){
    var grid = document.getElementById('projeto-grid');
    var busca = state.projeto.busca.toLowerCase();

    var list = projects.filter(function(p){
      if (state.projeto.area !== 'todas' && p.area !== state.projeto.area) return false;
      var s = schoolsById[p.schoolId];
      if (busca && (p.title+' '+p.desc+' '+s.name).toLowerCase().indexOf(busca) === -1) return false;
      return true;
    });

    document.getElementById('projeto-count').textContent = list.length + (list.length===1?' projeto':' projetos');

    if (!list.length){
      grid.innerHTML = '<div class="empty">Nenhum projeto encontrado com esses filtros.</div>';
      return;
    }

    grid.innerHTML = '';
    list.forEach(function(p){
      var s = schoolsById[p.schoolId];
      var card = el('div','card ' + areaCardClass(p.area));
      card.innerHTML =
        '<div class="card__top"><h3 class="card__title">'+p.title+'</h3><span class="pill pill--ok">'+p.area+'</span></div>'+
        '<button class="card__school" data-school="'+s.id+'">'+s.name+' · '+s.city+'</button>'+
        '<p class="card__desc">'+p.desc+'</p>'+
        '<div class="tags">'+p.tags.map(function(t){ return '<span class="tag">'+t+'</span>'; }).join('')+'</div>'+
        '<div class="card__foot"><button class="btn btn--ghost btn--sm" data-adapt="'+p.id+'">Adaptar este projeto</button></div>';
      grid.appendChild(card);
    });
  }

  /* ================= ATIVIDADES ================= */
  function renderEvents(){
    var wrap = document.getElementById('event-list');
    wrap.innerHTML = '';
    events.forEach(function(e){
      var host = schoolsById[e.hostId];
      var row = el('div','event');
      var avatars = e.participants.map(function(id){
        var s = schoolsById[id];
        var initials = s.city.split(',')[0].slice(0,2).toUpperCase();
        return '<span class="avatar" data-school="'+s.id+'" title="'+s.name+' · '+s.city+'">'+initials+'</span>';
      }).join('');
      row.innerHTML =
        '<div class="event__date">'+e.date+'</div>'+
        '<div>'+
          '<span class="event__type">'+e.type+' · sede: '+host.name+'</span>'+
          '<h3 class="card__title" style="margin-bottom:4px">'+e.title+'</h3>'+
          '<div class="event__participants">'+avatars+'</div>'+
          '<div class="card__foot"><button class="btn btn--ghost btn--sm" data-join="'+e.id+'">Inscrever escola</button></div>'+
        '</div>';
      wrap.appendChild(row);
    });
  }

  /* ================= OPORTUNIDADES ================= */
  function daysUntil(dateStr){
    var target = new Date(dateStr + 'T23:59:59');
    var now = new Date();
    return Math.ceil((target - now) / (1000*60*60*24));
  }

  function renderOpportunities(){
    var grid = document.getElementById('opp-grid');
    grid.innerHTML = '';
    opportunities.forEach(function(o){
      var days = daysUntil(o.deadline);
      var deadlineClass = 'opp__deadline', deadlineText;
      if (days < 0){ deadlineClass += ' closed'; deadlineText = 'Inscrições encerradas'; }
      else if (days <= 14){ deadlineClass += ' urgent'; deadlineText = 'Faltam ' + days + ' dias para inscrever'; }
      else { deadlineText = 'Faltam ' + days + ' dias para inscrever'; }

      var card = el('div','opp');
      card.innerHTML =
        '<div class="card__top"><h3 class="card__title">'+o.title+'</h3><span class="pill pill--ok">'+o.area+'</span></div>'+
        '<p class="card__desc">'+o.org+'</p>'+
        '<p class="card__desc">'+o.desc+'</p>'+
        '<div class="'+deadlineClass+'">'+deadlineText+'</div>';
      grid.appendChild(card);
    });
  }

  /* ================= DELEGATED CLICKS ================= */
  document.addEventListener('click', function(e){
    var schoolBtn = e.target.closest('[data-school]');
    if (schoolBtn){
      var id = schoolBtn.dataset.school;
      showView('mapa'); selectSchool(id);
      if (map) map.flyTo([schoolsById[id].lat, schoolsById[id].lon], 6, {duration:.6});
      return;
    }
    var req = e.target.closest('[data-request]');
    if (req){
      var r = resources.filter(function(x){ return x.id === req.dataset.request; })[0];
      showToast((r.status==='Disponível'?'Solicitação enviada para ':'Oferta registrada para ') + schoolsById[r.schoolId].name + '.');
      return;
    }
    var adapt = e.target.closest('[data-adapt]');
    if (adapt){
      var p = projects.filter(function(x){ return x.id === adapt.dataset.adapt; })[0];
      showToast('Roteiro de "' + p.title + '" adicionado aos seus projetos.');
      return;
    }
    var join = e.target.closest('[data-join]');
    if (join){
      var ev = events.filter(function(x){ return x.id === join.dataset.join; })[0];
      showToast('Inscrição enviada para "' + ev.title + '".');
      return;
    }
  });

  /* ================= FILTER LISTENERS ================= */
  document.getElementById('recurso-busca').addEventListener('input', function(e){ state.recurso.busca = e.target.value; renderResources(); });
  document.getElementById('recurso-categoria').addEventListener('change', function(e){ state.recurso.categoria = e.target.value; state.__recursoSchoolFilter = null; renderResources(); });
  document.getElementById('recurso-status').addEventListener('change', function(e){ state.recurso.status = e.target.value; renderResources(); });

  document.getElementById('projeto-busca').addEventListener('input', function(e){ state.projeto.busca = e.target.value; renderProjects(); });
  document.getElementById('projeto-area').addEventListener('change', function(e){ state.projeto.area = e.target.value; renderProjects(); });

  /* ================= INIT ================= */
  function init(){
    renderLiveCount();
    renderHeroNetwork();
    populateRecursoFilters();
    populateProjetoFilters();
    renderResources();
    renderProjects();
    renderEvents();
    renderOpportunities();
    initMap();

    var startView = (location.hash || '#visao').replace('#','');
    var valid = ['visao','mapa','recursos','projetos','atividades','oportunidades'];
    showView(valid.indexOf(startView) !== -1 ? startView : 'visao');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
