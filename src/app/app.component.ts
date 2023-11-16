import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alpha-century';
  dataList: any;
  news: any;
  isMobile?: boolean;
  showDropdown: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update isMobile property on window resize
    this.checkIfMobile();
  }

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.checkIfMobile();
    this.httpClient.get('https://api.spaceflightnewsapi.net/v4/reports/').subscribe((res: any) => {
      this.dataList = res;
      console.log(this.dataList, this.dataList.results);
    })
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
