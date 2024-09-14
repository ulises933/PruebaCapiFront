import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    DatePipe
  ]
})
export class ContactDetailsComponent implements OnInit {
  contact: any;

  constructor(private route: ActivatedRoute, private contactService: ContactService,    private router: Router  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    this.getContactDetails(contactId);
  }

  getContactDetails(id: string | null): void {
    if (id) {
      this.contactService.getContactById(id).subscribe((contact: any) => {
        this.contact = contact;
      });
    }
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
