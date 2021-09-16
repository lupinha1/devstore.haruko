import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try{
        let produtos = await db.tb_produto.findAll({ order: [['id_produto', 'desc' ]] });
        resp.send(produtos);
    } catch(e){
        resp.send({erro : e.toString()})
    }
});




app.post('/produto', async (req, resp) => {
    try{
        let { nome, categoria, avaliacao, precode, precopor, estoque, linkimagem, descricao} = req.body;
        let u = req.body;
        console.log(u)

        // validações campos obrigatórios

        if(!/./.test(u.nome))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.categoria))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.avaliacao))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.precode))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
        
        if(!/./.test(u.precopor))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.estoque))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.linkimagem))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})
    
        if(!/./.test(u.descricao))
            return resp.send({erro: 'Todos os campos devem ser preenchidos'})

        // validação produto repetido
        
        
        let x = await db.tb_produto.findOne( { where: { nm_produto: u.nome }})

        if(x != null)
            return resp.send({erro: 'Produto já existe'})    
            
        // validação avaliacao, estoque e precos serem numeros

        if (isNaN(u.avaliacao) === true)
            return resp.send({erro: 'Avaliação deve ser um número'})
        
        if (isNaN(u.precode) === true || isNaN(u.precopor) === true)
            return resp.send({erro: 'Peços devem ser números'})  
            
        if (isNaN(u.estoque) === true)
            return resp.send({erro: "Estoque deve ser um número"})


    

        let a = new Date();
        
        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_avaliacao: avaliacao,
            vl_preco_de: precode,
            vl_preco_por: precopor,
            qtd_estoque: estoque,
            img_produto: linkimagem,
            ds_produto: descricao,
            dt_inclusao: a
        })
        resp.send(r);
        
    } catch(e){
        resp.send({erro : e.toString()})
    }
});

app.put('/produto/:id', async (req, resp) => {
    try{
        let { nome, categoria, avaliacao, precode, precopor, estoque, linkimagem, descricao} = req.body;






        let { id } = req.params;

        let r = await db.tb_produto.update(
            {
                nm_produto: nome,
                ds_categoria: categoria,
                vl_avaliacao: avaliacao,
                vl_preco_de: precode,
                vl_preco_por: precopor,
                qtd_estoque: estoque,
                img_produto: linkimagem,
                ds_produto: descricao
            },
            {
                where: {id_produto : id}
            }
        )
            resp.sendStatus(200)

    } catch(e){
        resp.send({erro : e.toString()})
    }
});

app.delete('/produto/:id', async (req, resp) => {
    try{
        let { id } = req.params;
        
        let r = await db.tb_produto.destroy({ where: {id_produto : id}})
        resp.sendStatus(200)
    } catch(e){
        resp.send({erro : e.toString()})
    }
});

app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))
