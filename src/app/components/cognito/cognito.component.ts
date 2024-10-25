import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CognitoService } from '../../services/cognito.service';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  nickname: string;
};

@Component({
  selector: 'app-cognito',
  templateUrl: './cognito.component.html',
  styleUrl: './cognito.component.css',
})
export class CognitoComponent {
  public userForm = new FormGroup({
    userUsername: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  public codeForm = new FormGroup({
    verificationCode: new FormControl('', [Validators.required])
  });
  
  public regexMessage = '';

  public isLogin = true;
  public needConfirmation = false;
  public title: 'Sign in' | 'Register' = 'Register';

  public createUserSubscription: Subscription | undefined;
  public validateUserSubscription: Subscription | undefined;

  constructor(
    private readonly cognitoService: CognitoService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly ngZone: NgZone
  ) {
    this.initializeLogin();
  }

  initializeLogin(): void {
    if (this.location.path() === '/login') {
      this.userForm.patchValue({ userUsername: 'loginDefault' });
      this.isLogin = true;
      this.title = 'Sign in';
    }
  }

  onUsernameChange(value: Event): void {
    this.userForm.patchValue({
      userUsername: JSON.stringify(value),
    });
    if (this.userForm.get('userUsername')?.errors) {
      switch (this.userForm.get('userUsername')!.errors!['pattern']) {
        case 'lenght':
          this.regexMessage = 'El nombre debe tener entre 5 y 20 carácteres!';
          break;
        case 'numbers':
          this.regexMessage = 'No debe haber más de 3 números en el nombre!';
          break;
        case 'spaces':
          this.regexMessage = 'Solo un espacio es permitido!';
          break;
        default:
          this.regexMessage = 'Solo se permiten carácteres alfanuméricos!';
          break;
      }
    } else {
      this.regexMessage = '';
    }
  }

  onEmailChange(value: Event): void {
    this.userForm.patchValue({
      userEmail: JSON.stringify(value),
    });
    if (this.userForm.get('userEmail')?.hasError('required')) {
      this.regexMessage = 'No debes dejar ningún campo vacío!';
      return;
    }
    if (this.userForm.get('userEmail')?.hasError('email')) {
      this.regexMessage = 'Debes escribir un email válido!';
      return;
    }
    this.regexMessage = '';
  }

  onPasswordChange(value: Event): void {
    this.userForm.patchValue({
      userPassword: JSON.stringify(value),
    });
    if (this.userForm.get('userPassword')?.hasError('required')) {
      this.regexMessage = 'No debes dejar ningún campo vacío!';
      return;
    }
    if (this.userForm.get('userPassword')?.hasError('minlength')) {
      this.regexMessage = 'La contraseña debe tener al menos 5 carácteres!';
      return;
    }
    this.regexMessage = '';
  }

  onCodeChange(value: Event): void {
    this.codeForm.patchValue({
      verificationCode: JSON.stringify(value),
    });
  }

  async createUser(): Promise<void> {
    const { userEmail, userPassword, userUsername } = this.userForm.value;
    console.log(this.userForm.value)

    if (userUsername && userEmail && userPassword) {
      /* this.createUserSubscription = this.userService
        .createUser(/* userUsername, userEmail, userPassword )
        .subscribe({
          next: (res: RegisterI) => {
            if (res.userCreated === true) this.validateUser();
          },
          error: (err) => {
            alert('Something Went Wrong! Try again!' + err);
            this.ngZone.run(() => {
              this.router.navigate(['register']);
            });
          },
        });*/
      const user: SignUpParameters = {
        username: userUsername,
        nickname: userUsername,
        email: userEmail,
        password: userPassword,
      };

      const nextStep: any = await this.cognitoService.handleSignUp(user);
      
      if (nextStep?.signUpStep === 'CONFIRM_SIGN_UP') this.needConfirmation = true;
    }
  }

  async assignUserValues(isSignedIn: boolean) {
      if(isSignedIn) {
        const token = await this.cognitoService.currentSession();
        const {username, userId} = await this.cognitoService.currentAuthenticatedUser();
        this.router.navigate(['create-game']);
      } 
  }

  async confirmCreatedUser(): Promise<void> {
    const { userUsername } = this.userForm.value;
    const { verificationCode } = this.codeForm.value;
    const confirmation = {
        username: userUsername ?? '',
        confirmationCode: verificationCode ?? '',
    };
    const nextStep: any = await this.cognitoService.handleSignUpConfirmation(confirmation);

    if(nextStep?.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      const isSignedIn: any = await this.cognitoService.handleAutoSignIn();

      this.assignUserValues(isSignedIn);
    }
  }
  

  async validateUser(): Promise<void> {
    const { userEmail, userPassword } = this.userForm.value;

    if (userEmail && userPassword) {
      const user = {
        username: userEmail,
        password: userPassword
      }
      const isSignedIn: any = await this.cognitoService.handleSignIn(user)
      
      this.assignUserValues(isSignedIn);
      /* this.validateUserSubscription = this.userService
        .validateUser(/* userEmail, userPassword)
        .subscribe({
          next: (res: UserResponseI) => {
            const token = res.token;
            sessionStorage.setItem('session_token', token);

            const user = res.user;

            this.userService.setUserId(user._id);
            sessionStorage.setItem('user_id', user._id);

            this.userService.setUsername(user.username);
            sessionStorage.setItem('user_username', user.username);

            this.ngZone.run(() => {
              this.router.navigate(['create-classroom']);
            });
          },
          error: () => {
            alert('Wrong User!, try Again!');
            this.ngZone.run(() => {
              this.router.navigate(['login']);
            });
          },
        });*/
        
    }
  }

  ngOnDestroy(): void {
    if (this.createUserSubscription) {
      this.createUserSubscription.unsubscribe();
    }
    if (this.validateUserSubscription) {
      this.validateUserSubscription.unsubscribe();
    }
  }
}
