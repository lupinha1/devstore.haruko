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
