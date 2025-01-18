import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsOfUseComponent } from "./terms-of-use/terms-of-use.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { UkPrivacyPolicyComponent } from "./uk-privacy-policy/uk-privacy-policy.component";
import { CookiePolicyComponent } from "./cookie-policy/cookie-policy.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-term-condition',
  imports: [TermsOfUseComponent, PrivacyPolicyComponent, UkPrivacyPolicyComponent, CookiePolicyComponent,CommonModule],
  templateUrl: './term-condition.component.html',
  styleUrl: './term-condition.component.scss'
})
export class TermConditionComponent {
  currentType: string | null = null;
 
  constructor(private router: Router, private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type');
      if (this.isValidType(type)) {
        this.currentType = type;
      } else {
        this.navigateTo('terms-of-use'); // Redirect to default
      }
    });
  }
 
  isValidType(type: string | null): boolean {
    const validTypes = ['terms-of-use', 'privacypolicy', 'ukprivacypolicy', 'cookiepolicy'];
    return type ? validTypes.includes(type) : false;
  }
 
  navigateTo(type: string): void {
    this.router.navigate([`/${type}`]);
  }


}
