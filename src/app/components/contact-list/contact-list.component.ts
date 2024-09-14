import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    NgIf, 
    NgForOf, 
    FormsModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule, 
    MatDividerModule, 
    MatSelectModule, 
    MatToolbarModule
  ]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchQuery: string = '';
  searchType: string = 'name';
  currentPage: number = 1;
  isFiltered: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  onAddContact(): void {
    this.router.navigate(['/contacts/new']); 
  }

  loadContacts(page: number = 1): void {
    if (this.isFiltered && this.searchQuery) {
      this.searchContacts(page);
    } else {
      this.contactService.getContacts(page).subscribe((data: any) => {
        this.contacts = data.data;
        this.currentPage = data.current_page;
      });
    }
  }

  searchContacts(page: number = 1): void {
    this.isFiltered = true;
    switch (this.searchType) {
      case 'name':
        this.contactService.searchContactsByName(this.searchQuery).subscribe((data: Contact[]) => {
          this.contacts = data;
          this.currentPage = page;
        });
        break;
      case 'company':
        this.contactService.searchContactsByCompany(this.searchQuery).subscribe((data: Contact[]) => {
          this.contacts = data;
          this.currentPage = page;
        });
        break;
      case 'city':
        this.contactService.searchContactsByCity(this.searchQuery).subscribe((data: Contact[]) => {
          this.contacts = data;
          this.currentPage = page;
        });
        break;
      default:
        this.loadContacts(page);
        break;
    }
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.searchContacts();
    } else {
      this.isFiltered = false;
      this.loadContacts();
    }
  }

  onDelete(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts(this.currentPage);
    });
  }

  onEdit(id: number): void {
    this.router.navigate([`/contacts/edit/${id}`]);
  }

  nextPage(): void {
    this.loadContacts(this.currentPage + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadContacts(this.currentPage - 1);
    }
  }
  onView(contactId: number) {
    console.log('Ver contacto con ID:', contactId);
    this.router.navigate([`/contact/${contactId}`]);
  }
  
}
