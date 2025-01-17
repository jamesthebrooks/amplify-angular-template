import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    data: { title: 'Home' }
  },
  {
    path: 'units-converter',
    loadChildren: () => import('./pages/units-converter/units-converter.module').then(m => m.UnitsConverterPageModule),
    data: {
      title: 'Units Conversion'
    }
  },
  {
    path: 'radius-limit',
    loadChildren: () => import('./pages/radius-limit/radius-limit.module').then(m => m.RadiusLimitPageModule),
    data: {
      title: 'Bandsaw Radius'
    }
  },
  {
    path: 'board-foot-calculator',
    loadChildren: () => import('./pages/board-foot-calculator/board-foot-calculator.module').then(m => m.BoardFootCalculatorPageModule),
    data: {
      title: 'Board Foot Calculator'
    }
  },
  {
    path: 'drill-bit-calculator',
    loadChildren: () => import('./pages/drill-bit-calculator/drill-bit-calculator.module').then(m => m.DrillBitCalculatorPageModule),
    data: {
      title: 'Drill Tap Size'
    }
  },
  {
    path: 'user-preferences',
    loadChildren: () => import('./pages/user-preferences/user-preferences.module').then(m => m.UserPreferencesPageModule),
    data: {
      title: 'My Preferences'
    }
  },
  {
    path: 'triangle-calculator',
    loadChildren: () => import('./pages/triangle-calculator/triangle-calculator.module').then(m => m.TriangleCalculatorPageModule),
    data: {
      title: 'Triangle Calculator'
    }
  },
  {
    path: 'fractional-inch-calculator',
    loadChildren: () => import('./pages/fractional-inch-calculator/fractional-inch-calculator.module').then(m => m.FractionalInchCalculatorPageModule),
    data: {
      title: 'Fractional inch Calculator'
    }
  },
  {
    path: 'finish-coverage-calculator',
    loadChildren: () => import('./pages/finish-coverage-calculator/finish-coverage-calculator.module').then( m => m.FinishCoverageCalculatorPageModule),
    data: {
      title: 'Finish Coverage Calculator'
    }
  },  {
    path: 'legal',
    loadChildren: () => import('./pages/legal/legal.module').then( m => m.LegalPageModule)
  }



];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
