import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';
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
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
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
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: string;

  phoneTypes: string[] = ['Movil', 'Casa', 'Trabajo'];
  emailTypes: string[] = ['Personal', 'Trabajo'];

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id')!;
    this.loadContact();
  }

  // Método para cargar los datos del contacto existente
  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe(contact => {
      this.contactForm.patchValue(contact);

      // Rellenar los formularios dinámicos (telefonos, emails, direcciones)
      this.setFormArray('telefonos', contact.telefonos);
      this.setFormArray('emails', contact.emails);
      this.setFormArray('direcciones', contact.direcciones);
    });
  }

  // Método para rellenar los formularios dinámicos con datos existentes
  setFormArray(arrayName: string, items: any[]): void {
    const formArray = this.contactForm.get(arrayName) as FormArray;
    items.forEach(item => {
      formArray.push(this.fb.group(item));
    });
  }

  // Obtener los controles de formularios dinámicos
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
      email: ['', [Validators.required, Validators.email]],
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

  // Método para enviar el formulario
  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(
        () => {
          this.snackBar.open('Contacto actualizado exitosamente!', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/contacts']);
        },
        (error) => {
          // Mostrar mensaje de error usando MatSnackBar
          if (error.error && error.error.message) {
            this.snackBar.open(`Error: ${error.error.message}`, 'Cerrar', {
              duration: 5000,
            });
          } else {
            this.snackBar.open('Error al actualizar el contacto.', 'Cerrar', {
              duration: 5000,
            });
          }
        }
      );
    }
  }
  

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
