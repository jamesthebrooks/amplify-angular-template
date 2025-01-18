import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MenuController, Platform} from "@ionic/angular";
import {UserService} from "./services/user/user.service";
import {TitleService} from "./services/title/title.service";
import {ThemeService} from "./services/theme/theme.service";
import {TranslationsService} from "./core/services/translations-service/translations.service";
import {environment} from "../environments/environment";
import { register as registerSwiper} from 'swiper/element/bundle';
import {AuthenticatorService} from "@aws-amplify/ui-angular";
import {Amplify} from "aws-amplify";
import {ResourcesConfig} from "@aws-amplify/core";
import {AmplifyOutputs} from "@aws-amplify/core/dist/esm/libraryUtils";
import {Subscription} from "rxjs";

registerSwiper();

let outputs: ResourcesConfig | AmplifyOutputs;
outputs = require("../../amplify_outputs.json");


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {

  private userSubscription?: Subscription;
  public user: any = null;

  appName = environment.appName;

  constructor(
    private translationsService: TranslationsService,
    private platform: Platform,
    private userService: UserService, // Inject the UserService
    private titleService: TitleService,
    private themeService: ThemeService,
    private menuCtrl: MenuController,
    private renderer: Renderer2
  ) {
    this.initializeApp();
    Amplify.configure(outputs, {ssr: true});
    this.titleService.init();
    // this.adjustLandscapeLayout();

    // Listen for resize and orientation changes
    // this.renderer.listen(window, 'resize', () => this.adjustLandscapeLayout());
    // this.renderer.listen(window, 'orientationchange', () => this.adjustLandscapeLayout());
  }

  ngOnInit() {
    // Check user's saved preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (isDark: boolean) =>
      this.themeService.toggleDarkMode(isDark);
    // Apply theme on load
    applyTheme(prefersDark.matches);
    // Listen for changes
    prefersDark.addEventListener('change', event => applyTheme(event.matches));

    this.userService.loadUser().then(); // Ensure user is loaded on app start

    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translationsService.init();
      this.setMobileStarterAssets().then();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async setMobileStarterAssets() {
  }

  closeMenu() {
    this.menuCtrl.close().then(); // Closes the active menu
  }

  adjustLandscapeLayout(): void {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;

    if (isLandscape) {
      const body = document.body;

      // Set rotated dimensions
      this.renderer.setStyle(body, 'width', `${window.innerWidth}px`);
      this.renderer.setStyle(body, 'height', `${window.innerHeight}px`);
      this.renderer.setStyle(body, 'transform', 'rotate(90deg)');
      this.renderer.setStyle(body, 'transform-origin', 'top left');
      this.renderer.setStyle(body, 'top', '0');
      this.renderer.setStyle(body, 'left', '100%');
    } else {
      // Reset for portrait mode
      const body = document.body;
      this.renderer.removeStyle(body, 'width');
      this.renderer.removeStyle(body, 'height');
      this.renderer.removeStyle(body, 'transform');
      this.renderer.removeStyle(body, 'transform-origin');
      this.renderer.removeStyle(body, 'position');
      this.renderer.removeStyle(body, 'top');
      this.renderer.removeStyle(body, 'left');
    }
  }

  setUser(user: any) {
    this.userService.setUser(user);
  }

  logout(signOutFn: Function) {
    signOutFn(); // Use built-in signOut function from Amplify UI
    this.userService.clearUser();
  }

}
