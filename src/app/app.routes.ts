import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { RemoteComponent } from './pages/remote/remote.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { VerificationSuccessfulComponent } from './pages/auth/verification-successful/verification-successful.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { SetPasswordComponent } from './pages/auth/set-password/set-password.component';
import { ResetPasswordSuccessComponent } from './pages/auth/reset-password-success/reset-password-success.component';
import { authGuard, loginGuard } from './service/auth.guard';
import { JobComponent } from './pages/job_dashBoard/job_dashBoard.component';
import { CreateJobComponent } from './pages/job_dashBoard/create-job/create-job.component';
import { BulkJobLogsComponent } from './pages/job_dashBoard/bulk-job-logs/bulk-job-logs.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [loginGuard],

        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },

            {
                path: 'verify-email',
                component: VerifyEmailComponent
            },

            {
                path: 'verification-successful',
                component: VerificationSuccessfulComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'set-password',
                component: SetPasswordComponent
            },
            {
                path: 'new-password',
                component: ResetPasswordSuccessComponent
            },
        ]
    },
    {
        path: '',
        component: RemoteComponent,
        canActivate: [authGuard],

        children: [

            {
                path: 'enterprise/jobs',
                component: JobComponent,
            },
            {
                path: 'enterprise/candidates',
                component: CandidatesComponent
            },
            {
                path: 'enterprise/postJob',
                component: CreateJobComponent
            },
            {
                path: 'enterprise/JobLogs',
                component: BulkJobLogsComponent
            }
        ],
    },
    {
        path: ':type',
        component: TermConditionComponent

    },
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
    { path: '**', pathMatch: 'full', redirectTo: 'auth/login' },
];
