import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RedefinirSenhaComponent {
    public router: Router;
    public form:FormGroup;
    public password:AbstractControl;
    public confirmPassword:AbstractControl;
    
    constructor(router:Router, fb:FormBuilder){
        this.router = router;
        this.form = fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },{validator: matchingPasswords('password', 'confirmPassword')});

        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
    }

     public onSubmit(values:Object):void {
        if (this.form.valid) {
            this.router.navigate(['/login-consumidor']);
        }
    }

    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
