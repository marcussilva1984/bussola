import { useState, useEffect } from 'react'
import Head from 'next/head'

/* ── Bible chapters ──────────────────────────────────── */
const CHAPTERS = {
  1: {
    title: 'Capítulo 1 — O Verbo',
    verses: [
      [1, 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'],
      [2, 'Ele estava no princípio com Deus.'],
      [3, 'Todas as coisas foram feitas por ele, e sem ele nada foi feito do que foi feito.'],
      [4, 'Nele estava a vida, e a vida era a luz dos homens.'],
      [5, 'E a luz resplandece nas trevas, e as trevas não a compreenderam.'],
      [6, 'Houve um homem enviado por Deus, cujo nome era João.'],
      [7, 'Este veio como testemunha, para que testificasse da luz, para que todos cressem por meio dele.'],
      [8, 'Ele não era a luz, mas veio para que testificasse da luz.'],
      [9, 'Havia a luz verdadeira, que ilumina todo homem que vem ao mundo.'],
      [10, 'Ele estava no mundo, e o mundo foi feito por ele, e o mundo não o conheceu.'],
      [11, 'Veio para o que era seu, e os seus não o receberam.'],
      [12, 'Mas a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome.'],
      [13, 'Os quais não nasceram do sangue, nem da vontade da carne, nem da vontade do homem, mas de Deus.'],
      [14, 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória, glória como do unigênito do Pai, cheio de graça e de verdade.'],
      [15, 'João testificou dele, e clamou, dizendo: Este era aquele de quem eu dizia: O que vem depois de mim é antes de mim, porque era primeiro do que eu.'],
      [16, 'Porque da sua plenitude todos nós recebemos, e graça sobre graça.'],
      [17, 'Porque a lei foi dada por Moisés, mas a graça e a verdade vieram por Jesus Cristo.'],
      [18, 'Ninguém jamais viu a Deus; o unigênito Filho, que está no seio do Pai, esse o declarou.'],
    ],
  },
  2: {
    title: 'Capítulo 2 — As Bodas de Caná',
    verses: [
      [1, 'E ao terceiro dia fez-se uma boda em Caná da Galileia, e estava ali a mãe de Jesus.'],
      [2, 'E Jesus foi também convidado, com os seus discípulos, para a boda.'],
      [3, 'E, quando o vinho acabou, a mãe de Jesus disse-lhe: Eles não têm vinho.'],
      [4, 'E Jesus disse-lhe: Mulher, que tenho eu contigo? A minha hora ainda não é chegada.'],
      [5, 'Disse sua mãe aos serventes: Fazei tudo o que ele vos disser.'],
      [7, 'Jesus disse-lhes: Enchei as talhas de água. E encheram-nas até em cima.'],
      [9, 'Quando, pois, o mestre-sala provou a água feita vinho, não sabia de onde vinha, mas os serventes, que tinham tirado a água, o sabiam.'],
      [10, 'E disse-lhe: Todos os homens põem primeiro o bom vinho, e, quando já estão satisfeitos, então o inferior; mas tu guardaste até agora o bom vinho.'],
      [11, 'Este princípio dos sinais fez Jesus em Caná da Galileia, e manifestou a sua glória, e os seus discípulos creram nele.'],
    ],
  },
  3: {
    title: 'Capítulo 3 — Nicodemos',
    verses: [
      [1, 'Havia, entre os fariseus, um homem chamado Nicodemos, príncipe dos judeus.'],
      [2, 'Este foi ter com Jesus de noite, e disse-lhe: Rabi, bem sabemos que és Mestre, vindo de Deus.'],
      [3, 'Jesus respondeu, e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo não pode ver o reino de Deus.'],
      [5, 'Jesus respondeu: Na verdade, na verdade te digo que aquele que não nascer da água e do Espírito não pode entrar no reino de Deus.'],
      [6, 'O que é nascido da carne é carne, e o que é nascido do Espírito é espírito.'],
      [16, 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'],
      [17, 'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.'],
    ],
  },
}

const TOTAL_CHAPTERS = 21

/* ── Meus comentários por capítulo de João ──────────── */
const BIBLE_NOTES = {
  1:  'João começa com "o Verbo" — não com nascimento, milagre ou lei. Com a palavra. Preste atenção no versículo 5: "a luz resplandece nas trevas, e as trevas não a compreenderam." João está dizendo que a resistência não vence a luz. Ela só não entende. Leia isso como um posicionamento: de que lado você quer estar?',
  2:  'As bodas de Caná não são sobre vinho. São sobre o momento certo. A mãe de Jesus insiste, ele resiste, e então age — completamente, em silêncio, sem anúncio. O mestre-sala não sabe de onde veio o milagre. Pense em transformações que aconteceram em você sem que ninguém visse o processo.',
  3:  '"Nascer de novo" — Nicodemos fica preso na literalidade e não entende. João 3:16 é o versículo mais citado do Novo Testamento. Leia devagar, sem pressa de confirmar o que já sabe. E note: Jesus não condena, João deixa claro isso duas vezes.',
  4:  'A mulher samaritana — Jesus fala com quem os outros ignoravam. Ela tem cinco maridos anteriores, é do povo errado, do lugar errado. E é para ela que Jesus faz a revelação mais direta de quem ele é em todo o evangelho. O excluído como receptor da mensagem central.',
  5:  'O paralítico esperava há 38 anos. Jesus pergunta: "Queres ficar curado?" — uma pergunta que parece óbvia mas não é. Algumas pessoas se acomodam na condição que as define. A cura exige querer sair dela. Onde você está esperando há anos sem mover um passo?',
  6:  'Alimentação dos 5.000, caminhada sobre as águas, e o discurso do pão da vida. Capítulo longo, cheio de simbolismo. Fique com João 6:37: "Aquele que vem a mim, de modo nenhum o lançarei fora." Uma das frases de maior acolhimento do livro.',
  7:  'Jesus divide a multidão. Metade acha que é bom, metade que engana. Ele não tenta convencer ninguém — continua ensinando. Pense nisso: você costuma parar de agir quando as opiniões se dividem? João está mostrando que a divisão de opiniões é o ambiente natural de quem age com convicção.',
  8:  '"A verdade vos libertará" — mas o contexto importa. Jesus está falando com quem permanece na sua palavra. A liberdade aqui é consequência de permanência, não de revelação instantânea. E logo depois aparece a mulher apanhada em adultério: "Quem de vós está sem pecado?" Silêncio total.',
  9:  'O cego de nascença — os discípulos perguntam quem pecou para ele nascer cego. Jesus descarta a lógica de punição. Às vezes a dificuldade não é punição, nem merecimento. É só o lugar onde algo vai ser revelado. Mude a pergunta de "por que isso aconteceu comigo" para "o que isso pode mostrar".',
  10: '"Eu sou o bom pastor." João 10:10 é a frase-chave: "Eu vim para que tenham vida e a tenham em abundância." Não sobrevivência — abundância. E o pastor conhece cada ovelha pelo nome. Individualidade importa aqui, não só o coletivo.',
  11: 'Lázaro. "Jesus chorou" — versículo mais curto da Bíblia, e um dos mais pesados. Ele sabia que ia ressuscitar Lázaro. E mesmo assim chorou. Deus chora com você antes de agir. Isso muda a interpretação de tudo.',
  12: 'A entrada em Jerusalém — o ponto em que a trajetória se torna irreversível. Maria unge os pés de Jesus com perfume caríssimo; Judas reclama do desperdício. Duas formas de ver o mesmo ato. Com que olho você costuma olhar os gestos dos outros?',
  13: 'A lavagem dos pés — o maior lava o menor. Pedro resiste: "Nunca me lavarás os pés." Jesus responde: "Se eu não te lavar, não terás parte comigo." Receber ajuda com humildade é tão difícil quanto dar. E nesta noite começa a traição.',
  14: '"Não se turbe o vosso coração" — João 14 é o capítulo da consolação. "Na casa de meu Pai há muitas moradas." E a promessa do Espírito Consolador. Leia isso devagar se hoje estiver pesado. Este capítulo foi escrito para noites difíceis.',
  15: 'A videira e os ramos — "sem mim nada podeis fazer." Não é fraqueza, é ecologia. O ramo não produz por si mesmo, precisa estar conectado. E a primeira condição da conexão é permanecer. Não fazer grandes coisas — permanecer. O que você faz para permanecer conectado ao que te sustenta?',
  16: 'Jesus anuncia a partida e os discípulos ficam confusos e tristes. Ele diz: "É melhor para vós que eu vá." A perda de uma presença familiar pode abrir espaço para algo maior. Às vezes o que parece abandono é condição para a próxima fase.',
  17: 'A oração sacerdotal — Jesus ora por você. Literalmente. "Não rogo somente por estes, mas também por todos os que hão de crer em mim por meio da sua palavra." Este capítulo é uma oração, não um ensinamento. Leia como quem está sendo orado, não como quem estuda.',
  18: 'A prisão e os julgamentos. Pilatos pergunta: "Que é a verdade?" — e não espera a resposta. Talvez uma das cenas mais tragicamente humanas da Bíblia. A pergunta certa feita pela pessoa errada na hora errada. Você já fez isso?',
  19: 'A crucificação. Capítulo pesado, não amenize. João registra detalhes que os outros evangelhos não registram. "Está consumado" — não é derrota, é conclusão. Uma obra sendo finalizada. O sofrimento aqui tem finalidade, não é acidente.',
  20: 'A ressurreição. Maria Madalena é a primeira testemunha — mais uma vez, o excluído no centro da cena. E Tomé, que precisava tocar para crer: Jesus não o envergonha. Aparece e diz "coloca o dedo aqui." A fé que exige evidência não é fraqueza.',
  21: 'O último capítulo — Pedro é restaurado, três vezes. Uma para cada negação. Jesus não exige que Pedro explique nem se justifique. Só pergunta: "Você me ama?" Três vezes. A restauração tem o mesmo número de passos que a queda. Termine o livro aqui e pergunte: o que precisa de três perguntas na sua vida?',
}

/* ── Meus comentários por bloco do Frankl ───────────── */
const FRANKL_NOTES = [
  { pages: 'pp. 4–7', tema: 'Prefácios', nota: 'Gordon Allport escreve no prefácio que Frankl encontrou sentido sem futuro garantido. Leia isso como uma pergunta: você precisa de garantias para começar? O próprio Frankl diz que o livro quase não foi publicado — ele quis lançar anonimamente. Um homem que sobreviveu ao impossível ainda duvidava se alguém ia se importar com o que ele tinha a dizer.' },
  { pages: 'pp. 8–12', tema: 'Chegada a Auschwitz', nota: 'A primeira seleção na plataforma — direita ou esquerda, vida ou câmara de gás — e a maioria não sabia o que significava. Frankl descreve o "estado de choque após o impacto inicial" como uma espécie de entorpecimento protetor. Preste atenção: ele não está descrevendo fraqueza. Está descrevendo sobrevivência. O que você entorpece para continuar funcionando?' },
  { pages: 'pp. 13–17', tema: 'A primeira noite', nota: 'Frankl carregava um manuscrito científico escondido — seu trabalho de vida. É tirado dele na primeira noite. E ele decide: "Em vez do manuscrito, agora preciso viver o que escrevi." Essa inversão é central. Quando você perde o que construiu, o que fica? A ideia ou a experiência vivida?' },
  { pages: 'pp. 18–22', tema: 'Apatia como proteção', nota: 'A apatia é descrita como mecanismo de sobrevivência — não fraqueza, não desistência. O sistema nervoso que desliga para não enlouquecer. Frankl observa os companheiros perderem a capacidade de se indignar. Pense nisso na sua história: há momentos em que a anestesia emocional foi o que te manteve de pé?' },
  { pages: 'pp. 23–27', tema: 'Arte e humor no campo', nota: 'Humor e arte em Auschwitz. Isso parece impossível, mas Frankl documenta com precisão. O humor como "arma da alma para a autopreservação". Ele propõe ao amigo que inventem uma piada por dia. Mesmo ali. O que isso diz sobre a natureza humana? E sobre a sua?' },
  { pages: 'pp. 28–37', tema: 'Liberdade interior', nota: 'A frase mais importante do livro está neste bloco: "A tudo se pode tirar ao homem, menos a última das liberdades humanas — a escolha da atitude pessoal perante um conjunto de circunstâncias." Frankl não está sendo idealista. Ele estava no lugar mais brutal do século XX quando chegou a essa conclusão. Leia de novo. Mais devagar.' },
  { pages: 'pp. 38–47', tema: 'Sentido e libertação', nota: 'Frankl imagina a esposa enquanto marcha no gelo — e descobre que o amor é uma das formas mais puras de sentido, independente da presença física. "O amor é a meta última e a mais elevada a que o homem pode aspirar." A libertação quando chega é quase decepcionante — o corpo não sabe como reagir à liberdade. Você já teve isso?' },
  { pages: 'pp. 48–57', tema: 'Logoterapia', nota: 'Frankl propõe que a busca de sentido é a motivação primária do ser humano — antes do prazer (Freud) ou do poder (Adler). E que o "vácuo existencial" — o tédio, a falta de direção — é a doença do século. Isso foi escrito em 1946. Olha onde estamos agora. Você consegue nomear qual é o seu sentido hoje? Não o propósito de vida final — o sentido desta semana.' },
  { pages: 'pp. 58–68', tema: 'Otimismo trágico', nota: 'O último conceito: otimismo não apesar do sofrimento, mas através dele. Frankl não diz que tudo vai ficar bem — diz que mesmo quando não fica, ainda é possível escolher como reagir. "Transformar o sofrimento em realização humana." Encerre o livro perguntando: o que o sofrimento dos últimos 12 anos transformou em você que não existia antes?' },
]

/* ── Daily quotes ───────────────────────────────────── */
const QUOTES = [
  ['Um dia de cada vez.', 'Alcoólicos Anônimos'],
  ['Não posso mudar o vento, mas posso ajustar as velas.', 'Aristóteles'],
  ['A força não vem de ganhar. Vem de lutar, cair e recomeçar.', 'Desconhecido'],
  ['A disciplina é a ponte entre objetivos e realizações.', 'Jim Rohn'],
  ['Cada manhã é uma nova chance de ser melhor do que ontem.', 'Desconhecido'],
  ['Não é a carga que te quebra, é a forma como a carregas.', 'Lou Holtz'],
  ['O homem que move montanhas começa carregando pequenas pedras.', 'Confúcio'],
  ['A última das liberdades humanas é a escolha da própria atitude.', 'Viktor Frankl'],
  ['Seja a mudança que você quer ver no mundo.', 'Mahatma Gandhi'],
  ['Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.', 'Zig Ziglar'],
  ['Nossas maiores glórias não estão em nunca ter caído, mas em nos levantarmos toda vez que caímos.', 'Confúcio'],
  ['A serenidade não é liberdade das tempestades, mas paz dentro delas.', 'Desconhecido'],
  ['Faça o que puder, com o que tem, onde você está.', 'Theodore Roosevelt'],
  ['A fé é dar o primeiro passo mesmo quando não se vê toda a escada.', 'Martin Luther King Jr.'],
  ['Você é mais corajoso do que acredita, mais forte do que parece.', 'A. A. Milne'],
  ['Deus não dará mais do que você pode suportar.', '1 Coríntios 10:13'],
  ['O homem que não desiste nunca pode perder.', 'Nelson Mandela'],
  ['Recomeçar é a maior prova de coragem.', 'Desconhecido'],
  ['Cada dia é uma segunda chance.', 'Desconhecido'],
  ['A vida tem sentido sempre — até o último momento.', 'Viktor Frankl'],
  ['Você sobreviveu a 100% dos seus piores dias.', 'Desconhecido'],
  ['O primeiro passo é o mais difícil. Mas é o único que importa agora.', 'Desconhecido'],
  ['Ninguém muda o mundo sem primeiro mudar a si mesmo.', 'Desconhecido'],
  ['Paz não é ausência de conflito, mas a capacidade de lidar com ele.', 'Desconhecido'],
  ['Que a serenidade me permita aceitar o que não posso mudar.', 'AA — Oração da Serenidade'],
  ['Não olhe para o relógio. Faça o que ele faz — continue.', 'Sam Levenson'],
  ['A jornada de mil milhas começa com um único passo.', 'Lao Tzu'],
  ['O sofrimento que não te mata te fortalece — se você permitir.', 'Nietzsche'],
  ['Faça o que você pode, e entregue o resto.', 'Desconhecido'],
  ['Amanhã começa hoje.', 'Desconhecido'],
]

/* ── Helpers ────────────────────────────────────────── */
function getDayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now - start) / 86400000)
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia.'
  if (h < 18) return 'Boa tarde.'
  return 'Boa noite.'
}

function getDateStr() {
  const now = new Date()
  const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`
}

/* ════════════════════════════════════════════════════ */
function todayKey() {
  const d = new Date()
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}
function displayDate(key) {
  const [y,m,d] = key.split('-')
  const ms = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  return d + '/' + ms[parseInt(m)-1] + '/' + y
}

export default function Home() {
  const [tab, setTab] = useState('hoje')
  const [chapter, setChapter] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [bibliaReflect, setBibliaReflect] = useState({})
  const [leituraReflect, setLeituraReflect] = useState({})

  useEffect(() => {
    setMounted(true)
    try {
      const t = localStorage.getItem('bussula-tab')
      const c = parseInt(localStorage.getItem('bussula-chapter'))
      if (t) setTab(t)
      if (c >= 1 && c <= TOTAL_CHAPTERS) setChapter(c)
      const br = JSON.parse(localStorage.getItem('bussula-reflect-biblia') || '{}')
      const lr = JSON.parse(localStorage.getItem('bussula-reflect-leitura') || '{}')
      setBibliaReflect(br)
      setLeituraReflect(lr)
    } catch {}
  }, [])

  function saveReflect(key, val, storeKey, setter) {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || '{}')
      saved[key] = val
      const keys = Object.keys(saved).sort().reverse().slice(0,60)
      const trimmed = {}
      keys.forEach(k => { trimmed[k] = saved[k] })
      localStorage.setItem(storeKey, JSON.stringify(trimmed))
      setter(trimmed)
    } catch {}
  }

  function goTab(t) {
    setTab(t)
    try { localStorage.setItem('bussula-tab', t) } catch {}
  }

  function goChapter(dir) {
    const next = Math.max(1, Math.min(TOTAL_CHAPTERS, chapter + dir))
    setChapter(next)
    try { localStorage.setItem('bussula-chapter', next) } catch {}
  }

  const quote = QUOTES[getDayOfYear() % QUOTES.length]
  const ch = CHAPTERS[chapter]

  return (
    <>
      <Head>
        <title>Bússola</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#090910" />
      </Head>

      <div className="app">
        {/* ── HEADER ── */}
        <header className="header">
          <div className="header-left">
            <span className="header-title">✦ Bússola</span>
            <span className="header-sub">corpo · mente · espírito</span>
          </div>
          {mounted && <span className="header-date">{getDateStr()}</span>}
        </header>

        {/* ── CONTENT ── */}
        <main className="content">

          {/* HOJE */}
          {tab === 'hoje' && (
            <section className="panel">
              <div className="today-greeting">
                <div className="today-day">{mounted ? getGreeting() : 'Bom dia.'}</div>
                <div className="today-sub">O que o dia de hoje pede de você.</div>
              </div>

              <div className="card">
                <div className="pillar-item" onClick={() => goTab('biblia')}>
                  <div className="pillar-icon teal">📖</div>
                  <div className="pillar-body">
                    <div className="pillar-name teal">Bíblia</div>
                    <div className="pillar-desc">João, Capítulo {chapter} — {ch ? ch.title.split('—')[1]?.trim() : 'Evangelho'}</div>
                    <div className="pillar-sub">30 minutos · Semana 1 de 2</div>
                  </div>
                  <div className="pillar-arrow">›</div>
                </div>
                <div className="pillar-item" onClick={() => goTab('leitura')}>
                  <div className="pillar-icon blue">📚</div>
                  <div className="pillar-body">
                    <div className="pillar-name blue">Leitura</div>
                    <div className="pillar-desc">Em Busca de Sentido — Prefácio</div>
                    <div className="pillar-sub">30 minutos · Viktor Frankl</div>
                  </div>
                  <div className="pillar-arrow">›</div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon gold">🏃</div>
                  <div className="pillar-body">
                    <div className="pillar-name gold">Corpo</div>
                    <div className="pillar-desc">Caminhar, correr ou alongar</div>
                    <div className="pillar-sub">No ritmo que o corpo pede hoje</div>
                  </div>
                </div>
                <div className="pillar-item" onClick={() => goTab('oracao')}>
                  <div className="pillar-icon rose">🙏</div>
                  <div className="pillar-body">
                    <div className="pillar-name rose">Oração</div>
                    <div className="pillar-desc">Manhã e noite — dois minutos cada</div>
                    <div className="pillar-sub">Para pedir, agradecer ou só estar</div>
                  </div>
                  <div className="pillar-arrow">›</div>
                </div>
              </div>

              <div className="verse-card">
                <div className="verse-text">&ldquo;No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.&rdquo;</div>
                <div className="verse-ref">João 1:1</div>
              </div>

              {quote && (
                <div className="card card-gold quote-of-day">
                  <div className="card-label gold">Frase do Dia</div>
                  <div className="daily-quote">&ldquo;{quote[0]}&rdquo;</div>
                  <div className="daily-author">— {quote[1]}</div>
                </div>
              )}
            </section>
          )}

          {/* BÍBLIA */}
          {tab === 'biblia' && (
            <section className="panel">
              <div className="section-eyebrow teal-text">Palavra do Dia</div>
              <div className="section-title">Evangelho de João</div>

              <div className="chapter-nav-row">
                <div className="chapter-info">Cap. {chapter} de {TOTAL_CHAPTERS}</div>
                <div style={{display:'flex',gap:'8px'}}>
                  <button className="nav-btn" style={{borderRadius:'10px',width:'auto',padding:'0 14px',fontSize:'.8rem',fontWeight:600}} onClick={() => goChapter(-1)} disabled={chapter === 1}>‹ Anterior</button>
                  <button className="nav-btn" style={{borderRadius:'10px',width:'auto',padding:'0 14px',fontSize:'.8rem',fontWeight:600}} onClick={() => goChapter(1)} disabled={chapter === TOTAL_CHAPTERS}>Próximo ›</button>
                </div>
              </div>

              <div className="reading-body">
                {ch ? (
                  <>
                    <div className="chapter-title">{ch.title}</div>
                    {ch.verses.map(([num, txt]) => (
                      <div key={num} className="verse-line">
                        <span className="verse-num">{num}</span>
                        <span className="verse-body">{txt}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="chapter-title">Capítulo {chapter}</div>
                    <p style={{color:'var(--fg-muted)',fontSize:'.88rem',lineHeight:'1.7'}}>
                      O texto completo deste capítulo está nos links abaixo. Use o YouVersion ou a BíbliaOnline na versão que preferir.
                    </p>
                  </>
                )}
              </div>

              <div className="progress-wrap">
                <div className="progress-label">
                  <span>Progresso no Evangelho</span>
                  <span>Cap. {chapter} / {TOTAL_CHAPTERS}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill teal" style={{width: `${(chapter/TOTAL_CHAPTERS*100).toFixed(1)}%`}} />
                </div>
              </div>

              <a className="reading-link" href="https://www.bibliaonline.com.br/acf/jo/1" target="_blank" rel="noopener noreferrer">
                <span className="reading-link-icon">🌐</span>
                <span className="reading-link-text">Abrir Bíblia completa — BíbliaOnline</span>
                <span className="reading-link-arr">↗</span>
              </a>
              <a className="reading-link" href="https://www.bible.com/pt/bible/1608/JHN.1.ARC" target="_blank" rel="noopener noreferrer">
                <span className="reading-link-icon">📱</span>
                <span className="reading-link-text">YouVersion — app de bíblia (planos de leitura)</span>
                <span className="reading-link-arr">↗</span>
              </a>

              <div className="card" style={{marginTop:'8px'}}>
                <div className="card-label teal">Plano de Leitura</div>
                <table className="plan-table">
                  <thead><tr><th>Período</th><th>Ritmo</th><th>Capítulos</th></tr></thead>
                  <tbody>
                    <tr className="now"><td>Semanas 1–2</td><td>30 min/dia</td><td>João 1–14</td></tr>
                    <tr><td>Semanas 3–4</td><td>40 min/dia</td><td>João 15–21</td></tr>
                    <tr><td>Semanas 5–6</td><td>50 min/dia</td><td>Marcos 1–8</td></tr>
                    <tr><td>Mês 2+</td><td>1h/dia</td><td>Marcos 9–16 e além</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Reflexão Bíblia */}
              {mounted && (
                <div className="card" style={{borderLeft:'3px solid var(--teal)',marginBottom:'14px'}}>
                  <div className="card-label teal">Minha Reflexão — {displayDate(todayKey())}</div>
                  <div style={{fontSize:'.8rem',color:'var(--fg-muted)',marginBottom:'10px'}}>O que esse capítulo te disse? O que ficou? Escreva livremente — só para você.</div>
                  <textarea
                    defaultValue={bibliaReflect[todayKey()] || ''}
                    placeholder="Escreva aqui sua reflexão do dia…"
                    onChange={e => saveReflect(todayKey(), e.target.value, 'bussula-reflect-biblia', setBibliaReflect)}
                    style={{width:'100%',minHeight:'130px',background:'var(--surface2)',border:'1px solid var(--border2)',borderRadius:'10px',color:'var(--fg)',fontFamily:"'Lora',Georgia,serif",fontSize:'.95rem',lineHeight:'1.75',padding:'14px',resize:'vertical',outline:'none'}}
                  />
                  {Object.keys(bibliaReflect).filter(k => k !== todayKey() && bibliaReflect[k].trim()).sort().reverse().slice(0,5).map(k => (
                    <div key={k} style={{marginTop:'10px',padding:'12px',background:'var(--surface2)',borderRadius:'10px',borderLeft:'2px solid var(--teal)'}}>
                      <div style={{fontSize:'.68rem',color:'var(--fg-dim)',marginBottom:'6px'}}>{displayDate(k)}</div>
                      <div style={{fontSize:'.88rem',color:'var(--fg-muted)',lineHeight:'1.6'}}>{bibliaReflect[k]}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* LEITURA */}
          {tab === 'leitura' && (
            <section className="panel">
              <div className="section-eyebrow blue-text">Leitura Diária</div>
              <div className="section-title">Em Busca de Sentido</div>

              <div className="book-header">
                <div className="book-cover">📘</div>
                <div className="book-info">
                  <div className="book-title">Em Busca de Sentido</div>
                  <div className="book-author">Viktor E. Frankl · 1946</div>
                  <div className="progress-wrap" style={{marginTop:'4px'}}>
                    <div className="progress-label"><span>Progresso</span><span>Início</span></div>
                    <div className="progress-bar"><div className="progress-fill blue" style={{width:'2%'}} /></div>
                  </div>
                </div>
              </div>

              <div className="quote-block">
                <div className="quote-text">&ldquo;A última das liberdades humanas é a escolha da própria atitude diante de qualquer conjunto de circunstâncias — a escolha do próprio caminho.&rdquo;</div>
                <div className="quote-author">— Viktor E. Frankl</div>
              </div>

              <a className="book-link" href="/frankl.pdf" target="_blank" rel="noopener noreferrer">
                <span style={{fontSize:'1.1rem'}}>📄</span>
                <span style={{flex:1}}>Abrir o livro em PDF — Em Busca de Sentido</span>
                <span style={{color:'var(--fg-dim)',fontSize:'0.8rem'}}>↗</span>
              </a>

              {/* Reflexão Leitura */}
              {mounted && (
                <div className="card" style={{borderLeft:'3px solid var(--blue)',marginTop:'14px'}}>
                  <div className="card-label blue">Minha Reflexão — {displayDate(todayKey())}</div>
                  <div style={{fontSize:'.8rem',color:'var(--fg-muted)',marginBottom:'10px'}}>O que esse trecho te tocou? Que ideia você leva para hoje?</div>
                  <textarea
                    defaultValue={leituraReflect[todayKey()] || ''}
                    placeholder="Escreva aqui sua reflexão da leitura…"
                    onChange={e => saveReflect(todayKey(), e.target.value, 'bussula-reflect-leitura', setLeituraReflect)}
                    style={{width:'100%',minHeight:'120px',background:'var(--surface2)',border:'1px solid var(--border2)',borderRadius:'10px',color:'var(--fg)',fontFamily:"'Lora',Georgia,serif",fontSize:'.95rem',lineHeight:'1.75',padding:'14px',resize:'vertical',outline:'none'}}
                  />
                  {Object.keys(leituraReflect).filter(k => k !== todayKey() && leituraReflect[k].trim()).sort().reverse().slice(0,5).map(k => (
                    <div key={k} style={{marginTop:'10px',padding:'12px',background:'var(--surface2)',borderRadius:'10px',borderLeft:'2px solid var(--blue)'}}>
                      <div style={{fontSize:'.68rem',color:'var(--fg-dim)',marginBottom:'6px'}}>{displayDate(k)}</div>
                      <div style={{fontSize:'.88rem',color:'var(--fg-muted)',lineHeight:'1.6'}}>{leituraReflect[k]}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* INSPIRAÇÃO */}
          {tab === 'inspiracao' && (
            <section className="panel">
              <div className="section-eyebrow" style={{color:'var(--violet)'}}>Sua bússola</div>
              <div className="section-title">Inspiração</div>

              <div className="card" style={{borderLeft:'3px solid var(--violet)',marginBottom:'18px'}}>
                <div className="card-label" style={{color:'var(--violet)'}}>O que fazer</div>
                {[
                  {icon:'🏃', title:'Correr ou caminhar', desc:'30–45 min, qualquer horário. Movimento muda o estado mental antes do café da manhã.'},
                  {icon:'🤝', title:'Reunião do AA', desc:'Presença diária, mesmo quando está bem. A comunidade é o antídoto para o isolamento.'},
                  {icon:'🙏', title:'Meditação ou silêncio', desc:'10–15 min de manhã. Pode ser só sentar, respirar, e não fazer nada. Isso já é prática.'},
                  {icon:'🤲', title:'Trabalho voluntário', desc:'Ajudar outros é um dos pilares da recuperação. Hospitais, NA, AA, CDRJ — há vários caminhos.'},
                  {icon:'🎓', title:'Voltar à faculdade em 2025', desc:'Psicologia ou dependência química — o mestrado começa com uma matrícula. Pesquise uma disciplina por semana.'},
                  {icon:'📔', title:'Diário de gratidão', desc:'3 coisas boas antes de dormir. Treina o cérebro para notar o que funcionou, não só o que falhou.'},
                ].map((item, i) => (
                  <div key={i} className="inspire-item" style={{marginTop: i===0?'4px':'12px'}}>
                    <span className="inspire-icon">{item.icon}</span>
                    <div>
                      <div className="inspire-title">{item.title}</div>
                      <div className="inspire-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{borderLeft:'3px solid var(--violet)'}}>
                <div className="card-label" style={{color:'var(--violet)'}}>O que ler</div>
                {[
                  {n:'01', title:'Em Busca de Sentido', author:'Viktor E. Frankl', why:'Você já está lendo. O livro certo na hora certa.'},
                  {n:'02', title:'As 12 Regras para a Vida', author:'Jordan B. Peterson', why:'Ordem prática para o caos pessoal — escrito por um psicólogo clínico, sem floreios.'},
                  {n:'03', title:'O Monge e o Executivo', author:'James C. Hunter', why:'Liderança de si mesmo antes de liderar outros. Leitura rápida, impacto duradouro.'},
                  {n:'04', title:'Os Quatro Compromissos', author:'Don Miguel Ruiz', why:'Sabedoria tolteca condensada em quatro princípios. Curto e profundo.'},
                  {n:'05', title:'Alcoólicos Anônimos — O Livro Grande', author:'Bill Wilson et al.', why:'O livro base do AA. Releio sempre que necessário — não precisa ser linear.'},
                  {n:'06', title:'O Poder do Hábito', author:'Charles Duhigg', why:'Entender como hábitos se formam ajuda a construir os certos e quebrar os errados.'},
                ].map((book, i) => (
                  <div key={i} className="booklist-item">
                    <div className="booklist-num">{book.n}</div>
                    <div>
                      <div className="booklist-title">{book.title}</div>
                      <div className="booklist-author">{book.author}</div>
                      <div className="booklist-why">{book.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ORAÇÃO */}
          {tab === 'oracao' && (
            <section className="panel">
              <div className="section-eyebrow rose-text">Dois minutos, duas vezes</div>
              <div className="section-title">Orações do Dia</div>

              {[
                {
                  moment: 'Manhã — Para começar',
                  title: 'Oração da Serenidade',
                  text: 'Deus, concedei-me a serenidade\npara aceitar as coisas que não posso mudar,\ncoragem para mudar as que posso,\ne sabedoria para distinguir umas das outras.',
                  source: 'Alcoólicos Anônimos — atribuída a Reinhold Niebuhr',
                },
                {
                  moment: 'Durante o Dia — Quando o peso apertar',
                  title: 'Oração de Bill W.',
                  text: 'Que eu faça apenas Tua vontade hoje.\nAfasta de mim o engano para que eu possa\nfazer melhores escolhas.',
                  source: 'Bill Wilson, co-fundador do AA — Livro Grande',
                },
                {
                  moment: 'Noite — Para encerrar',
                  title: 'Gratidão e Entrega',
                  text: 'Obrigado, Deus, pelo dia de hoje.\nPelo que aprendi, pelo que errei,\npelo que ainda posso tentar amanhã.\n\nColoco nas Tuas mãos o que não está\nno meu controle.\nQue eu durma em paz.',
                  source: 'Oração não-denominacional',
                },
                {
                  moment: 'Uma oração mais antiga',
                  title: 'São Francisco de Assis',
                  text: 'Senhor, fazei-me instrumento da Vossa paz.\nOnde houver ódio, que eu leve o amor.\nOnde houver ofensa, o perdão.\nOnde houver dúvida, a fé.\nOnde houver desespero, a esperança.\nOnde houver trevas, a luz.\nOnde houver tristeza, a alegria.',
                  source: 'Atribuída a São Francisco de Assis · séc. XIII',
                },
              ].map((p, i) => (
                <div key={i} className="prayer-card">
                  <div className="prayer-moment">{p.moment}</div>
                  <div className="prayer-title">{p.title}</div>
                  <div className="prayer-text">{p.text}</div>
                  <div className="prayer-source">{p.source}</div>
                </div>
              ))}
            </section>
          )}
        </main>

        {/* ── TAB NAV ── */}
        <nav className="tab-nav">
          {[
            { id: 'hoje',       icon: '◈', label: 'Hoje' },
            { id: 'biblia',     icon: '✦', label: 'Bíblia' },
            { id: 'leitura',    icon: '◎', label: 'Leitura' },
            { id: 'oracao',     icon: '◉', label: 'Oração' },
            { id: 'inspiracao', icon: '✧', label: 'Inspiração' },
          ].map(t => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active ' + t.id : ''}`}
              onClick={() => goTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .app {
          display: flex; flex-direction: column; height: 100vh;
          background: var(--bg); color: var(--fg);
        }

        /* HEADER */
        .header {
          position: fixed; top: 0; left: 0; right: 0;
          height: var(--header-h);
          background: rgba(9,9,16,.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px; z-index: 10;
        }
        .header-left { display: flex; flex-direction: column; gap: 2px; }
        .header-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem; letter-spacing: 0.08em;
        }
        .header-sub { font-size: 0.65rem; color: var(--fg-dim); letter-spacing: 0.06em; text-transform: uppercase; }
        .header-date { font-size: 0.72rem; color: var(--fg-muted); }

        /* CONTENT */
        .content {
          margin-top: var(--header-h);
          margin-bottom: var(--tab-h);
          overflow-y: auto; flex: 1;
        }
        .panel {
          padding: 28px 20px 40px;
          animation: fadeIn 0.22s ease;
        }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

        /* TAB NAV */
        .tab-nav {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: var(--tab-h);
          background: rgba(13,13,22,.96);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--border);
          display: flex;
        }
        .tab-btn {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          border: none; background: none; cursor: pointer;
          color: var(--fg-dim);
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase;
          transition: color 0.18s; padding-top: 10px;
        }
        .tab-icon { font-size: 1.2rem; transition: transform 0.2s; }
        .tab-btn.active .tab-icon { transform: scale(1.14); }
        .tab-btn.hoje       { color: var(--gold); }
        .tab-btn.biblia     { color: var(--teal); }
        .tab-btn.leitura    { color: var(--blue); }
        .tab-btn.oracao     { color: var(--rose); }
        .tab-btn.inspiracao { color: var(--violet); }

        /* TYPOGRAPHY */
        .section-eyebrow { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 7px; }
        .teal-text { color: var(--teal); }
        .blue-text { color: var(--blue); }
        .rose-text { color: var(--rose); }
        .section-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.75rem; line-height: 1.2; margin-bottom: 24px; }

        /* CARDS */
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 14px; }
        .card-gold { border-left: 3px solid var(--gold); }
        .card-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 7px; }
        .card-label.gold { color: var(--gold); }
        .card-label.teal { color: var(--teal); }
        .card-label.blue { color: var(--blue); }

        /* QUOTE OF DAY */
        .quote-of-day { background: linear-gradient(135deg, rgba(245,176,66,.08), rgba(9,9,16,0)); }
        .daily-quote { font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; line-height: 1.75; color: var(--fg); font-style: italic; margin-bottom: 8px; }
        .daily-author { font-size: 0.72rem; color: var(--fg-muted); }

        /* PILLAR LIST */
        .pillar-item { display: flex; align-items: flex-start; gap: 15px; padding: 16px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: opacity 0.15s; }
        .pillar-item:last-child { border-bottom: none; }
        .pillar-item:hover { opacity: 0.8; }
        .pillar-icon { width: 46px; height: 46px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
        .pillar-icon.teal { background: var(--teal-dim); box-shadow: 0 0 0 1px var(--teal-glow); }
        .pillar-icon.blue { background: var(--blue-dim); box-shadow: 0 0 0 1px var(--blue-glow); }
        .pillar-icon.gold { background: var(--gold-dim); box-shadow: 0 0 0 1px var(--gold-glow); }
        .pillar-icon.rose { background: var(--rose-dim); box-shadow: 0 0 0 1px var(--rose-glow); }
        .pillar-body { flex: 1; min-width: 0; }
        .pillar-name { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; margin-bottom: 2px; }
        .pillar-name.teal { color: var(--teal); }
        .pillar-name.blue { color: var(--blue); }
        .pillar-name.gold { color: var(--gold); }
        .pillar-name.rose { color: var(--rose); }
        .pillar-desc { font-size: 0.92rem; color: var(--fg); line-height: 1.4; }
        .pillar-sub  { font-size: 0.76rem; color: var(--fg-muted); margin-top: 3px; }
        .pillar-arrow { color: var(--fg-dim); font-size: 0.85rem; align-self: center; flex-shrink: 0; }

        /* VERSE CARD */
        .verse-card { background: linear-gradient(135deg, rgba(64,212,180,.07), rgba(9,9,16,0)); border: 1px solid rgba(64,212,180,.22); border-radius: 16px; padding: 22px; margin-bottom: 14px; }
        .verse-text { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; line-height: 1.82; font-style: italic; color: var(--fg); margin-bottom: 10px; }
        .verse-ref { font-size: 0.7rem; color: var(--teal); font-weight: 700; letter-spacing: 0.08em; }

        /* TODAY */
        .today-greeting { margin-bottom: 24px; }
        .today-day { font-family: 'Playfair Display', Georgia, serif; font-size: 2.2rem; line-height: 1.1; margin-bottom: 4px; }
        .today-sub { font-size: 0.84rem; color: var(--fg-muted); }

        /* BIBLE READING */
        .chapter-nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .chapter-info { font-size: 0.82rem; color: var(--fg-muted); }
        .reading-nav { display: flex; gap: 8px; }
        .nav-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border2); background: var(--surface2); color: var(--fg-muted); font-size: 1rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.18s; }
        .nav-btn:hover:not(:disabled) { border-color: var(--teal); color: var(--teal); }
        .nav-btn:disabled { opacity: 0.3; cursor: default; }
        .reading-body { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; margin-bottom: 14px; }
        .chapter-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; color: var(--teal); margin-bottom: 20px; }
        .verse-line { margin-bottom: 2px; }
        .verse-num { font-size: 0.65rem; font-weight: 700; color: var(--teal); vertical-align: super; margin-right: 4px; }
        .verse-body { font-family: 'Lora', Georgia, serif; font-size: 1rem; line-height: 1.88; color: var(--fg); }

        /* LINKS */
        .reading-link, .book-link { display: flex; align-items: center; gap: 10px; padding: 14px 18px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 12px; color: var(--teal); font-size: 0.84rem; font-weight: 500; text-decoration: none; margin-bottom: 10px; transition: border-color 0.18s, background 0.18s; }
        .reading-link:hover { border-color: var(--teal); background: var(--teal-dim); }
        .book-link { color: var(--blue); }
        .book-link:hover { border-color: var(--blue); background: var(--blue-dim); }
        .reading-link-icon, .reading-link-arr { flex-shrink: 0; }

        /* PROGRESS */
        .progress-wrap { margin: 14px 0 4px; }
        .progress-label { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--fg-muted); margin-bottom: 6px; }
        .progress-bar { height: 3px; border-radius: 2px; background: var(--border); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .progress-fill.teal { background: var(--teal); }
        .progress-fill.blue { background: var(--blue); }

        /* BOOK */
        .book-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px; }
        .book-cover { width: 64px; height: 90px; border-radius: 6px; flex-shrink: 0; background: linear-gradient(145deg, #1a3a6a, #0d2048); border: 1px solid rgba(106,171,247,.3); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
        .book-info { flex: 1; min-width: 0; }
        .book-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; line-height: 1.3; color: var(--fg); margin-bottom: 4px; }
        .book-author { font-size: 0.8rem; color: var(--fg-muted); margin-bottom: 10px; }
        .excerpt-body { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; margin-bottom: 14px; }
        .excerpt-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
        .excerpt-text p { font-family: 'Lora', Georgia, serif; font-size: 0.98rem; line-height: 1.9; color: var(--fg); margin-bottom: 14px; }
        .excerpt-text p:last-child { margin-bottom: 0; }
        .quote-block { border-left: 2px solid var(--blue); padding-left: 18px; margin: 16px 0; }
        .quote-text { font-family: 'Playfair Display', Georgia, serif; font-size: 1rem; font-style: italic; line-height: 1.72; color: var(--fg); }
        .quote-author { font-size: 0.7rem; color: var(--fg-muted); margin-top: 8px; }

        /* PRAYER */
        .prayer-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; margin-bottom: 14px; position: relative; overflow: hidden; }
        .prayer-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--rose), transparent); }
        .prayer-moment { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rose); margin-bottom: 6px; }
        .prayer-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; color: var(--fg); margin-bottom: 16px; }
        .prayer-text { font-family: 'Lora', Georgia, serif; font-size: 1rem; line-height: 2; color: var(--fg); white-space: pre-line; }
        .prayer-source { font-size: 0.68rem; color: var(--fg-dim); margin-top: 14px; font-style: italic; }

        /* PLAN TABLE */
        .plan-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .plan-table th { text-align: left; color: var(--fg-muted); font-weight: 600; font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .plan-table td { padding: 10px 0; border-bottom: 1px solid var(--border); color: var(--fg-muted); vertical-align: top; }
        .plan-table td:first-child { color: var(--fg); font-weight: 500; padding-right: 12px; white-space: nowrap; }
        .plan-table tr.now td:first-child { color: var(--teal); font-weight: 600; }
        .plan-table tr.now-blue td:first-child { color: var(--blue); font-weight: 600; }

        /* INSPIRAÇÃO */
        .inspire-item { display: flex; align-items: flex-start; gap: 14px; }
        .inspire-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; background: rgba(167,139,250,.12); }
        .inspire-title { font-weight: 600; font-size: .9rem; color: var(--fg); margin-bottom: 2px; }
        .inspire-desc { font-size: .8rem; color: var(--fg-muted); line-height: 1.5; }

        .booklist-item { display: flex; align-items: flex-start; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border); margin-top: 8px; }
        .booklist-item:last-child { border-bottom: none; padding-bottom: 0; }
        .booklist-num { font-size: .68rem; color: var(--violet); font-weight: 700; letter-spacing: .06em; padding-top: 2px; min-width: 22px; }
        .booklist-title { font-weight: 600; font-size: .9rem; color: var(--fg); }
        .booklist-author { font-size: .75rem; color: var(--fg-muted); margin: 1px 0 4px; }
        .booklist-why { font-size: .78rem; color: var(--fg-dim); line-height: 1.5; }
      `}</style>
    </>
  )
}
