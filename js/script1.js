class Servico {

    constructor() {
        this.id = 1;
        this.arrayServicos = [];
        this.editId = null;
        this.contador = 0;
    }

    salvar() {
        let servico = this.lerDados();

        if(this.validaCampos(servico)) { // condicional VERDADEIRA
            if(this.editId == null) {
                this.adicionar(servico);
                this.cancelar();
            } else {
                this.atualizar(this.editId, servico);
                this.cancelar();
            }
        }

        this.listaTabela();
        this.calculoLucro();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayServicos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_cliente = tr.insertCell();
            let td_servico = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayServicos[i].id;
            td_cliente.innerText = this.arrayServicos[i].cliente;
            td_servico.innerText = this.arrayServicos[i].nomeServico;
            td_preco.innerText = this.arrayServicos[i].preco;

            td_id.classList.add('center');
            td_preco.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick", "servico.preparaEditacao("+ JSON.stringify(this.arrayServicos[i]) +")");
            
            td_acoes.appendChild(imgEdit);
        }
    }

    adicionar(servico) {
        servico.preco = parseFloat(servico.preco);
        this.arrayServicos.push(servico);
        this.id++;
    }

    calculoLucro() {
        for(let i = 0; i < this.arrayServicos.length; i++) {
            this.contador = parseFloat((parseFloat(this.contador) + parseFloat(this.arrayServicos[i].preco)).toFixed(2));
        }
        document.getElementById('lucroTotal').innerText = ('R$ ' + this.contador);
        this.contador = 0;
    }

    atualizar(id, servico) {
        for(let i = 0; i < this.arrayServicos.length; i++) {
            if(this.arrayServicos[i].id == id) {
                this.arrayServicos[i].cliente = servico.cliente;
                this.arrayServicos[i].nomeServico = servico.nomeServico;
                this.arrayServicos[i].preco = servico.preco;
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;

        document.getElementById('cliente').value = dados.cliente;
        document.getElementById('servico').value = dados.nomeServico;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('exchangeButton').innerText = 'Atualizar';
    }

    lerDados() {
        let servico = {}

        servico.id = this.id;
        servico.cliente = document.getElementById('cliente').value;
        servico.nomeServico = document.getElementById('servico').value;
        servico.preco = document.getElementById('preco').value;

        return servico;
    }

    validaCampos(servico) {
        let msg = '';

        if(servico.cliente == '') {
            msg += '- Informe o nome do cliente \n';
        }

        if(servico.nomeServico == ''){
            msg += '- Selecione um tipo serviço \n';
        }

        if(servico.preco == '') {
            msg += '- Informe o preço do serviço';
        }

        if(msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('cliente').value = '';
        document.getElementById('servico').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('exchangeButton').innerText = 'Salvar';
        this.editId = null;
    }
}

var servico = new Servico();