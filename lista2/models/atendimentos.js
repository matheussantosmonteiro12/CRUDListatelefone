const conexao = require('../infraestrutura/conexao')
console.log('conectado com sucesso')
class Atendimento {
    
    adiciona(atendimento,res) {
        const sql = 'INSERT INTO Atendimentos SET ?'
        const clienteEhValido = atendimento.cliente.length  >= 5  
        const telefoneEhValido = atendimento.telefone.length >= 10
        const validacoes = [
            
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            },
            {
                nome: 'telefone',
                valido: telefoneEhValido,
                mensagem: 'Cliente deve ter pelo menos 10 caracteres'
            },

        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        }else{
            conexao.query(sql, atendimento, (erro, resultados) => {
                if(erro) {
                    res.json(erro)
                } else {
                    res.json(resultados)
                }
            })
        }
       
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'
    
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }
    altera(id, valores, res) {  
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }    

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }

        
    


    


}



module.exports = new Atendimento