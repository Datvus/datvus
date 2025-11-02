import React, { useState, useEffect, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CustomGlassStyle = {
  background: 'rgba(255,255,255,.7)',
  backdropFilter: 'blur(8px)',
};

const CustomGlobalStyle = {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

const basePricing = {
  79: { monthly: 79, annual: 790 },
  149: { monthly: 149, annual: 1490 },
  349: { monthly: 349, annual: 3490 },
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnualPricing, setIsAnnualPricing] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' });
  const [prices, setPrices] = useState({
    79: 'R$ 79',
    149: 'R$ 149',
    349: 'R$ 349',
  });

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: 'ease-out' });
  }, []);

  const toggleMenu = useCallback((open) => {
    setIsMobileMenuOpen(open);
  }, []);

  const openLightbox = useCallback((src, alt) => {
    setLightbox({ isOpen: true, src, alt: alt || '' });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, src: '', alt: '' });
  }, []);

  const handlePricingToggle = useCallback(() => {
    setIsAnnualPricing((prev) => !prev);
  }, []);

  useEffect(() => {
    const newPrices = {};
    Object.keys(basePricing).forEach((key) => {
      const { monthly, annual } = basePricing[key];
      const price = isAnnualPricing ? annual : monthly;
      newPrices[key] = `R$ ${price}`;
    });
    setPrices(newPrices);
  }, [isAnnualPricing]);

  const handleAnchorClick = useCallback((e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href.length > 1 && href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (isMobileMenuOpen) {
      toggleMenu(false);
    }
  }, [isMobileMenuOpen, toggleMenu]);

  const navItems = ['Como funciona', 'Provas', 'Comparativo', 'Planos', 'FAQ'];

  return (
    <div className="bg-white text-slate-900" style={CustomGlobalStyle}>
      <div id="mobileMenu" className={`fixed inset-0 z-[100] ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => toggleMenu(false)}></div>
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="logo-datvus.png" className="w-8 h-8 rounded-md" alt="DATVUS" />
              <span className="font-semibold">DATVUS</span>
            </div>
            <button onClick={() => toggleMenu(false)} aria-label="Fechar" className="p-2 rounded-lg hover:bg-slate-100">✕</button>
          </div>
          <nav className="mt-6 space-y-4 text-sm">
            {navItems.map((item) => (
              <a key={item} onClick={handleAnchorClick} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block">
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-6 space-y-3">
            <a href="#cta" onClick={handleAnchorClick} className="block text-center px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 text-sm">Ver demo (3 min)</a>
            <a href="https://wa.me/5599999999999?text=Quero%20conhecer%20o%20DATVUS%20Fisio%20Joelho" className="block text-center px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm">WhatsApp</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/60" style={CustomGlassStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="logo-datvus.png" alt="DATVUS" className="w-8 h-8 rounded-md" />
            <span className="font-semibold tracking-tight">DATVUS</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={handleAnchorClick} className="hover:text-brand-700">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden sm:flex items-center gap-2">
            <a href="#cta" onClick={handleAnchorClick} className="px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 text-sm">Ver demo (3 min)</a>
            <a href="https://wa.me/5599999999999?text=Quero%20conhecer%20o%20DATVUS%20Fisio%20Joelho" className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm">WhatsApp</a>
          </div>
          <button onClick={() => toggleMenu(true)} className="md:hidden p-2 rounded-lg hover:bg-slate-100" aria-label="Menu">☰</button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-200 blur-3xl opacity-70"></div>
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-100 blur-3xl opacity-70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              O sistema de <span className="text-brand-700">fisioterapia do joelho</span> mais rápido de implementar
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Fichas automáticas por fase, evolução, testes funcionais e relatório clínico completo. Tudo em Excel, com licença por máquina e pronto para dashboards web via Supabase.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cta" onClick={handleAnchorClick} className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Assistir demo (3 min)</a>
              <a href="https://wa.me/5599999999999?text=Quero%20implementar%20o%20DATVUS" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50">Falar com especialista</a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl border border-slate-200"><dt className="text-xs text-slate-500">Implantação</dt><dd className="text-lg font-semibold">1 hora</dd></div>
              <div className="p-4 rounded-xl border border-slate-200"><dt className="text-xs text-slate-500">Relatório</dt><dd className="text-lg font-semibold">PDF completo</dd></div>
              <div className="p-4 rounded-xl border border-slate-200"><dt className="text-xs text-slate-500">Licença</dt><dd className="text-lg font-semibold">por máquina</dd></div>
            </dl>
          </div>
          <div className="relative" data-aos="fade-left">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-soft">
              <img src="visao-geral.jpg" alt="Visão Geral" className="w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img src="ficha-paciente.jpg" className="w-full rounded-xl border border-slate-200 cursor-zoom-in" alt="Ficha do Paciente" onClick={(e) => openLightbox(e.target.src, e.target.alt)} />
              <img src="relatorio-pdf.jpg" className="w-full rounded-xl border border-slate-200 cursor-zoom-in" alt="Relatório em PDF" onClick={(e) => openLightbox(e.target.src, e.target.alt)} />
            </div>
            <p className="text-xs text-slate-500 mt-2">* Imagens reais do DATVUS.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold" data-aos="fade-up">Destaques</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft" data-aos="fade-up">
              <div className="text-brand-700 font-semibold">Fichas automáticas</div>
              <p className="mt-2 text-slate-600 text-sm">Fases por protocolo (LCA, meniscectomia, etc.), exercícios, séries e repetições com histórico.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft" data-aos="fade-up" data-aos-delay="50">
              <div className="text-brand-700 font-semibold">Relatório profissional</div>
              <p className="mt-2 text-slate-600 text-sm">PDF completo (Fases, Evolução e Financeiro) pronto para paciente/médico.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft" data-aos="fade-up" data-aos-delay="100">
              <div className="text-brand-700 font-semibold">Licença por máquina</div>
              <p className="mt-2 text-slate-600 text-sm">Controle de distribuição, atualizações seguras e suporte.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft" data-aos="fade-up" data-aos-delay="150">
              <div className="text-brand-700 font-semibold">Integração web</div>
              <p className="mt-2 text-slate-600 text-sm">Pronto para sincronizar com Supabase e exibir dashboards online.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="provas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-aos="fade-right">
              <h2 className="text-2xl font-bold">Provas reais do sistema</h2>
              <p className="mt-3 text-slate-600">Transparência total: as imagens abaixo são do ambiente real em uso.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>• Visão Geral de pacientes com dias P.O., protocolo, sessões e última sessão.</li>
                <li>• Controle de Fichas com previsão de fim, resumo e sugestões.</li>
                <li>• Ficha do Paciente com plano de sessões e pagamentos registrados.</li>
                <li>• Relatório Clínico Completo em PDF (Fases, Evolução e Financeiro).</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              <img src="fichas-tabela.jpg" className="rounded-xl border border-slate-200 cursor-zoom-in" alt="Controle de Fichas" onClick={(e) => openLightbox(e.target.src, e.target.alt)} />
              <img src="relatorio-pdf.jpg" className="rounded-xl border border-slate-200 cursor-zoom-in" alt="Relatório PDF" onClick={(e) => openLightbox(e.target.src, e.target.alt)} />
              <img src="visao-geral.jpg" className="rounded-xl border border-slate-200 cursor-zoom-in col-span-2" alt="Visão Geral" onClick={(e) => openLightbox(e.target.src, e.target.alt)} />
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold" data-aos="fade-up">Como funciona</h2>
          <div className="mt-10 relative">
            <ol className="border-l-2 border-slate-200 ml-3 space-y-10">
              <li className="pl-6" data-aos="fade-up">
                <div className="text-sm text-slate-500">Passo 1</div>
                <div className="font-semibold">Ativação</div>
                <p className="text-slate-600">Recebe o arquivo e ativa por MAC. Em poucos minutos já está pronto.</p>
              </li>
              <li className="pl-6" data-aos="fade-up" data-aos-delay="60">
                <div className="text-sm text-slate-500">Passo 2</div>
                <div className="font-semibold">Lançamentos</div>
                <p className="text-slate-600">UserForm com validações; você registra sessões, fases e testes sem erros.</p>
              </li>
              <li className="pl-6" data-aos="fade-up" data-aos-delay="120">
                <div className="text-sm text-slate-500">Passo 3</div>
                <div className="font-semibold">Relatórios</div>
                <p className="text-slate-600">Gera PDF profissional com Fases, Evolução e Financeiro para entrega.</p>
              </li>
              <li className="pl-6" data-aos="fade-up" data-aos-delay="180">
                <div className="text-sm text-slate-500">Passo 4</div>
                <div className="font-semibold">Dashboards (opcional)</div>
                <p className="text-slate-600">Sincroniza com Supabase para visualização online de indicadores.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="comparativo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold" data-aos="fade-up">Por que o DATVUS?</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200" data-aos="fade-up">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4">Critério</th>
                  <th className="text-left p-4">Planilha comum</th>
                  <th className="text-left p-4">Software genérico</th>
                  <th className="text-left p-4">DATVUS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-4">Tempo de implantação</td><td className="p-4">Sem padrão</td><td className="p-4">Demorado</td><td className="p-4 font-semibold text-emerald-700">~1 hora</td></tr>
                <tr className="border-t"><td className="p-4">Fluxo por fase</td><td className="p-4">Manual</td><td className="p-4">Parcial</td><td className="p-4 font-semibold">Automático</td></tr>
                <tr className="border-t"><td className="p-4">Relatório clínico</td><td className="p-4">Não padronizado</td><td className="p-4">Básico</td><td className="p-4 font-semibold">Completo em PDF</td></tr>
                <tr className="border-t"><td className="p-4">Controle de licença</td><td className="p-4">Inexistente</td><td className="p-4">Sim</td><td className="p-4 font-semibold">Por máquina (MAC)</td></tr>
                <tr className="border-t"><td className="p-4">Dashboards</td><td className="p-4">Não</td><td className="p-4">Limitado</td><td className="p-4 font-semibold">Pronto p/ Supabase</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="planos" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-2xl font-bold" data-aos="fade-up">Planos</h2>
            <div className="flex items-center gap-3 text-sm" data-aos="fade-up">
              <span>Mensal</span>
              <button
                id="toggleAnnual"
                onClick={handlePricingToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isAnnualPricing ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span
                  id="toggleDot"
                  className="inline-block h-5 w-5 rounded-full bg-white transition"
                  style={{ transform: isAnnualPricing ? 'translateX(1.25rem)' : 'translateX(0.25rem)' }}
                ></span>
              </button>
              <span>Anual <span className="ml-1 text-emerald-600 font-medium">(-16%)</span></span>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-soft" data-aos="fade-up">
              <div className="text-sm text-slate-500">Essencial</div>
              <div className="mt-2 text-3xl font-bold">
                <span className="price">{prices[79]}</span>
                <span className="text-base font-medium text-slate-500">/{isAnnualPricing ? 'ano' : 'mês'}</span>
              </div>
              <ul className="mt-4 space-y-2 text-slate-600 text-sm">
                <li>1 licença por máquina</li>
                <li>Atualizações menores</li>
                <li>Suporte por e-mail</li>
              </ul>
              <a href="#cta" onClick={handleAnchorClick} className="mt-6 inline-flex px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Começar</a>
            </div>
            <div className="p-6 rounded-2xl border-2 border-brand-600 bg-white shadow-soft" data-aos="fade-up" data-aos-delay="80">
              <div className="text-sm text-slate-500">Profissional</div>
              <div className="mt-2 text-3xl font-bold">
                <span className="price">{prices[149]}</span>
                <span className="text-base font-medium text-slate-500">/{isAnnualPricing ? 'ano' : 'mês'}</span>
              </div>
              <ul className="mt-4 space-y-2 text-slate-600 text-sm">
                <li>2 licenças</li>
                <li>Suporte priorizado</li>
                <li>1 ajuste/ano</li>
              </ul>
              <a href="#cta" onClick={handleAnchorClick} className="mt-6 inline-flex px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Assinar</a>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-soft" data-aos="fade-up" data-aos-delay="160">
              <div className="text-sm text-slate-500">Clínica</div>
              <div className="mt-2 text-3xl font-bold">
                <span className="price">{prices[349]}</span>
                <span className="text-base font-medium text-slate-500">/{isAnnualPricing ? 'ano' : 'mês'}</span>
              </div>
              <ul className="mt-4 space-y-2 text-slate-600 text-sm">
                <li>5 licenças</li>
                <li>Onboarding guiado</li>
                <li>2 ajustes/ano</li>
              </ul>
              <a href="#cta" onClick={handleAnchorClick} className="mt-6 inline-flex px-4 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Falar com vendas</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold" data-aos="fade-up">Perguntas frequentes</h2>
          <div className="mt-6 space-y-4">
            <details className="p-4 rounded-xl bg-white border border-slate-200" data-aos="fade-up">
              <summary className="cursor-pointer font-medium">Quais são os requisitos?</summary>
              <p className="mt-2 text-slate-600">Excel 2013 ou superior em Windows. Recomendado Excel 365 atualizado.</p>
            </details>
            <details className="p-4 rounded-xl bg-white border border-slate-200" data-aos="fade-up">
              <summary className="cursor-pointer font-medium">Como funciona a licença?</summary>
              <p className="mt-2 text-slate-600">Ativação por máquina com base no endereço MAC. Trocas mediante solicitação.</p>
            </details>
            <details className="p-4 rounded-xl bg-white border border-slate-200" data-aos="fade-up">
              <summary className="cursor-pointer font-medium">Posso ver dashboards online?</summary>
              <p className="mt-2 text-slate-600">Sim. O DATVUS pode sincronizar dados com Supabase para exibir métricas na web.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="cta" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-extrabold" data-aos="zoom-in">Veja a demo e implante em 1 hora</h2>
          <p className="mt-3 text-slate-600" data-aos="zoom-in" data-aos-delay="60">Ganhe tempo nas rotinas de joelho e entregue relatórios profissionais.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3" data-aos="zoom-in" data-aos-delay="120">
            <a href="https://www.youtube.com/watch?v=SEU_VIDEO_DEMO" className="px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700">Assistir demo</a>
            <a href="https://wa.me/5599999999999?text=Quero%20implementar%20o%20DATVUS" className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50">Falar no WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-3">
          <div>© {new Date().getFullYear()} DATVUS. Todos os direitos reservados.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-700">Termos</a>
            <a href="#" className="hover:text-slate-700">Privacidade</a>
          </div>
        </div>
      </footer>

      {lightbox.isOpen && (
        <div id="lightbox" className="fixed inset-0 flex items-center justify-center z-[60]">
          <div className="absolute inset-0 bg-black/70" onClick={closeLightbox}></div>
          <figure className="relative max-w-5xl mx-auto p-4">
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[85vh] w-auto rounded-xl shadow-2xl" />
            <figcaption className="mt-3 text-center text-slate-200 text-sm">{lightbox.alt}</figcaption>
            <button onClick={closeLightbox} aria-label="Fechar" className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow">✕</button>
          </figure>
        </div>
      )}
    </div>
  );
};

export default App;