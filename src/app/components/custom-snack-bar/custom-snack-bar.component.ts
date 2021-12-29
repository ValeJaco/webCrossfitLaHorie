import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {
  text: string;
  icon: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.text = data.message;
    this.icon = data.icon;
  }

  ngOnInit(): void {
  }
}
