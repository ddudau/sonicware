import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Message } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  form: FormGroup;
  message: Message;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phoneNumber: [null, Validators.required],
      terms: [null, Validators.required],
      message: [null, Validators.required]
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token: string) => {
          console.debug(`Token [${token}] generated`);
          let messageToSend = new Message();
          messageToSend.firstName = this.form.value.firstName;
          messageToSend.lastName = this.form.value.lastName;
          messageToSend.email = this.form.value.email;
          messageToSend.phoneNumber = this.form.value.phoneNumber;
          messageToSend.message = this.form.value.message;
          this.messagesService.createMessage(messageToSend).pipe(takeUntil(this.destroy$)).subscribe(message => {
            console.log(message);
          });
        });
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.form.get(field)?.valid && (this.form.get(field)?.touched || this.form.get(field)?.dirty);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
