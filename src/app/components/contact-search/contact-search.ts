import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.html',
  styleUrl: './contact-search.scss',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule]
})
export class ContactSearch {}
