import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bin } from '../../model/bin.model';
import { BinService } from '../../services/bin.service';

@Component({
  selector: 'app-bin-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 720px; margin: 2rem auto; font-family: sans-serif;">
      <h2>EcoSmartBin - Gestión de Contenedores</h2>

      <form (ngSubmit)="guardarBin()" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <input
          type="text"
          [(ngModel)]="binActual.ubicacion"
          name="ubicacion"
          placeholder="Ubicación (ej. Torre A - Piso 1)"
          required
        />
        <input
          type="text"
          [(ngModel)]="binActual.nivelLlenado"
          name="nivelLlenado"
          placeholder="Nivel de llenado (ej. 40%)"
          required
        />
        <select [(ngModel)]="binActual.estado" name="estado">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
        <button type="submit">{{ editandoId ? 'Actualizar' : 'Registrar' }}</button>
        <button *ngIf="editandoId" type="button" (click)="limpiarFormulario()">Cancelar</button>
      </form>

      <p *ngIf="mensajeError" style="color: #b00020;">{{ mensajeError }}</p>

      <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Ubicación</th>
            <th>Nivel de llenado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let bin of bins">
            <td>{{ bin.ubicacion }}</td>
            <td>{{ bin.nivelLlenado }}</td>
            <td>{{ bin.estado || 'Activo' }}</td>
            <td>
              <button type="button" (click)="editarBin(bin)">Editar</button>
              <button type="button" (click)="eliminarBin(bin._id)">Eliminar</button>
            </td>
          </tr>
          <tr *ngIf="bins.length === 0">
            <td colspan="4" style="text-align: center;">No hay contenedores registrados aún.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class BinManagerComponent implements OnInit {
  private readonly binService = inject(BinService);

  bins: Bin[] = [];
  binActual: Bin = this.nuevoBinVacio();
  editandoId: string | null = null;
  mensajeError = '';

  ngOnInit(): void {
    this.cargarBins();
  }

  nuevoBinVacio(): Bin {
    return { ubicacion: '', nivelLlenado: '', estado: 'Activo' };
  }

  cargarBins(): void {
    this.mensajeError = '';
    this.binService.getBins().subscribe({
      next: (data) => (this.bins = data),
      error: () => (this.mensajeError = 'No se pudo cargar la lista de contenedores desde el backend.')
    });
  }

  guardarBin(): void {
    if (!this.binActual.ubicacion.trim() || !this.binActual.nivelLlenado.trim()) {
      return;
    }
    this.mensajeError = '';

    if (this.editandoId) {
      this.binService.updateBin(this.editandoId, this.binActual).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarBins();
        },
        error: () => (this.mensajeError = 'Error al actualizar el contenedor.')
      });
    } else {
      this.binService.createBin(this.binActual).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarBins();
        },
        error: () => (this.mensajeError = 'Error al registrar el contenedor.')
      });
    }
  }

  editarBin(bin: Bin): void {
    this.editandoId = bin._id || null;
    this.binActual = {
      ubicacion: bin.ubicacion,
      nivelLlenado: bin.nivelLlenado,
      estado: bin.estado || 'Activo'
    };
  }

  eliminarBin(id?: string): void {
    if (!id) return;
    this.mensajeError = '';
    this.binService.deleteBin(id).subscribe({
      next: () => this.cargarBins(),
      error: () => (this.mensajeError = 'Error al eliminar el contenedor.')
    });
  }

  limpiarFormulario(): void {
    this.editandoId = null;
    this.binActual = this.nuevoBinVacio();
  }
}