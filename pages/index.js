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

/* ── Orações de gratidão por dia da semana ──────────── */
const GRATITUDE_PRAYERS = [
  { dia: 'Domingo',  titulo: 'Gratidão pelo Descanso',    texto: 'Senhor, obrigado pelo domingo — pelo descanso que restaura, pela paz que renova. Que eu descanse do que é inútil e me abra para o que realmente importa. A quietude deste dia me lembra que sou mais do que o que produzo.' },
  { dia: 'Segunda',  titulo: 'Gratidão pelo Recomeço',    texto: 'Obrigado, Deus, pela segunda-feira — pela chance de recomeçar. Que eu faça o que posso com o que tenho, onde estou. Que eu escolha o próximo passo certo mesmo sem ver o caminho inteiro.' },
  { dia: 'Terça',    titulo: 'Gratidão pela Resiliência', texto: 'Obrigado pelo que sobrevivi. Por cada recomeço que parecia impossível e aconteceu. Que eu olhe para as minhas cicatrizes não como vergonha, mas como evidência de que continuo aqui.' },
  { dia: 'Quarta',   titulo: 'Gratidão pelo Meio do Caminho', texto: 'A semana está pela metade e estou de pé — isso é suficiente para agradecer. Que eu não precise chegar ao fim para reconhecer o valor do que já percorri.' },
  { dia: 'Quinta',   titulo: 'Gratidão pelas Pessoas',    texto: 'Obrigado pelas pessoas que ficaram. Pelos que disseram a verdade com cuidado. Pelos que apareceram quando precisei. Que eu honre esses vínculos com presença.' },
  { dia: 'Sexta',    titulo: 'Gratidão pelo Que Aprendi', texto: 'Obrigado por mais uma semana. Pelo que aprendi, inclusive com os erros. Que eu encerre sem carregar o que não me pertence mais. Que eu saiba separar o que posso mudar do que preciso soltar.' },
  { dia: 'Sábado',   titulo: 'Gratidão pela Jornada',     texto: 'Obrigado pela jornada — não pelo destino ainda, mas pelo caminho. Hoje é diferente de um ano atrás. Que eu reconheça o quanto já mudou, mesmo quando parece pouco.' },
]

/* ── Vídeos motivacionais rotativos (1 por dia) ─────── */
const VIDEOS = [
  { titulo: 'Viktor Frankl — Por que acreditar nas pessoas',       canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=fD1512_XJEw' },
  { titulo: 'Tony Robbins — Por que fazemos o que fazemos',        canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=Cpc-t-Uwv1I' },
  { titulo: 'Brené Brown — O poder da vulnerabilidade',            canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=iCvmsMzlF7o' },
  { titulo: 'Simon Sinek — Como grandes líderes inspiram ação',    canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=u4ZoJKF_VuA' },
  { titulo: 'Robert Waldinger — O que faz uma boa vida',           canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=8KkKuTCFvzI' },
  { titulo: 'Kelly McGonigal — Como tornar o estresse seu amigo',  canal: 'TED Talks', url: 'https://www.youtube.com/watch?v=RcGyVTAoXEU' },
  { titulo: 'Matthew McConaughey — Discurso do Oscar',             canal: 'YouTube',   url: 'https://www.youtube.com/watch?v=wD2cVhC-63I' },
]

/* ── Reflexões da Recuperação (original, inspiradas nos 12 Passos) */
const AA_REFLECTIONS = [
  { tema: 'Impotência', passo: 'Passo 1', reflexao: 'Admitir que perdi o controle não foi fraqueza — foi o primeiro ato de honestidade real. Enquanto fingi que controlava, o caos controlava tudo. A rendição abriu a porta que a teimosia mantinha trancada. Hoje posso começar de onde estou, não de onde gostaria de estar.' },
  { tema: 'Esperança', passo: 'Passo 2', reflexao: 'Acreditar que algo maior do que eu pode restaurar minha sanidade não exige nome, religião ou certeza. Exige só uma coisa: parar de achar que tenho que resolver tudo sozinho. A esperança não é otimismo ingênuo — é a decisão de continuar quando a lógica diz para parar.' },
  { tema: 'Decisão', passo: 'Passo 3', reflexao: 'Entregar a vontade e a vida a um Poder Superior é uma decisão diária, não um momento único. Todo dia acordo e posso escolher: vou tentar controlar o incontrolável ou vou fazer minha parte e entregar o resto? A entrega não é passividade — é sabedoria prática.' },
  { tema: 'Inventário', passo: 'Passo 4', reflexao: 'Olhar para mim mesmo com honestidade — sem maquiar e sem destruir. O inventário moral não é punição, é mapa. Preciso saber onde estou para decidir para onde vou. Os defeitos que mais resisto ver são exatamente os que mais precisam de luz.' },
  { tema: 'Admissão', passo: 'Passo 5', reflexao: 'Dizer em voz alta, para outro ser humano, a natureza exata dos meus erros quebra o isolamento que a vergonha constrói. Não é sobre ser julgado — é sobre ser visto. E descobrir que o outro não saiu correndo muda alguma coisa por dentro que nenhum pensamento sozinho muda.' },
  { tema: 'Disposição', passo: 'Passo 6', reflexao: 'Estar inteiramente pronto para que Deus remova os defeitos de caráter. "Inteiramente" é a palavra-chave. Não é "quase pronto" ou "pronto quando for conveniente." É reconhecer que alguns defeitos eu carrego por escolha, porque me protegem. A pergunta é: essa proteção ainda serve, ou já virou prisão?' },
  { tema: 'Humildade', passo: 'Passo 7', reflexao: 'Humildade não é pensar menos de si — é pensar menos em si. Pedir humildemente a remoção dos defeitos é aceitar que a transformação é um processo, não um evento. Hoje não preciso ser perfeito. Preciso estar disposto. A disposição abre espaço; a perfeição fecha.' },
  { tema: 'Reparação', passo: 'Passo 8', reflexao: 'Fazer a lista das pessoas que magoei exige coragem e memória honesta. Algumas pessoas dessa lista eu preferiria esquecer. Outras, eu preferiria que me esquecessem. Mas a recuperação não funciona por conveniência — funciona por verdade. E a verdade começa com um nome de cada vez.' },
  { tema: 'Restituição', passo: 'Passo 9', reflexao: 'Reparar diretamente os danos causados, exceto quando isso prejudicaria outros. A reparação não é para limpar minha consciência — é para restaurar o que quebrei. Às vezes a melhor reparação é mudar de comportamento. Às vezes é um pedido de desculpas. E às vezes é o silêncio respeitoso da distância.' },
  { tema: 'Vigilância', passo: 'Passo 10', reflexao: 'Continuar fazendo o inventário pessoal e, quando errar, admitir prontamente. Esse é o passo que transforma recuperação em modo de vida. Não é sobre nunca errar — é sobre não deixar o erro acumular. Uma conta pequena é fácil de pagar. Uma dívida de anos esmaga.' },
  { tema: 'Conexão', passo: 'Passo 11', reflexao: 'Oração e meditação para melhorar o contato consciente com Deus. Não precisa ser eloquente. Não precisa ser longo. Pode ser: "Me ajuda hoje." Pode ser silêncio. O que importa é a intenção de se conectar com algo maior do que o meu próximo pensamento ansioso.' },
  { tema: 'Serviço', passo: 'Passo 12', reflexao: 'Tendo tido um despertar espiritual, levar a mensagem e praticar esses princípios em todos os assuntos. Ajudar o outro não é caridade — é parte da minha cura. Quando conto minha história para quem precisa ouvir, eu me lembro de onde vim. E lembrar de onde vim é o que me impede de voltar.' },
]

/* ── Sabedoria prática da recuperação (inspirado em Bill W.) ── */
const BILL_WISDOM = [
  { tema: 'Primeiro passo', texto: 'O primeiro gole é o que importa. Não o décimo, não o vigésimo. É o primeiro. Toda recaída começa com uma decisão que parecia pequena. A vigilância não é paranoia — é respeito pela doença. E a doença é paciente. Ela espera.' },
  { tema: 'Solidão', texto: 'O isolamento é o campo de treinamento da recaída. Quando me afasto das pessoas, das reuniões, do convívio — a voz que diz "desta vez será diferente" fica mais alta. A companhia humana imperfeita é melhor do que a solidão perfeita do meu pensamento doente.' },
  { tema: 'Gratidão', texto: 'Gratidão e miséria não moram na mesma casa. Quando começo o dia agradecendo — pelo café, pela cama, por ter acordado sóbrio — o dia inteiro muda de temperatura. Não é pensamento positivo barato. É uma prática de redirecionamento da atenção.' },
  { tema: 'Aceitação', texto: 'Aceitação não é concordância. Aceitar a realidade como ela é não significa que aprovo. Significa que paro de gastar energia lutando contra o que já aconteceu. E essa energia economizada é o que uso para mudar o que posso.' },
  { tema: 'Ressentimento', texto: 'Guardar ressentimento é como tomar veneno e esperar que o outro morra. Já fiz isso — carreguei mágoas por anos como se fossem troféus. A liberdade não veio do perdão bonito. Veio da exaustão. Cansei de carregar peso que não era meu.' },
  { tema: 'Um dia de cada vez', texto: 'Não preciso ficar sóbrio para sempre. Preciso ficar sóbrio hoje. "Para sempre" é um conceito que paralisa. "Hoje" é um compromisso que posso cumprir. E amanhã, quando chegar, vai ser outro "hoje." É assim que anos de sobriedade se constroem: de um dia de cada vez.' },
  { tema: 'Humildade real', texto: 'Humildade não é andar de cabeça baixa. É saber exatamente o meu tamanho — nem maior, nem menor. É pedir ajuda sem vergonha e oferecer ajuda sem arrogância. Levou tempo para eu aprender que "não sei" é uma das frases mais corajosas que existem.' },
  { tema: 'Ação', texto: 'Pensamento não muda pensamento. Ação muda pensamento. Posso ficar semanas pensando em ir à reunião. Ou posso ir. Posso analisar se devo pedir desculpas. Ou posso pedir. O programa funciona para quem trabalha o programa. E trabalhar exige mover os pés.' },
  { tema: 'Progresso', texto: 'Progresso, não perfeição. Se eu esperar estar perfeito para agir, nunca vou agir. Se eu esperar me sentir pronto para mudar, nunca vou mudar. O progresso é sujo, lento, cheio de erros. E é o único caminho real. O outro — a perfeição — não existe.' },
  { tema: 'Padrinho', texto: 'Ninguém se recupera sozinho. O padrinho não é guru, terapeuta nem juiz. É alguém que já passou pelo que estou passando e sobreviveu. Quando compartilho minha verdade com alguém que entende, o peso se divide. E peso dividido é peso suportável.' },
  { tema: 'Recaída', texto: 'A recaída não começa no gole. Começa semanas antes — no isolamento, na irritabilidade, na mentira "pequena," no "eu resolvo sozinho." Reconhecer os sinais é mais importante do que lutar contra eles. Quando sei que estou em terreno perigoso, posso pedir ajuda antes de cair.' },
  { tema: 'Despertar', texto: 'O despertar espiritual não é um raio de luz. Para a maioria de nós, é lento, gradual, e quase imperceptível enquanto acontece. Um dia olho para trás e percebo: estou diferente. Reajo diferente. Escolho diferente. E esse "diferente" não foi um evento — foi uma construção diária.' },
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

/* ── Mood emojis for inventory ─────────────────────── */
const MOODS = [
  { emoji: '😊', label: 'Bem' },
  { emoji: '😐', label: 'Neutro' },
  { emoji: '😔', label: 'Triste' },
  { emoji: '😤', label: 'Irritado' },
  { emoji: '😰', label: 'Ansioso' },
  { emoji: '🙏', label: 'Grato' },
  { emoji: '💪', label: 'Forte' },
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

function todayKey() {
  const d = new Date()
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}

function displayDate(key) {
  const [y,m,d] = key.split('-')
  const ms = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  return d + '/' + ms[parseInt(m)-1] + '/' + y
}

function weekdayName(key) {
  const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
  return days[new Date(key + 'T12:00:00').getDay()]
}

function getWeekKeys() {
  const keys = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    keys.push(d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'))
  }
  return keys
}

/* ════════════════════════════════════════════════════ */
export default function Home() {
  const [tab, setTab] = useState('hoje')
  const [chapter, setChapter] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [bibliaReflect, setBibliaReflect] = useState({})
  const [leituraReflect, setLeituraReflect] = useState({})
  const [inventory, setInventory] = useState({})
  const [invForm, setInvForm] = useState({ acertos: '', erros: '', humor: '', gratidao: '' })
  const [invView, setInvView] = useState('form')

  useEffect(() => {
    setMounted(true)
    try {
      const t = localStorage.getItem('bussula-tab')
      const c = parseInt(localStorage.getItem('bussula-chapter'))
      if (t) setTab(t)
      if (c >= 1 && c <= TOTAL_CHAPTERS) setChapter(c)
      const br = JSON.parse(localStorage.getItem('bussula-reflect-biblia') || '{}')
      const lr = JSON.parse(localStorage.getItem('bussula-reflect-leitura') || '{}')
      const inv = JSON.parse(localStorage.getItem('bussula-inventory') || '{}')
      setBibliaReflect(br)
      setLeituraReflect(lr)
      setInventory(inv)
      if (inv[todayKey()]) {
        setInvForm(inv[todayKey()])
      }
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

  function saveInventory(form) {
    try {
      const saved = JSON.parse(localStorage.getItem('bussula-inventory') || '{}')
      saved[todayKey()] = form
      const keys = Object.keys(saved).sort().reverse().slice(0,90)
      const trimmed = {}
      keys.forEach(k => { trimmed[k] = saved[k] })
      localStorage.setItem('bussula-inventory', JSON.stringify(trimmed))
      setInventory(trimmed)
    } catch {}
  }

  function updateInvField(field, val) {
    const next = { ...invForm, [field]: val }
    setInvForm(next)
    saveInventory(next)
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
  const aaRef = AA_REFLECTIONS[getDayOfYear() % AA_REFLECTIONS.length]
  const billRef = BILL_WISDOM[getDayOfYear() % BILL_WISDOM.length]
  const weekKeys = getWeekKeys()

  return (
    <>
      <Head>
        <title>Bússola de Recuperação</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a12" />
      </Head>

      <div className="app">
        {/* ── HEADER ── */}
        <header className="header">
          <div className="header-left">
            <span className="header-title">Bússola</span>
            <span className="header-sub">recuperação · fé · propósito</span>
          </div>
          {mounted && <span className="header-date">{getDateStr()}</span>}
        </header>

        {/* ── CONTENT ── */}
        <main className="content">

          {/* ═══ HOJE ═══ */}
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
                    <div className="pillar-desc">Em Busca de Sentido — Viktor Frankl</div>
                    <div className="pillar-sub">30 minutos · Leitura guiada</div>
                  </div>
                  <div className="pillar-arrow">›</div>
                </div>
                <div className="pillar-item" onClick={() => goTab('oracao')}>
                  <div className="pillar-icon rose">🙏</div>
                  <div className="pillar-body">
                    <div className="pillar-name rose">Oração + AA</div>
                    <div className="pillar-desc">Orações, reflexão diária e Na Opinião de Bill</div>
                    <div className="pillar-sub">Manhã e noite — dois minutos cada</div>
                  </div>
                  <div className="pillar-arrow">›</div>
                </div>
                <div className="pillar-item" onClick={() => goTab('inventario')}>
                  <div className="pillar-icon amber">📝</div>
                  <div className="pillar-body">
                    <div className="pillar-name amber">Inventário</div>
                    <div className="pillar-desc">Passo 10 — O que acertei, o que errei</div>
                    <div className="pillar-sub">5 minutos · Exame de consciência do dia</div>
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
              </div>

              {/* Vídeo motivacional do dia */}
              {mounted && (() => {
                const v = VIDEOS[getDayOfYear() % VIDEOS.length]
                return (
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="video-link">
                    <span className="video-play">▶</span>
                    <div style={{flex:1}}>
                      <div className="video-label">Vídeo do Dia — {v.canal}</div>
                      <div className="video-title">{v.titulo}</div>
                    </div>
                    <span className="link-arrow">↗</span>
                  </a>
                )
              })()}

              {/* Música para correr — YouTube Music */}
              <a className="music-link" href="https://music.youtube.com/search?q=treino+corrida+alta+energia+motivação" target="_blank" rel="noopener noreferrer">
                <span className="music-icon">🎵</span>
                <div style={{flex:1}}>
                  <div className="music-title gold-text">Música para Correr</div>
                  <div className="music-sub">YouTube Music — Alta energia</div>
                </div>
                <span className="link-arrow">↗</span>
              </a>

              <div className="verse-card">
                <div className="verse-text">&ldquo;No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.&rdquo;</div>
                <div className="verse-ref">João 1:1</div>
              </div>

              {/* Oração de gratidão do dia */}
              {mounted && (() => {
                const gp = GRATITUDE_PRAYERS[new Date().getDay()]
                return (
                  <div className="card card-rose-border">
                    <div className="card-label rose-text">{gp.dia} — {gp.titulo}</div>
                    <p className="serif-body">{gp.texto}</p>
                  </div>
                )
              })()}

              {quote && (
                <div className="card card-gold quote-of-day">
                  <div className="card-label gold-text">Frase do Dia</div>
                  <div className="daily-quote">&ldquo;{quote[0]}&rdquo;</div>
                  <div className="daily-author">— {quote[1]}</div>
                </div>
              )}
            </section>
          )}

          {/* ═══ BÍBLIA ═══ */}
          {tab === 'biblia' && (
            <section className="panel">
              <div className="section-eyebrow teal-text">Palavra do Dia</div>
              <div className="section-title">Evangelho de João</div>

              <div className="chapter-nav-row">
                <div className="chapter-info">Cap. {chapter} de {TOTAL_CHAPTERS}</div>
                <div style={{display:'flex',gap:'8px'}}>
                  <button className="nav-btn-pill" onClick={() => goChapter(-1)} disabled={chapter === 1}>‹ Anterior</button>
                  <button className="nav-btn-pill" onClick={() => goChapter(1)} disabled={chapter === TOTAL_CHAPTERS}>Próximo ›</button>
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
                  <div className="progress-fill teal-bg" style={{width: `${(chapter/TOTAL_CHAPTERS*100).toFixed(1)}%`}} />
                </div>
              </div>

              {BIBLE_NOTES[chapter] && (
                <div className="card card-teal-border card-teal-bg">
                  <div className="card-label teal-text">O que prestar atenção — Cap. {chapter}</div>
                  <p className="serif-body">{BIBLE_NOTES[chapter]}</p>
                </div>
              )}

              <a className="music-link" href="https://music.youtube.com/search?q=instrumental+foco+leitura+calmo" target="_blank" rel="noopener noreferrer">
                <span className="music-icon">🎵</span>
                <div style={{flex:1}}>
                  <div className="music-title teal-text">Música para Leitura</div>
                  <div className="music-sub">YouTube Music — Instrumental Focus</div>
                </div>
                <span className="link-arrow">↗</span>
              </a>
              <a className="ext-link" href="https://www.bibliaonline.com.br/acf/jo/1" target="_blank" rel="noopener noreferrer">
                <span className="ext-link-icon">🌐</span>
                <span className="ext-link-text">Abrir Bíblia completa — BíbliaOnline</span>
                <span className="link-arrow">↗</span>
              </a>
              <a className="ext-link" href="https://www.bible.com/pt/bible/1608/JHN.1.ARC" target="_blank" rel="noopener noreferrer">
                <span className="ext-link-icon">📱</span>
                <span className="ext-link-text">YouVersion — app de bíblia</span>
                <span className="link-arrow">↗</span>
              </a>

              <div className="card" style={{marginTop:'8px'}}>
                <div className="card-label teal-text">Plano de Leitura</div>
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

              {mounted && (
                <div className="card card-teal-border" style={{marginTop:'4px'}}>
                  <div className="card-label teal-text">Minha Reflexão — {displayDate(todayKey())}</div>
                  <div className="reflect-hint">O que esse capítulo te disse? Escreva livremente — só para você.</div>
                  <textarea
                    defaultValue={bibliaReflect[todayKey()] || ''}
                    placeholder="Escreva aqui sua reflexão do dia…"
                    onChange={e => saveReflect(todayKey(), e.target.value, 'bussula-reflect-biblia', setBibliaReflect)}
                    className="reflect-textarea"
                  />
                  {Object.keys(bibliaReflect).filter(k => k !== todayKey() && bibliaReflect[k].trim()).sort().reverse().slice(0,5).map(k => (
                    <div key={k} className="reflect-past">
                      <div className="reflect-past-date">{displayDate(k)}</div>
                      <div className="reflect-past-text">{bibliaReflect[k]}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ═══ LEITURA ═══ */}
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
                    <div className="progress-bar"><div className="progress-fill blue-bg" style={{width:'2%'}} /></div>
                  </div>
                </div>
              </div>

              <div className="quote-block">
                <div className="quote-text">&ldquo;A última das liberdades humanas é a escolha da própria atitude diante de qualquer conjunto de circunstâncias — a escolha do próprio caminho.&rdquo;</div>
                <div className="quote-author">— Viktor E. Frankl</div>
              </div>

              {(() => {
                const idx = getDayOfYear() % FRANKL_NOTES.length
                const n = FRANKL_NOTES[idx]
                return (
                  <div className="card card-blue-border card-blue-bg">
                    <div className="card-label blue-text">O que prestar atenção — {n.pages}</div>
                    <div className="note-tema">{n.tema}</div>
                    <p className="serif-body">{n.nota}</p>
                  </div>
                )
              })()}

              <a className="book-link" href="/frankl.pdf" target="_blank" rel="noopener noreferrer">
                <span style={{fontSize:'1.1rem'}}>📄</span>
                <span style={{flex:1}}>Abrir o livro em PDF — Em Busca de Sentido</span>
                <span className="link-arrow">↗</span>
              </a>

              {/* Book list (moved from Inspiração) */}
              <div className="card" style={{marginTop:'14px'}}>
                <div className="card-label violet-text">Próximas Leituras</div>
                {[
                  {n:'01', title:'As 12 Regras para a Vida', author:'Jordan B. Peterson'},
                  {n:'02', title:'O Monge e o Executivo', author:'James C. Hunter'},
                  {n:'03', title:'Os Quatro Compromissos', author:'Don Miguel Ruiz'},
                  {n:'04', title:'Alcoólicos Anônimos — O Livro Grande', author:'Bill Wilson et al.'},
                  {n:'05', title:'O Poder do Hábito', author:'Charles Duhigg'},
                ].map((book, i) => (
                  <div key={i} className="booklist-item">
                    <div className="booklist-num">{book.n}</div>
                    <div>
                      <div className="booklist-title">{book.title}</div>
                      <div className="booklist-author">{book.author}</div>
                    </div>
                  </div>
                ))}
              </div>

              {mounted && (
                <div className="card card-blue-border" style={{marginTop:'4px'}}>
                  <div className="card-label blue-text">Minha Reflexão — {displayDate(todayKey())}</div>
                  <div className="reflect-hint">O que esse trecho te tocou? Que ideia você leva para hoje?</div>
                  <textarea
                    defaultValue={leituraReflect[todayKey()] || ''}
                    placeholder="Escreva aqui sua reflexão da leitura…"
                    onChange={e => saveReflect(todayKey(), e.target.value, 'bussula-reflect-leitura', setLeituraReflect)}
                    className="reflect-textarea"
                  />
                  {Object.keys(leituraReflect).filter(k => k !== todayKey() && leituraReflect[k].trim()).sort().reverse().slice(0,5).map(k => (
                    <div key={k} className="reflect-past">
                      <div className="reflect-past-date">{displayDate(k)}</div>
                      <div className="reflect-past-text">{leituraReflect[k]}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ═══ ORAÇÃO ═══ */}
          {tab === 'oracao' && (
            <section className="panel">
              <div className="section-eyebrow rose-text">Dois minutos, duas vezes</div>
              <div className="section-title">Orações e Reflexões</div>

              {/* Música para meditação — YouTube Music */}
              <a className="music-link" href="https://music.youtube.com/search?q=meditação+calma+paz+relaxamento" target="_blank" rel="noopener noreferrer" style={{marginBottom:'18px'}}>
                <span className="music-icon">🎵</span>
                <div style={{flex:1}}>
                  <div className="music-title rose-text">Música para Meditação</div>
                  <div className="music-sub">YouTube Music — Calma e paz</div>
                </div>
                <span className="link-arrow">↗</span>
              </a>

              {/* Reflexão Diária AA */}
              <div className="card card-rose-border card-rose-bg">
                <div className="card-label rose-text">Reflexão da Recuperação — {aaRef.passo}</div>
                <div className="note-tema rose-text">{aaRef.tema}</div>
                <p className="serif-body">{aaRef.reflexao}</p>
              </div>

              {/* Link para Reflexões Diárias oficial */}
              <a className="ext-link" href="https://www.aa.org.br/reflexoes-diarias" target="_blank" rel="noopener noreferrer" style={{marginBottom:'4px'}}>
                <span className="ext-link-icon">📖</span>
                <span className="ext-link-text">Reflexões Diárias — AA Brasil (site oficial)</span>
                <span className="link-arrow">↗</span>
              </a>

              {/* Na Opinião de Bill */}
              <div className="card card-amber-border card-amber-bg">
                <div className="card-label amber-text">Na Opinião de Bill — {billRef.tema}</div>
                <p className="serif-body">{billRef.texto}</p>
              </div>

              {/* Orações */}
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

              {/* ── REUNIÕES ONLINE RJ ── */}
              <div className="section-eyebrow violet-text" style={{marginTop:'32px'}}>Alcoólicos Anônimos — Rio de Janeiro</div>
              <div className="section-title" style={{marginBottom:'16px'}}>Reuniões Online — RJ</div>

              {/* Opção 1 — Busca oficial */}
              <div className="card card-violet-border card-violet-bg" style={{marginBottom:'12px'}}>
                <div className="card-label violet-text">🔍 Busca oficial do AARJ</div>
                <p className="serif-body" style={{marginBottom:'12px'}}>
                  O site do AA Rio tem o buscador atualizado de grupos — incluindo os online. Horário sempre correto.
                </p>
                <a className="ext-link" href="https://www.aarj.org.br/busca-grupos" target="_blank" rel="noopener noreferrer" style={{marginBottom:'8px'}}>
                  <span className="ext-link-icon">🌐</span>
                  <span className="ext-link-text">Buscar grupos online — aarj.org.br</span>
                  <span className="link-arrow">↗</span>
                </a>
                <div className="meeting-phone-row">
                  <span className="meeting-phone-icon">📞</span>
                  <div>
                    <div className="meeting-phone-label violet-text">Linha de Ajuda — AARJ</div>
                    <div className="meeting-phone-num">(21) 2253-3377</div>
                    <div className="meeting-phone-sub">Informam grupos e horários de reuniões online</div>
                  </div>
                </div>
                <a className="ext-link" href="https://aa-intergroup.org/meetings/?country=BR" target="_blank" rel="noopener noreferrer" style={{marginTop:'8px'}}>
                  <span className="ext-link-icon">🌍</span>
                  <span className="ext-link-text">Diretório internacional — OIAA (em português)</span>
                  <span className="link-arrow">↗</span>
                </a>
              </div>

              {/* Opção 2 — Lista fixa */}
              <div className="card card-blue-border">
                <div className="card-label blue-text">📋 Grupos conhecidos</div>
                <p style={{fontSize:'.75rem',color:'var(--fg-muted)',marginBottom:'14px',lineHeight:'1.5'}}>
                  ⚠️ Horários podem mudar. Confirme no AARJ ou (21) 2253-3377 antes de entrar.
                </p>
                {[
                  {
                    nome: 'AA Online',
                    dias: 'Diário',
                    horario: '20h às 21h30',
                    formato: 'Zoom · Depoimento e partilha',
                    link: 'https://aaonline.com.br',
                    nota: 'Grupo exclusivamente online, qualquer estado',
                  },
                  {
                    nome: 'Grupo Amor (feminino)',
                    dias: 'Seg, Qua, Sáb e Dom',
                    horario: 'Variados (17h e 20h)',
                    formato: 'Zoom · Reunião feminina',
                    link: 'https://linktr.ee/aareunioesfemininas',
                    nota: 'Verificar senha e link atual no Linktree',
                  },
                  {
                    nome: 'Grupos AARJ com reunião virtual',
                    dias: 'Sáb e Dom (confirmados)',
                    horario: '10h',
                    formato: 'Zoom · Barra da Tijuca e outros bairros',
                    link: 'https://www.aarj.org.br/busca-grupos',
                    nota: 'Busque "online" no buscador de grupos do AARJ',
                  },
                ].map((m, i) => (
                  <div key={i} className="meeting-item">
                    <div className="meeting-nome">{m.nome}</div>
                    <div className="meeting-row">
                      <span className="meeting-tag blue-text">📅 {m.dias}</span>
                      <span className="meeting-tag amber-text">🕐 {m.horario}</span>
                    </div>
                    <div className="meeting-formato">{m.formato}</div>
                    <div className="meeting-nota">{m.nota}</div>
                    <a href={m.link} target="_blank" rel="noopener noreferrer" className="meeting-link">
                      Verificar / Entrar ↗
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══ INVENTÁRIO ═══ */}
          {tab === 'inventario' && (
            <section className="panel">
              <div className="section-eyebrow amber-text">Passo 10 — Exame diário</div>
              <div className="section-title">Inventário do Dia</div>

              <div className="inv-tabs">
                <button className={`inv-tab ${invView === 'form' ? 'active' : ''}`} onClick={() => setInvView('form')}>Hoje</button>
                <button className={`inv-tab ${invView === 'history' ? 'active' : ''}`} onClick={() => setInvView('history')}>Semana</button>
              </div>

              {invView === 'form' && mounted && (
                <>
                  <div className="inv-date">{displayDate(todayKey())} — {weekdayName(todayKey())}</div>

                  <div className="inv-section">
                    <label className="inv-label teal-text">O que fiz certo hoje</label>
                    <textarea
                      value={invForm.acertos}
                      onChange={e => updateInvField('acertos', e.target.value)}
                      placeholder="O que funcionou? O que fiz de bom?"
                      className="inv-textarea"
                    />
                  </div>

                  <div className="inv-section">
                    <label className="inv-label rose-text">Onde errei hoje</label>
                    <textarea
                      value={invForm.erros}
                      onChange={e => updateInvField('erros', e.target.value)}
                      placeholder="O que posso melhorar? Onde vacilei?"
                      className="inv-textarea"
                    />
                  </div>

                  <div className="inv-section">
                    <label className="inv-label amber-text">Como me sinto agora</label>
                    <div className="mood-row">
                      {MOODS.map(m => (
                        <button
                          key={m.emoji}
                          className={`mood-btn ${invForm.humor === m.emoji ? 'selected' : ''}`}
                          onClick={() => updateInvField('humor', m.emoji)}
                        >
                          <span className="mood-emoji">{m.emoji}</span>
                          <span className="mood-label">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="inv-section">
                    <label className="inv-label gold-text">Pelo que sou grato</label>
                    <textarea
                      value={invForm.gratidao}
                      onChange={e => updateInvField('gratidao', e.target.value)}
                      placeholder="3 coisas boas de hoje…"
                      className="inv-textarea"
                    />
                  </div>

                  <div className="inv-saved">Salvo automaticamente</div>
                </>
              )}

              {invView === 'history' && mounted && (
                <>
                  <div className="inv-week-title">Últimos 7 dias</div>

                  {/* Week mood strip */}
                  <div className="week-strip">
                    {weekKeys.map(k => {
                      const entry = inventory[k]
                      const isToday = k === todayKey()
                      return (
                        <div key={k} className={`week-day ${isToday ? 'today' : ''}`}>
                          <div className="week-day-name">{weekdayName(k).slice(0,3)}</div>
                          <div className="week-day-mood">{entry?.humor || '·'}</div>
                          <div className="week-day-date">{k.split('-')[2]}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Stats */}
                  {(() => {
                    const filled = weekKeys.filter(k => inventory[k] && (inventory[k].acertos || inventory[k].erros || inventory[k].humor || inventory[k].gratidao)).length
                    return (
                      <div className="week-stats">
                        <div className="week-stat">
                          <div className="week-stat-num">{filled}</div>
                          <div className="week-stat-label">dias preenchidos</div>
                        </div>
                        <div className="week-stat">
                          <div className="week-stat-num">{7 - filled}</div>
                          <div className="week-stat-label">dias em branco</div>
                        </div>
                      </div>
                    )
                  })()}

                  {/* Day entries */}
                  {weekKeys.slice().reverse().map(k => {
                    const entry = inventory[k]
                    if (!entry || (!entry.acertos && !entry.erros && !entry.humor && !entry.gratidao)) return null
                    return (
                      <div key={k} className="inv-entry">
                        <div className="inv-entry-header">
                          <span className="inv-entry-date">{displayDate(k)} — {weekdayName(k)}</span>
                          {entry.humor && <span className="inv-entry-mood">{entry.humor}</span>}
                        </div>
                        {entry.acertos && (
                          <div className="inv-entry-field">
                            <span className="inv-entry-label teal-text">Acertos:</span>
                            <span className="inv-entry-text">{entry.acertos}</span>
                          </div>
                        )}
                        {entry.erros && (
                          <div className="inv-entry-field">
                            <span className="inv-entry-label rose-text">Erros:</span>
                            <span className="inv-entry-text">{entry.erros}</span>
                          </div>
                        )}
                        {entry.gratidao && (
                          <div className="inv-entry-field">
                            <span className="inv-entry-label gold-text">Gratidão:</span>
                            <span className="inv-entry-text">{entry.gratidao}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {weekKeys.every(k => !inventory[k] || (!inventory[k].acertos && !inventory[k].erros && !inventory[k].humor && !inventory[k].gratidao)) && (
                    <div className="inv-empty">Nenhum inventário esta semana. Comece pelo hoje.</div>
                  )}
                </>
              )}
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
            { id: 'inventario', icon: '✧', label: 'Inventário' },
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
          background: linear-gradient(180deg, rgba(10,10,18,.97) 0%, rgba(10,10,18,.92) 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px; z-index: 10;
        }
        .header-left { display: flex; flex-direction: column; gap: 2px; }
        .header-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem; letter-spacing: 0.06em;
          background: linear-gradient(135deg, var(--gold) 0%, #E8C87A 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-sub { font-size: 0.62rem; color: var(--fg-dim); letter-spacing: 0.08em; text-transform: uppercase; }
        .header-date { font-size: 0.72rem; color: var(--fg-muted); }

        /* CONTENT */
        .content {
          margin-top: var(--header-h);
          margin-bottom: var(--tab-h);
          overflow-y: auto; flex: 1;
        }
        .panel { padding: 28px 20px 40px; animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

        /* TAB NAV */
        .tab-nav {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: var(--tab-h);
          background: linear-gradient(180deg, rgba(10,10,18,.94) 0%, rgba(10,10,18,.98) 100%);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,.06);
          display: flex;
        }
        .tab-btn {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          border: none; background: none; cursor: pointer;
          color: var(--fg-dim);
          font-family: 'Inter', sans-serif;
          font-size: 0.54rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          transition: color 0.18s; padding-top: 10px;
        }
        .tab-icon { font-size: 1.15rem; transition: transform 0.2s; }
        .tab-btn.active .tab-icon { transform: scale(1.14); }
        .tab-btn.hoje       { color: var(--gold); }
        .tab-btn.biblia     { color: var(--teal); }
        .tab-btn.leitura    { color: var(--blue); }
        .tab-btn.oracao     { color: var(--rose); }
        .tab-btn.inventario { color: var(--amber); }

        /* TYPOGRAPHY */
        .section-eyebrow { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 7px; }
        .teal-text { color: var(--teal); }
        .blue-text { color: var(--blue); }
        .rose-text { color: var(--rose); }
        .gold-text { color: var(--gold); }
        .amber-text { color: var(--amber); }
        .violet-text { color: var(--violet); }
        .section-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.7rem; line-height: 1.2; margin-bottom: 24px; }
        .serif-body { font-family: 'Lora', Georgia, serif; font-size: .95rem; line-height: 1.85; color: var(--fg); margin: 0; }
        .note-tema { font-size: .72rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; color: inherit; }

        /* CARDS */
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 14px; }
        .card-gold { border-left: 3px solid var(--gold); }
        .card-teal-border { border-left: 3px solid var(--teal); }
        .card-blue-border { border-left: 3px solid var(--blue); }
        .card-rose-border { border-left: 3px solid var(--rose); }
        .card-amber-border { border-left: 3px solid var(--amber); }
        .card-teal-bg { background: linear-gradient(135deg, rgba(64,212,180,.06), rgba(9,9,16,0)); }
        .card-blue-bg { background: linear-gradient(135deg, rgba(106,171,247,.06), rgba(9,9,16,0)); }
        .card-rose-bg { background: linear-gradient(135deg, rgba(240,112,128,.06), rgba(9,9,16,0)); }
        .card-amber-bg { background: linear-gradient(135deg, rgba(230,172,60,.06), rgba(9,9,16,0)); }
        .card-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 7px; }

        /* QUOTE OF DAY */
        .quote-of-day { background: linear-gradient(135deg, rgba(245,176,66,.08), rgba(9,9,16,0)); }
        .daily-quote { font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; line-height: 1.75; color: var(--fg); font-style: italic; margin-bottom: 8px; }
        .daily-author { font-size: 0.72rem; color: var(--fg-muted); }

        /* PILLAR LIST */
        .pillar-item { display: flex; align-items: flex-start; gap: 15px; padding: 16px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: opacity 0.15s; }
        .pillar-item:last-child { border-bottom: none; }
        .pillar-item:hover { opacity: 0.8; }
        .pillar-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .pillar-icon.teal { background: var(--teal-dim); box-shadow: 0 0 0 1px var(--teal-glow); }
        .pillar-icon.blue { background: var(--blue-dim); box-shadow: 0 0 0 1px var(--blue-glow); }
        .pillar-icon.gold { background: var(--gold-dim); box-shadow: 0 0 0 1px var(--gold-glow); }
        .pillar-icon.rose { background: var(--rose-dim); box-shadow: 0 0 0 1px var(--rose-glow); }
        .pillar-icon.amber { background: rgba(230,172,60,.10); box-shadow: 0 0 0 1px rgba(230,172,60,.18); }
        .pillar-body { flex: 1; min-width: 0; }
        .pillar-name { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; margin-bottom: 2px; }
        .pillar-name.teal { color: var(--teal); }
        .pillar-name.blue { color: var(--blue); }
        .pillar-name.gold { color: var(--gold); }
        .pillar-name.rose { color: var(--rose); }
        .pillar-name.amber { color: var(--amber); }
        .pillar-desc { font-size: 0.9rem; color: var(--fg); line-height: 1.4; }
        .pillar-sub  { font-size: 0.74rem; color: var(--fg-muted); margin-top: 3px; }
        .pillar-arrow { color: var(--fg-dim); font-size: 0.85rem; align-self: center; flex-shrink: 0; }

        /* VERSE CARD */
        .verse-card { background: linear-gradient(135deg, rgba(64,212,180,.06), rgba(9,9,16,0)); border: 1px solid rgba(64,212,180,.18); border-radius: 16px; padding: 22px; margin-bottom: 14px; }
        .verse-text { font-family: 'Playfair Display', Georgia, serif; font-size: 1.08rem; line-height: 1.82; font-style: italic; color: var(--fg); margin-bottom: 10px; }
        .verse-ref { font-size: 0.7rem; color: var(--teal); font-weight: 700; letter-spacing: 0.08em; }

        /* TODAY */
        .today-greeting { margin-bottom: 24px; }
        .today-day { font-family: 'Playfair Display', Georgia, serif; font-size: 2.1rem; line-height: 1.1; margin-bottom: 4px; }
        .today-sub { font-size: 0.84rem; color: var(--fg-muted); }

        /* MUSIC LINK */
        .music-link { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); text-decoration: none; color: var(--fg); margin-bottom: 14px; transition: border-color 0.18s; }
        .music-link:hover { border-color: var(--fg-dim); }
        .music-icon { font-size: 1.3rem; }
        .music-title { font-weight: 600; font-size: .88rem; }
        .music-sub { font-size: .73rem; color: var(--fg-muted); }

        /* VIDEO LINK */
        .video-link { display: flex; align-items: center; gap: 12px; padding: 16px; background: linear-gradient(135deg, rgba(167,139,250,.07), rgba(9,9,16,0)); border-radius: 12px; border: 1px solid var(--border); text-decoration: none; color: var(--fg); margin-bottom: 14px; transition: border-color 0.18s; }
        .video-link:hover { border-color: var(--violet); }
        .video-play { font-size: 1.6rem; color: var(--violet); }
        .video-label { font-size: .7rem; color: var(--violet); font-weight: 600; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }
        .video-title { font-weight: 600; font-size: .9rem; line-height: 1.4; }
        .link-arrow { color: var(--fg-dim); font-size: 0.8rem; flex-shrink: 0; }

        /* BIBLE READING */
        .chapter-nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .chapter-info { font-size: 0.82rem; color: var(--fg-muted); }
        .nav-btn-pill { border-radius: 10px; width: auto; padding: 0 14px; height: 36px; border: 1px solid var(--border2); background: var(--surface2); color: var(--fg-muted); font-size: .8rem; font-weight: 600; cursor: pointer; transition: all 0.18s; font-family: inherit; }
        .nav-btn-pill:hover:not(:disabled) { border-color: var(--teal); color: var(--teal); }
        .nav-btn-pill:disabled { opacity: 0.3; cursor: default; }
        .reading-body { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; margin-bottom: 14px; }
        .chapter-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; color: var(--teal); margin-bottom: 20px; }
        .verse-line { margin-bottom: 2px; }
        .verse-num { font-size: 0.65rem; font-weight: 700; color: var(--teal); vertical-align: super; margin-right: 4px; }
        .verse-body { font-family: 'Lora', Georgia, serif; font-size: 1rem; line-height: 1.88; color: var(--fg); }

        /* EXT LINKS */
        .ext-link, .book-link { display: flex; align-items: center; gap: 10px; padding: 14px 18px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 12px; color: var(--fg-muted); font-size: 0.84rem; font-weight: 500; text-decoration: none; margin-bottom: 10px; transition: border-color 0.18s; }
        .ext-link:hover { border-color: var(--teal); color: var(--teal); }
        .book-link { color: var(--blue); }
        .book-link:hover { border-color: var(--blue); background: var(--blue-dim); }
        .ext-link-icon, .ext-link-text { flex-shrink: 0; }
        .ext-link-text { flex: 1; }

        /* PROGRESS */
        .progress-wrap { margin: 14px 0 4px; }
        .progress-label { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--fg-muted); margin-bottom: 6px; }
        .progress-bar { height: 3px; border-radius: 2px; background: var(--border); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .teal-bg { background: var(--teal); }
        .blue-bg { background: var(--blue); }

        /* BOOK */
        .book-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px; }
        .book-cover { width: 64px; height: 90px; border-radius: 6px; flex-shrink: 0; background: linear-gradient(145deg, #1a3a6a, #0d2048); border: 1px solid rgba(106,171,247,.3); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
        .book-info { flex: 1; min-width: 0; }
        .book-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; line-height: 1.3; color: var(--fg); margin-bottom: 4px; }
        .book-author { font-size: 0.8rem; color: var(--fg-muted); margin-bottom: 10px; }
        .quote-block { border-left: 2px solid var(--blue); padding-left: 18px; margin: 16px 0; }
        .quote-text { font-family: 'Playfair Display', Georgia, serif; font-size: 1rem; font-style: italic; line-height: 1.72; color: var(--fg); }
        .quote-author { font-size: 0.7rem; color: var(--fg-muted); margin-top: 8px; }

        /* PRAYER */
        .prayer-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 22px; margin-bottom: 14px; position: relative; overflow: hidden; }
        .prayer-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--rose), transparent); }
        .prayer-moment { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rose); margin-bottom: 6px; }
        .prayer-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.08rem; color: var(--fg); margin-bottom: 16px; }
        .prayer-text { font-family: 'Lora', Georgia, serif; font-size: 1rem; line-height: 2; color: var(--fg); white-space: pre-line; }
        .prayer-source { font-size: 0.68rem; color: var(--fg-dim); margin-top: 14px; font-style: italic; }

        /* PLAN TABLE */
        .plan-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .plan-table th { text-align: left; color: var(--fg-muted); font-weight: 600; font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .plan-table td { padding: 10px 0; border-bottom: 1px solid var(--border); color: var(--fg-muted); vertical-align: top; }
        .plan-table td:first-child { color: var(--fg); font-weight: 500; padding-right: 12px; white-space: nowrap; }
        .plan-table tr.now td:first-child { color: var(--teal); font-weight: 600; }

        /* REFLECT */
        .reflect-hint { font-size: .8rem; color: var(--fg-muted); margin-bottom: 10px; }
        .reflect-textarea { width: 100%; min-height: 120px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 10px; color: var(--fg); font-family: 'Lora', Georgia, serif; font-size: .95rem; line-height: 1.75; padding: 14px; resize: vertical; outline: none; }
        .reflect-textarea:focus { border-color: var(--fg-dim); }
        .reflect-past { margin-top: 10px; padding: 12px; background: var(--surface2); border-radius: 10px; border-left: 2px solid var(--border2); }
        .reflect-past-date { font-size: .68rem; color: var(--fg-dim); margin-bottom: 6px; }
        .reflect-past-text { font-size: .88rem; color: var(--fg-muted); line-height: 1.6; }

        /* BOOKLIST */
        .booklist-item { display: flex; align-items: flex-start; gap: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border); margin-top: 8px; }
        .booklist-item:last-child { border-bottom: none; padding-bottom: 0; }
        .booklist-num { font-size: .68rem; color: var(--violet); font-weight: 700; letter-spacing: .06em; padding-top: 2px; min-width: 22px; }
        .booklist-title { font-weight: 600; font-size: .9rem; color: var(--fg); }
        .booklist-author { font-size: .75rem; color: var(--fg-muted); margin: 1px 0; }

        /* ═══ INVENTÁRIO ═══ */
        .inv-tabs { display: flex; gap: 4px; margin-bottom: 20px; background: var(--surface); border-radius: 12px; padding: 4px; border: 1px solid var(--border); }
        .inv-tab { flex: 1; padding: 10px; border: none; background: none; color: var(--fg-muted); font-family: inherit; font-size: .82rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.18s; }
        .inv-tab.active { background: var(--surface2); color: var(--amber); }
        .inv-date { font-size: .82rem; color: var(--fg-muted); margin-bottom: 20px; text-align: center; }
        .inv-section { margin-bottom: 20px; }
        .inv-label { display: block; font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; }
        .inv-textarea { width: 100%; min-height: 90px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; color: var(--fg); font-family: 'Lora', Georgia, serif; font-size: .92rem; line-height: 1.7; padding: 14px; resize: vertical; outline: none; transition: border-color 0.18s; }
        .inv-textarea:focus { border-color: var(--amber); }
        .inv-saved { text-align: center; font-size: .72rem; color: var(--fg-dim); padding: 8px 0; }

        /* MOOD */
        .mood-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .mood-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; cursor: pointer; transition: all 0.18s; min-width: 50px; }
        .mood-btn.selected { border-color: var(--amber); background: rgba(230,172,60,.08); }
        .mood-emoji { font-size: 1.4rem; }
        .mood-label { font-size: .6rem; color: var(--fg-muted); font-family: inherit; }

        /* WEEK VIEW */
        .inv-week-title { font-size: .82rem; color: var(--fg-muted); margin-bottom: 16px; }
        .week-strip { display: flex; gap: 4px; margin-bottom: 20px; }
        .week-day { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; background: var(--surface); border-radius: 10px; border: 1px solid var(--border); }
        .week-day.today { border-color: var(--amber); background: rgba(230,172,60,.06); }
        .week-day-name { font-size: .58rem; font-weight: 600; color: var(--fg-dim); letter-spacing: .04em; text-transform: uppercase; }
        .week-day-mood { font-size: 1.2rem; min-height: 1.5em; display: flex; align-items: center; }
        .week-day-date { font-size: .62rem; color: var(--fg-muted); }

        .week-stats { display: flex; gap: 12px; margin-bottom: 20px; }
        .week-stat { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px; text-align: center; }
        .week-stat-num { font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; color: var(--amber); }
        .week-stat-label { font-size: .68rem; color: var(--fg-muted); margin-top: 4px; }

        .inv-entry { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 18px; margin-bottom: 12px; }
        .inv-entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .inv-entry-date { font-size: .72rem; color: var(--fg-muted); font-weight: 600; }
        .inv-entry-mood { font-size: 1.2rem; }
        .inv-entry-field { margin-bottom: 8px; }
        .inv-entry-field:last-child { margin-bottom: 0; }
        .inv-entry-label { font-size: .66rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-right: 8px; }
        .inv-entry-text { font-size: .86rem; color: var(--fg); line-height: 1.5; }
        .inv-empty { text-align: center; color: var(--fg-dim); font-size: .88rem; padding: 40px 0; }

        /* REUNIÕES */
        .card-violet-border { border: 1px solid var(--violet); }
        .card-violet-bg { background: rgba(167,139,250,.05); }
        .card-blue-border { border: 1px solid var(--blue); }
        .meeting-phone-row { display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface2); border-radius: 10px; margin-top: 8px; }
        .meeting-phone-icon { font-size: 1.3rem; flex-shrink: 0; }
        .meeting-phone-label { font-size: .68rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
        .meeting-phone-num { font-size: 1rem; font-weight: 600; color: var(--fg); margin: 2px 0; }
        .meeting-phone-sub { font-size: .72rem; color: var(--fg-muted); line-height: 1.4; }
        .meeting-item { padding: 14px 0; border-bottom: 1px solid var(--border); }
        .meeting-item:last-child { border-bottom: none; padding-bottom: 0; }
        .meeting-item:first-child { padding-top: 0; }
        .meeting-nome { font-size: .92rem; font-weight: 600; color: var(--fg); margin-bottom: 6px; }
        .meeting-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
        .meeting-tag { font-size: .72rem; font-weight: 500; }
        .meeting-formato { font-size: .78rem; color: var(--fg-muted); margin-bottom: 4px; }
        .meeting-nota { font-size: .73rem; color: var(--fg-dim); font-style: italic; margin-bottom: 8px; line-height: 1.4; }
        .meeting-link { display: inline-block; font-size: .75rem; color: var(--teal); text-decoration: none; font-weight: 600; }
        .meeting-link:hover { text-decoration: underline; }
      `}</style>
    </>
  )
}
