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
personagens.add(new Personagem('Sudoki', 22, 'Humano', 'Arqueiro', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Jasper', 22, 'Humano', 'Mercenario', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Billat', 18, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Sifor', 120, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Astas', 240, 'Humano', 'Mago', 'Astas', 'não', true))
personagens.add(new Personagem('Fukushi', 234, 'Humano', 'Feiticeiro', 'Fukushi', 'não', true))
personagens.add(new Personagem('Samir', 200, 'Humano', 'Lutador', 'Samir', 'não', true))
personagens.add(new Personagem('Apoena', 300, 'Humano', 'Investigador', 'Apoena', 'não', true))
personagens.add(new Personagem('Dionni', 20, 'Humano', 'Mago', 'Fukushi', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Maggye', 60, 'Humano', 'Mago', 'Samir', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Freire', 25, 'Humano', 'Caçador', 'Astas', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Mia', 15, 'Lobo', 'Caçador', 'Astas', 'Jinsei no Unmei', null))
personagens.add(new Personagem('Kalleb', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Hooda', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('MAGICO', 95, 'Humano', 'Mago', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('LD3', 83, 'Humano', 'Lutador', 'Samir', 'Jinsei no Unmei', true))

personagens.add(new Personagem('Dinathy', 19, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Killer', 19, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Wir', 60, 'Humano', 'Mago', 'Apoena', 'Redemons', true))

///////////////

const inputTeste = document.getElementById('teste');
const listaSugestoes = document.getElementById('sugestoes');

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

const personagemSorteado = sortearPersonagem()

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
    const hoje = new Date();
    const seed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
    
    const indiceDessaData = seed % itens.length;
    return itens[indiceDessaData];
}
const submit = document.getElementById("submit")
const tbody = document.getElementById("tbody")
const test = document.getElementById("teste")
const fim = document.getElementById("fim")

function personagemExiste(teste){
    return [...personagens].find(p=>p.nome===teste)||null
}

submit.addEventListener('click', ()=>{
    const personagemTestado = personagemExiste(test.value)
    if (!personagemTestado) return;

    gerarPersonagem(personagemTestado)

    const historicoRaw = localStorage.getItem('historicoTentativas');
    const historico = historicoRaw ? JSON.parse(historicoRaw) : [];
    if (!historico.some(p => p.nome === personagemTestado.nome)) {
        historico.push(personagemTestado);
        localStorage.setItem('historicoTentativas', JSON.stringify(historico));
    }
    localStorage.setItem('historicoTentativas', JSON.stringify(historico));
    if (personagemTestado.nome === personagemSorteado.nome){
        fim.textContent = "Parabéns"
        registrarVitoria(); 
        exibirContagemVitorias();
    }
    test.value = ""
})

function gerarPersonagem(personagem){
    const tr = document.createElement('tr')

    const colunas = ["Nome", "Idade", "Raça", "Especialidade", "Reino", "Organização", "Status"];
    let i = 0;
    for (let atr in personagem) {
        if (Object.hasOwn(personagem, atr)) {
            const td = document.createElement('td');
            
            // Adiciona o atributo data-label para o CSS Mobile
            td.setAttribute('data-label', colunas[i]);
            
            let valor = personagem[atr];
            if (atr === 'vivo') {
                if (valor === true) valor = "Sim";
                else if (valor === false) valor = "Não";
                else if (valor === null) valor = "???"; // Trata o caso da Mia
            }
            td.textContent = valor;
            if (personagem[atr] !== personagemSorteado[atr]){
                td.className = 'errado'
            }else {
                td.className = 'certo'
            }
            tr.appendChild(td);
            i++;
        }
    }
    // for (let atr in personagem){
    //     const td = document.createElement('td')
    //     let valor = personagem[atr];
    //     if (atr === 'vivo') {
    //         if (valor === true) valor = "Sim";
    //         else if (valor === false) valor = "Não";
    //         else if (valor === null) valor = "???"; // Trata o caso da Mia
    //     }
    //     td.textContent = valor
    //     if (personagem[atr] !== personagemSorteado[atr]){
    //         td.className = 'errado'
    //     }else {
    //         td.className = 'certo'
    //     }
    //     tr.appendChild(td)
    // }
    tbody.prepend(tr)
}

function carregarHistorico() {
    const hoje = new Date().toDateString();
    const dataSalva = localStorage.getItem('dataJogo');
    
    if (dataSalva !== hoje) {
        localStorage.removeItem('historicoTentativas');
        localStorage.setItem('dataJogo', hoje);
        return; 
    }

    const salvo = localStorage.getItem('historicoTentativas');
    if (salvo) {
        const listaPersonagens = JSON.parse(salvo);
        listaPersonagens.forEach(p => {
            gerarPersonagem(p)
            if (p.nome === personagemSorteado.nome) {
                fim.textContent = "Parabéns";
                registrarVitoria(); 
                exibirContagemVitorias();
            }
        });
    }
}

carregarHistorico()

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