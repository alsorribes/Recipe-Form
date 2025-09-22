// src/app/features/recetas/pages/receta-form/receta-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// Importa componentes Ionic standalone
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonGrid,
  IonRow, IonCol, IonText, IonNote, IonListHeader, IonBadge, IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Ionic UI
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonGrid,
    IonRow, IonCol, IonText, IonNote, IonListHeader, IonBadge, IonFooter
  ],
  templateUrl: './form.html',
})
export class FormComponent {
  recetaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recetaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      porciones: [1, [Validators.required, Validators.min(1)]],
      ingredientes: this.fb.array([this.crearIngrediente()]),
      pasos: this.fb.array([this.crearPaso()]),
    });
  }

  // Subformularios
  crearIngrediente(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidad: [''],
    });
  }

  crearPaso(): FormGroup {
    return this.fb.group({
      titulo: ['Paso', Validators.required],
      detalle: ['', Validators.required],
      tiempoMin: [0, [Validators.min(0)]],
    });
  }

  // Getters
  get ingredientes(): FormArray {
    return this.recetaForm.get('ingredientes') as FormArray;
  }

  get pasos(): FormArray {
    return this.recetaForm.get('pasos') as FormArray;
  }

  // Acciones
  addIngrediente() {
    this.ingredientes.push(this.crearIngrediente());
  }
  removeIngrediente(i: number) {
    this.ingredientes.removeAt(i);
  }

  addPaso() {
    this.pasos.push(this.crearPaso());
  }
  removePaso(i: number) {
    this.pasos.removeAt(i);
  }

  guardar() {
    if (this.recetaForm.invalid) {
      this.recetaForm.markAllAsTouched();
      return;
    }
    console.log('Receta:', this.recetaForm.value);
    alert('Receta guardada (mira la consola) ✅');

    // reset dejando un elemento en cada FormArray
    this.recetaForm.reset({ porciones: 1 });
    this.ingredientes.clear();
    this.pasos.clear();
    this.addIngrediente();
    this.addPaso();
  }
}
