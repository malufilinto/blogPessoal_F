import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';



@Component({

    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


    postagem: Postagem = new Postagem()
    listaPostagens: Postagem[]

    tema: Tema = new Tema()
    listaTemas: Tema[]
    idTema: number

    user: User = new User
    idUser = environment.id


    constructor(
        private router: Router,
        private PostagemService: PostagemService,
        private temaService: TemaService
    ) { }

    ngOnInit(): void {

        if (environment.token == '') {
            // alert ('sua sessão expirou, faça o login novamente.')
            this.router.navigate(['/entrar'])
        }
        this.getAllTemas()
        this.getAllPostagens()
    }

    getAllTemas() {
        this.temaService.getAllTema().subscribe((resp: Tema[]) => {
            this.listaTemas = resp
        })
    }
    findByIdTema() {
        this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
            this.tema = resp
        })
    }

    getAllPostagens() {
        this.PostagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
            this.listaPostagens = resp
        })
    }

    publicar() {
        this.tema.id = this.idTema
        this.postagem.tema = this.tema

        this.user.id = this.idUser
        this.postagem.usuario = this.user

        this.PostagemService.postPostagem(this.postagem).subscribe((resp) => {
            this.postagem = resp
            alert('Postagem realizada com sucesso!')

            this.postagem = new Postagem()
        })
    }
}