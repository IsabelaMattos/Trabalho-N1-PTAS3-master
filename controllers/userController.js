const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { nome, senha, email} = req.body;
    await User.create({
       nome:nome,
       email:email,
       senha:senha 

    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso!');
        console.log('Cadastro de usuário realizado com sucesso!');
    }).catch((erro) => {
        res.json('Erro ao cadastrar');
        console.log(`Ops, deu erro: ${erro}`);
    })
} 
const findUsers = async (req, res) => {
    const users    = await User.findAll();
    try {
        res.json(  users  );
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.json("   Deletado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("   Erro ao deletar   ");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {  nome, email, senha     } = req.body;
    try {
        await User.update(
            {
                nome:nome,
                email:email,
                senha:senha 
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json(" Atualizado com sucesso!           ");
        })
    } catch (error) {
        res.status(404).json(" Erro ao atualizar               !");
    }
}
const authenticatedUser = async (req, res) => {
    const {   email, senha    } = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
               
                email:email,
                senha:senha 
            }
        })
        const token = jwt.sign({
            email: isUserAuthenticated.email,
            senha: isUserAuthenticated.senha
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            email: isUserAuthenticated.email,
            senha: isUserAuthenticated.senha,
            token: token
        });
    } catch (error) {
        return res.json("Erro na autenticação");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
