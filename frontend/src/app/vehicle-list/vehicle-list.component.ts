import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  showForm = false;
  editingVehicle: Vehicle | null = null;
  formData: Partial<Vehicle> = {};

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (error) => {
        console.error('Erro ao carregar veículos:', error);
        alert('Erro ao carregar veículos');
      }
    });
  }

  showCreateForm() {
    this.showForm = true;
    this.editingVehicle = null;
    this.formData = {};
  }

  showEditForm(vehicle: Vehicle) {
    this.showForm = true;
    this.editingVehicle = vehicle;
    this.formData = { ...vehicle };
  }

  hideForm() {
    this.showForm = false;
    this.editingVehicle = null;
    this.formData = {};
  }

  saveVehicle() {
    if (this.editingVehicle) {
      this.updateVehicle();
    } else {
      this.createVehicle();
    }
  }

  createVehicle() {
    const vehicleData = { ...this.formData } as Vehicle;
    this.vehicleService.create(vehicleData).subscribe({
      next: () => {
        this.loadVehicles();
        this.hideForm();
        alert('Veículo criado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao criar veículo:', error);
        alert('Erro ao criar veículo: ' + (error.error?.message || error.message));
      }
    });
  }

  updateVehicle() {
    if (!this.editingVehicle || !this.editingVehicle.id) return;
    
    this.vehicleService.update(this.editingVehicle.id, this.formData as Vehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.hideForm();
        alert('Veículo atualizado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao atualizar veículo:', error);
        alert('Erro ao atualizar veículo: ' + (error.error?.message || error.message));
      }
    });
  }

  deleteVehicle(id: number) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.delete(id).subscribe({
        next: () => {
          this.loadVehicles();
          alert('Veículo excluído com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir veículo:', error);
          alert('Erro ao excluir veículo: ' + (error.error?.message || error.message));
        }
      });
    }
  }
}
