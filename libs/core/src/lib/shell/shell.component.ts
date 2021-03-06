import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../../../auth/src/lib/shared/authentication.service";
import { I18nService } from "../i18n.service";

@Component({
    selector: "dpio-application-shell",
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.scss"],
})
export class ShellComponent implements OnInit {
    constructor(
        private router: Router,
        private titleService: Title,
        private authenticationService: AuthenticationService,
        private i18nService: I18nService,
    ) {}

    ngOnInit() {}

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    logout() {
        this.authenticationService
            .logout()
            .subscribe(() => this.router.navigate(["/user/login"], { replaceUrl: true }));
    }

    get username(): string {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

    get isMobile(): boolean {
        return true;
    }

    get title(): string {
        return this.titleService.getTitle();
    }
}
