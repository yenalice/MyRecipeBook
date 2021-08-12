import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  faPlusCircle,
  faMinusCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.less'],
})
export class AddPageComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faWindowClose = faWindowClose;

  @ViewChild('errorDialog') errorDialog!: TemplateRef<any>;

  title: string = '';
  summary?: string;
  hours?: string;
  minutes?: string;
  imageUrl?: string;
  ingredients: Ingredient[] = [
    {
      ingredientId: -1,
      name: '',
      amount: -1,
      unit: '',
    },
  ];
  instructions: Instruction[] = [{ instructionId: -1, order: -1, step: '' }];

  // TODO: sanitize text input?
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

  ingredientAmountControl = new FormControl();
  ingredientUnitControl = new FormControl();
  ingredientNameControl = new FormControl();

  instructionsStepControl = new FormControl();

  // TODO: validation for ingredients & instructions
  // don't want to have empty inserts into database

  infoGroup = new FormGroup({
    title: this.titleControl,
    summary: this.summaryControl,
    hours: this.hoursControl,
    minutes: this.minutesControl,
    imageUrl: this.imageUrlControl,
  });

  ingredientsGroup = new FormGroup({
    amount: this.ingredientAmountControl,
    unit: this.ingredientUnitControl,
    name: this.ingredientNameControl,
  });

  instructionsGroup = new FormGroup({ step: this.instructionsStepControl });

  constructor(public dialog: MatDialog, public dataService: DataService) {}

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

  // set ingredient amount for specific element in ingredient array
  onIngredientAmountChange(event: Event, arrIdx: number): void {
    this.ingredients[arrIdx].amount = Number(
      (event.target as HTMLInputElement).value
    );
  }

  // set ingredient unit for specific element in ingredient array
  onIngredientUnitChange(event: Event, arrIdx: number): void {
    this.ingredients[arrIdx].unit = (event.target as HTMLInputElement).value;
  }

  // set ingredient name for specific element in ingredient array
  onIngredientNameChange(event: Event, arrIdx: number): void {
    this.ingredients[arrIdx].name = (event.target as HTMLInputElement).value;
  }

  // remove a given ingredeint
  onRemoveIngredient(arrIdx: number): void {
    this.ingredients.splice(arrIdx, 1);
  }

  // add another ingredient field
  addIngredientField(): void {
    const newIngredient = {
      ingredientId: -1,
      name: '',
      amount: -1,
      unit: '',
    };
    this.ingredients.push(newIngredient);
  }

  // set instruction step
  onInstructionStepChange(event: Event, arrIdx: number): void {
    this.instructions[arrIdx].step = (event.target as HTMLInputElement).value;
    this.instructions[arrIdx].order = arrIdx + 1;
  }

  // add instruction
  addInstructionField(): void {
    this.instructions.push({ instructionId: -1, order: -1, step: '' });
  }

  // remove an instruction
  onRemoveInstruction(arrIdx: number): void {
    this.instructions.splice(arrIdx, 1);
  }

  // create recipe if no errors
  onSubmit(event: Event): void {
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
      const newRecipe: Recipe = {
        recipeId: -1, // QUESTION: temporary because needed in model, is this the best way to handle?
        title: this.title,
        summary: this.summary,
        cookTime: this.formatCookTime(this.hours, this.minutes),
        imageUrl: this.imageUrl,
        ingredients: this.ingredients,
        instructions: this.instructions,
      };
      this.dataService.addRecipe(newRecipe).subscribe();
    }
  }

  // format cook time
  formatCookTime(hours?: string, minutes?: string): number {
    if (!hours && !minutes) return -1;
    return Number(hours) * 60 + Number(minutes);
  }
}
