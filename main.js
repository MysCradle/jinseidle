class Personagem {
    constructor(nome, idade, raca, especialidade, reino, organizacao, vivo){
        this.nome = nome;
        this.idade = idade;
        this.raca = raca;
        this.especialidade = especialidade;
        this.reino = reino;
        this.organizacao = organizacao;
        this.vivo = vivo;
    }
}

const personagens = new Set()
personagens.add(new Personagem('Astas', 240, 'Humano', 'Mago', 'Astas', 'Realeza', true))
personagens.add(new Personagem('Apoena', 300, 'Humano', 'Investigador', 'Apoena', 'Realeza', true))
personagens.add(new Personagem('Fukushi', 234, 'Humano', 'Feiticeiro', 'Fukushi', 'Realeza', true))
personagens.add(new Personagem('Samir', 200, 'Humano', 'Lutador', 'Samir', 'Realeza', true))

personagens.add(new Personagem('Boíren', 36, 'Híbrido', 'Ferreiro', 'Astas', '???', true))
personagens.add(new Personagem('Boris', 50, 'Humano', 'Feiticeiro', 'Astas', '???', true))
personagens.add(new Personagem('Kamai', 20, 'Híbrido', 'Andarilho', 'Apoena', '???', true))
personagens.add(new Personagem('Taira', 15, 'Humano', 'Mago', 'Samir', '???', true))
personagens.add(new Personagem('Zack', 15, 'Humano', 'Espadashin', 'Samir', '???', true))

personagens.add(new Personagem('Billat', 18, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Jasper', 22, 'Humano', 'Mercenario', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Sifor', 120, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Sudoki', 22, 'Humano', 'Arqueiro', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Hooda', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Kalleb', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('André', 30, 'Monstro', 'Mago', 'Apoena', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Dr Klaus', 34, 'Monstro', 'Ferreiro', 'Apoena', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Ivan', 20, 'Monstro', 'Lutador', 'Astras', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Matheus', 30, 'Humano', 'Atirador', 'Fukushi', 'Jinsei no Unmei', true))
personagens.add(new Personagem('MAGICO', 95, 'Humano', 'Mago', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('LD3', 83, 'Humano', 'Lutador', 'Samir', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Dansha', 42, 'Monstro', 'Lutador', 'Apoena', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Dionni', 20, 'Humano', 'Mago', 'Fukushi', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Freire', 25, 'Humano', 'Caçador', 'Astas', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Maggye', 60, 'Humano', 'Mago', 'Samir', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Mia', 15, 'Lobo', 'Caçador', 'Astas', 'Jinsei no Unmei', null))

personagens.add(new Personagem('Dinathy', 40, 'Híbrido', 'Investigador', 'Astas', 'Redemons', true))
personagens.add(new Personagem('Killer', 25, 'Híbrido', 'Investigador', 'Astas', 'Redemons', true))
personagens.add(new Personagem('Wir', 60, 'Humano', 'Mago', 'Apoena', 'Redemons', true))
personagens.add(new Personagem('Sammie', 19, 'Monstro', 'Feiticeiro', 'Apoena', 'Redemons', true))
personagens.add(new Personagem('Kanji', 19, 'Meio-Demônio', 'Feiticeiro', 'Fukushi', 'Redemons', true))

personagens.add(new Personagem('BloodHill', 60, '???', 'Atirador', '???', '???', true))
personagens.add(new Personagem('Jhon', 54, '???', 'Lutador', '???', '???', true))

let dicionarioImagens = {};

async function inicializar() {
    try {
        const resposta = await fetch('https://myscradle.github.io/galeria/images.json');
        dicionarioImagens = await resposta.json();
    } catch (err) {
        console.error("Erro ao carregar dicionário de imagens", err);
    } finally {
        // Garante que o histórico só carregue DEPOIS de tentarmos baixar as imagens
        carregarHistorico();
    }
}

inicializar();

const dataInicio = new Date('2026-01-10T00:00:00')
const hoje = new Date()
hoje.setHours(0,0,0,0)

const submit = document.getElementById("submit")
const tbody = document.getElementById("tbody")
const test = document.getElementById("teste")
const fim = document.getElementById("fim")
const inputTeste = document.getElementById('teste');
const listaSugestoes = document.getElementById('sugestoes');
const images = document.getElementById('images');
images.innerHTML = ''
const jogos = document.getElementById('jogos');
let listaPersonagens = ''


let currentGame = hoje;
const personagemSorteado = sortearPersonagem()

const listaDias = []

for (let d = new Date(dataInicio); d<=hoje; d.setDate(d.getDate()+1)){
    listaDias.push(new Date(d).toISOString().split('T')[0])
    const opt = document.createElement('option')
    const [day,month,year] = [d.getDate(),String(d.getMonth() + 1).padStart(2, '0'),d.getFullYear()]
    opt.textContent = `${day}/${month}/${year}`
    opt.value = new Date(d).toISOString().split('T')[0]
    if (d.toDateString() === hoje.toDateString()) {
        opt.selected=true;
    }
    jogos.prepend(opt) 
}

jogos.addEventListener('change', (e)=>{
    const aux = e.target.value
    currentGame = new Date(aux+'T00:00:00')
    atualizarJogo();
})

let personagemSorteadoAtivo = sortearPersonagem();

function atualizarJogo() {
    personagemSorteadoAtivo = sortearPersonagem();
    tbody.innerHTML = ''; // Limpa a tabela para o novo dia
    fim.textContent = ''; // Limpa o "Parabéns"
    images.innerHTML = ''; // Limpa a imagem
    
    // Opcional: Recarregar histórico específico daquela data
    carregarHistorico(); 
}

///////////////

inputTeste.addEventListener('input', () => {
    const valorDigitado = inputTeste.value.toLowerCase();
    
    listaSugestoes.innerHTML = '';

    if (valorDigitado.length > 0) {
        
        const filtrados = [...personagens].filter(p => 
            p.nome.toLowerCase().includes(valorDigitado)
        )
        filtrados.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.nome;

            li.addEventListener('click', () => {
                inputTeste.value = p.nome;
                listaSugestoes.style.display = 'none';
            });

            listaSugestoes.appendChild(li);
        })

        listaSugestoes.style.display = filtrados.length > 0 ? 'block' : 'none';
    } else {
        listaSugestoes.style.display = 'none';
    }
})

document.addEventListener('click', (e) => {
    if (e.target !== inputTeste) {
        listaSugestoes.style.display = 'none';
    }
});

///////////////


function agendarMeiaNoite() {
    const agora = new Date();
    const amanha = new Date(agora);
    
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(0, 0, 0, 0);

    const tempoAteMeiaNoite = amanha - agora;

    setTimeout(() => {
        sortearPersonagem();
        
        setInterval(sortearPersonagem, 24 * 60 * 60 * 1000);
    }, tempoAteMeiaNoite);
}

function sortearPersonagem() {
    if (personagens.size === 0) return console.log("Set vazio.");
    
    const selecionado = obterPersonagemDoDia()
    console.log("Personagem do Dia:", selecionado.nome);
    console.table(selecionado);
    return selecionado
}

agendarMeiaNoite();

function obterPersonagemDoDia() {
    const itens = Array.from(personagens);
    const hoje = currentGame;
    
    const seedBase = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
    
    const pseudoRandom = Math.abs(Math.sin(seedBase) * 10000);
    
    const indiceDessaData = Math.floor(pseudoRandom % itens.length);
    
    return itens[indiceDessaData];
}


submit.addEventListener('click', () => {
    const personagemTestado = personagemExiste(test.value);
    if (!personagemTestado) return;

    const dataChave = `historico_${currentGame.toISOString().split('T')[0]}`;
    
    const historicoRaw = localStorage.getItem(dataChave);
    const historico = historicoRaw ? JSON.parse(historicoRaw) : [];

    if (!historico.some(p => p.nome === personagemTestado.nome)) {
        historico.push(personagemTestado);
        localStorage.setItem(dataChave, JSON.stringify(historico));
        gerarPersonagem(personagemTestado, true);
    }

    if (personagemTestado.nome === personagemSorteadoAtivo.nome) {
        fim.textContent = "Parabéns!";
        registrarVitoria(); 
        exibirContagemVitorias();
    }

    test.value = "";
});
function gerarPersonagem(personagem, atualizaImg){
    const tr = document.createElement('tr')
    
    const colunas = ["Nome", "Idade", "Raça", "Especialidade", "Reino", "Organização", "Status"];
    let i = 0;
    for (let atr in personagem) {
        if (Object.hasOwn(personagem, atr)) {
            if (atr === 'imagem') continue
            const td = document.createElement('td');
            
            // Adiciona o atributo data-label para o CSS Mobile
            td.setAttribute('data-label', colunas[i]);
            
            let valor = personagem[atr];
            if (atr === 'vivo') {
                if (valor === true) valor = "Sim";
                else if (valor === false) valor = "Não";
                else if (valor === null) valor = "???"; // Trata o caso da Mia
            }
            if (atr === 'idade') {
                if (valor < personagemSorteadoAtivo[atr]) valor = `${valor} <`
                else if (valor > personagemSorteadoAtivo[atr]) valor = `${valor} >`
            }
            td.textContent = valor;
            if (personagem[atr] !== personagemSorteadoAtivo[atr]){
                td.className = 'errado'
            }else {
                td.className = 'certo'
            }
            tr.appendChild(td);
            i++;
        }
    }
    
    images.innerHTML = `<img src="${buscarImagem(personagem.nome)}" alt="${personagem.nome}">`
    
    tbody.prepend(tr)
}

function carregarHistorico() {
    tbody.innerHTML = '';
    images.innerHTML = '';
    fim.textContent = '';

    const dataChave = `historico_${currentGame.toISOString().split('T')[0]}`;
    const salvo = localStorage.getItem(dataChave);
    
    if (salvo) {
        const historico = JSON.parse(salvo);
        // 2. Renderiza cada tentativa salva
        historico.forEach(p => {
            gerarPersonagem(p, false);
            // 3. Verifica se o usuário já tinha ganhado nesse dia
            if (p.nome === personagemSorteadoAtivo.nome) {
                fim.textContent = "Parabéns!";
            }
        });
    }
}

// Vitórias

function registrarVitoria() {
    const hoje = new Date().toDateString();
    const ultimaVitoria = localStorage.getItem('ultimaVitoriaData');

    // Só incrementa se a última vitória registrada não for a de hoje
    if (ultimaVitoria !== hoje) {
        let vitoriasAcumuladas = parseInt(localStorage.getItem('vitoriasTotais')) || 0;
        vitoriasAcumuladas++;
        
        localStorage.setItem('vitoriasTotais', vitoriasAcumuladas);
        localStorage.setItem('ultimaVitoriaData', hoje); // Marca que já ganhou hoje
        
        exibirContagemVitorias();
    }
}

function exibirContagemVitorias() {
    const total = localStorage.getItem('vitoriasTotais') || 0;
    const elementoContador = document.getElementById("contador-vitorias");
    if (elementoContador) {
        elementoContador.textContent = `Jogos ganhos: ${total}`;
    }
}


//UTILS
function personagemExiste(teste){
    return [...personagens].find(p=>p.nome===teste)||null
}

const light = document.getElementById("light")

light.addEventListener('click', ()=>{
    if (document.body.classList.contains('tema--escuro')){
        document.body.classList.remove('tema--escuro')
        document.body.classList.add('tema--claro')
    }else{
        document.body.classList.remove('tema--claro')
        document.body.classList.add('tema--escuro')
    }
})


function buscarImagem(nome) {
    return dicionarioImagens[nome] || "https://myscradle.github.io/images/jinseidle-icon.png";
}