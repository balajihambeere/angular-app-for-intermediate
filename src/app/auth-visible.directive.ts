import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({ selector: '[appIsAuthenticated]' })

export class AuthVisibleDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private viewContainer: ViewContainerRef
    ) { }

    condition: boolean;

    ngOnInit() {
        this.authService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                this.viewContainer.clear();
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }
    @Input('appIsAuthenticated') set showIfAuthenticated(condition: boolean) {
        this.condition = condition;
    }
}
