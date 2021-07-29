import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.less'],
})
export class AddPageComponent implements OnInit {
  faWindowClose = faWindowClose;
  @ViewChild('errorDialog') errorDialog!: TemplateRef<any>;
  title: string = '';
  summary?: string;
  hours?: string;
  minutes?: string;
  imageUrl?: string;

  titleControl = new FormControl(this.title, [
    Validators.required,
    Validators.maxLength(150),
  ]);

  summaryControl = new FormControl('', Validators.maxLength(350));

  hoursControl = new FormControl(0, Validators.pattern('^(0|[1-9][0-9]*)$'));

  minutesControl = new FormControl(0, Validators.pattern('^(0|[1-9][0-9]*)$'));

  // TODO: validate url
  imageUrlControl = new FormControl();
  /*
    '',
    Validators.pattern(
      '(http|ftp|https)://[w-]+(.[w-]+)+([w.,@?^=%&amp;:/~+#-]*[w@?^=%&amp;/~+#-])?'
    )
    */

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  // set title
  onTitleChange(event: Event): void {
    this.title = (event.target as HTMLInputElement).value;
  }

  // set summary
  onSummaryChange(event: Event): void {
    this.summary = (event.target as HTMLInputElement).value;
  }

  // set hours
  onHoursChange(event: Event): void {
    this.hours = (event.target as HTMLInputElement).value;
  }

  // set minutes
  onMinutesChange(event: Event): void {
    this.minutes = (event.target as HTMLInputElement).value;
  }

  // set image url
  onImageUrlChange(event: Event): void {
    this.imageUrl = (event.target as HTMLInputElement).value;
  }

  // create recipe
  onSubmit(event: Event): void {
    // check for errors
    const hasError: boolean =
      this.titleControl.errors != null ||
      this.summaryControl.errors != null ||
      this.hoursControl.errors != null ||
      this.minutesControl.errors != null ||
      this.imageUrlControl.errors != null;

    if (hasError) {
      const dialogRef = this.dialog.open(this.errorDialog, {
        width: '250px',
      });
    } else {
      console.log('no errors');
    }
  }
}
