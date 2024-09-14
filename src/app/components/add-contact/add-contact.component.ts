import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDividerModule
  ]
})
export class AddContactComponent {
  contactForm: FormGroup;

  // Opciones para tipo de teléfono y tipo de email
  phoneTypes: string[] = ['Movil', 'Casa', 'Trabajo'];
  emailTypes: string[] = ['Personal', 'Trabajo'];

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      notas: [''],
      fecha_cumple: [''],
      pagina_web: [''],
      empresa: [''],
      telefonos: this.fb.array([]),
      emails: this.fb.array([]),
      direcciones: this.fb.array([])
    });
  }
  get telefonos(): FormArray {
    return this.contactForm.get('telefonos') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get direcciones(): FormArray {
    return this.contactForm.get('direcciones') as FormArray;
  }

  // Métodos para agregar controles dinámicos
  addPhone() {
    this.telefonos.push(this.fb.group({
      numero: ['', Validators.required],
      tipo: [''] 
    }));
  }

  addEmail() {
    this.emails.push(this.fb.group({
      email: ['', [Validators.required]],
      tipo: ['']
    }));
  }

  addAddress() {
    this.direcciones.push(this.fb.group({
      direccion: ['', Validators.required],
      ciudad: [''],
      estado: [''],
      pais: [''],
      codigo_postal: ['']
    }));
  }

  // Métodos para eliminar controles dinámicos
  removePhone(index: number) {
    this.telefonos.removeAt(index);
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  removeAddress(index: number) {
    this.direcciones.removeAt(index);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.value).subscribe(
        (response) => {
          this.snackBar.open('Contacto agregado exitosamente!', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/contacts']);
        },
        (error) => {
      
          if (error.error && error.error.message) {
            this.snackBar.open(`Error: ${error.error.message}`, 'Cerrar', {
              duration: 5000,
            });
          } else {
            this.snackBar.open('Error al agregar el contacto.', 'Cerrar', {
              duration: 5000,
            });
          }
  
          if (error.error && error.error.errors) {
            for (const key in error.error.errors) {
              if (this.contactForm.get(key)) {
                this.contactForm.get(key)?.setErrors({ backend: error.error.errors[key] });
              }
            }
          }
        }
      );
    }
  }
  
  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
