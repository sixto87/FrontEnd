import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import {  Habilidades } from './habilidad';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  
  habilidades!: Habilidades[];
  
 
  
  constructor(public SkillService: SkillService, public authservice:AuthService) { 
    
    
  }

  ngOnInit() {
    this.SkillService.getSkills().subscribe(
      habilidades => this.habilidades = habilidades
    );
  }

  delete(habilidades: Habilidades  ): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Seguro quieres borrar la informacion de ${habilidades.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.SkillService.delete(habilidades.id).subscribe(
          response => {
            this.habilidades = this.habilidades.filter(bas => bas !== habilidades)
            swalWithBootstrapButtons.fire(
              'Informacion Eliminada!',
              `Informacion de ${habilidades.nombre} eliminada`,
              'success'
            )
          }
        )
        
      } 
    })
  }


}
