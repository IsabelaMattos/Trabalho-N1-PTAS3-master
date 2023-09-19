const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    await User.create({
       name:name,
       email:email,
       password:password 

    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso!');
        console.log('Cadastro de usuário realizado com sucesso!');
    }).catch((erro) => {
        res.json('Erro ao cadastrar');
        console.log(`Ops, deu erro: ${erro}`);
    })
} 
const findUsers = async (req, res) => {
    const users = await User.findAll();
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
            res.json("Deletado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("Erro ao deletar");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, password} = req.body;
    try {
        await User.update(
            {
                name:name,
                email:email,
                password:password 
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Atualizado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("Erro ao atualizar!");
    }
}
const authenticatedUser = async (req, res) => {
    const {   email, password    } = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                email:email,
                password:password 
            }
        })
        const token = jwt.sign({
            email: isUserAuthenticated.email,
            password: isUserAuthenticated.password
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            email: isUserAuthenticated.email,
            password: isUserAuthenticated.password,
            token: token
        });
    } catch (error) {
        return res.json("Erro na autenticação");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
