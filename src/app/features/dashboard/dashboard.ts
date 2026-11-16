
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface AttendanceSite {
//   siteName: string;
//   totalWorkers: number;
//   live: number;
//   absent: number;
//   weekOff: number;
//   leave: number;
//   totalPresent: number;
// }

// interface SummaryCard {
//   title: string;
//   total: number;
//   percentage: string;
//   color: string;
//   type: string;
// }

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.scss'
// })
// export class Dashboard {

//   userName = 'newadmin@oss.com';
//   userRoles = 'Staff, Administrator';

//   searchSite = '';

//   todaySummary: SummaryCard[] = [
//     { title: 'Total Workers', total: 631, percentage: '100%', color: 'blue', type: 'total' },
//     { title: 'Absent Workers', total: 628, percentage: '100%', color: 'red', type: 'absent' },
//     { title: 'Present Workers', total: 0, percentage: '0%', color: 'green', type: 'present' },
//     { title: 'Live Workers', total: 3, percentage: '0%', color: 'orange', type: 'live' }
//   ];

//   yesterdaySummary: SummaryCard[] = [
//     { title: 'Total Workers', total: 631, percentage: '100%', color: 'blue', type: 'total' },
//     { title: 'Absent Workers', total: 630, percentage: '100%', color: 'red', type: 'absent' },
//     { title: 'Present Workers', total: 0, percentage: '0%', color: 'green', type: 'present' },
//     { title: 'Live Workers', total: 1, percentage: '0%', color: 'orange', type: 'live' }
//   ];

//   sites: AttendanceSite[] = [
//     {
//       siteName: 'Hadaspar Handewadi',
//       totalWorkers: 132,
//       live: 0,
//       absent: 132,
//       weekOff: 0,
//       leave: 0,
//       totalPresent: 0
//     },
//     {
//       siteName: 'Jaywant Banglo',
//       totalWorkers: 13,
//       live: 0,
//       absent: 13,
//       weekOff: 0,
//       leave: 0,
//       totalPresent: 0
//     },
//     {
//       siteName: 'JAYWANT PLOTTING',
//       totalWorkers: 2,
//       live: 0,
//       absent: 2,
//       weekOff: 0,
//       leave: 0,
//       totalPresent: 0
//     },
//     {
//       siteName: 'Joy Ville',
//       totalWorkers: 7,
//       live: 0,
//       absent: 7,
//       weekOff: 0,
//       leave: 0,
//       totalPresent: 0
//     }
//   ];

//   get filteredSites(): AttendanceSite[] {
//     const search = this.searchSite.trim().toLowerCase();

//     if (!search) {
//       return this.sites;
//     }

//     return this.sites.filter(site =>
//       site.siteName.toLowerCase().includes(search)
//     );
//   }

//   downloadReport(): void {
//     const headers = [
//       'Site',
//       'Total Workers',
//       'Live',
//       'Absent',
//       'Week Off',
//       'Leave',
//       'Total Present'
//     ];

//     const rows = this.filteredSites.map(site => [
//       site.siteName,
//       site.totalWorkers,
//       site.live,
//       site.absent,
//       site.weekOff,
//       site.leave,
//       site.totalPresent
//     ]);

//     const csv = [
//       headers.join(','),
//       ...rows.map(row => row.join(','))
//     ].join('\n');

//     const blob = new Blob([csv], {
//       type: 'text/csv;charset=utf-8;'
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');

//     link.href = url;
//     link.download = 'worker-attendance-report.csv';
//     link.click();

//     URL.revokeObjectURL(url);
//   }

// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AttendanceSummary {
  total: number;
  absent: number;
  present: number;
  live: number;
  totalPercent: number;
  absentPercent: number;
  presentPercent: number;
  livePercent: number;
  totalTrend: number[];
  absentTrend: number[];
  presentTrend: number[];
  liveTrend: number[];
}

interface SiteAttendance {
  siteName: string;
  totalWorkers: number;
  liveWorkers: number;
  absentWorkers: number;
  weekOffWorkers: number;
  leaveWorkers: number;
  presentWorkers: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  searchText = '';

  today: AttendanceSummary = {
    total: 631,
    absent: 628,
    present: 3,
    live: 3,
    totalPercent: 100,
    absentPercent: 99,
    presentPercent: 1,
    livePercent: 1,
    totalTrend: [580, 590, 600, 610, 620, 625, 631],
    absentTrend: [570, 580, 590, 600, 610, 620, 628],
    presentTrend: [10, 10, 10, 10, 10, 5, 3],
    liveTrend: [2, 3, 2, 4, 3, 2, 3]
  };

  yesterday: AttendanceSummary = {
    total: 631,
    absent: 630,
    present: 1,
    live: 1,
    totalPercent: 100,
    absentPercent: 100,
    presentPercent: 0,
    livePercent: 0,
    totalTrend: [],
    absentTrend: [],
    presentTrend: [],
    liveTrend: []
  };

  sites: SiteAttendance[] = [
    {
      siteName: 'Hadaspar Handewadi',
      totalWorkers: 120,
      liveWorkers: 5,
      absentWorkers: 110,
      weekOffWorkers: 3,
      leaveWorkers: 2,
      presentWorkers: 5
    },
    {
      siteName: 'Jaywant Banglo',
      totalWorkers: 85,
      liveWorkers: 3,
      absentWorkers: 78,
      weekOffWorkers: 2,
      leaveWorkers: 1,
      presentWorkers: 4
    },
    {
      siteName: 'JAYWANT PLOTTING',
      totalWorkers: 150,
      liveWorkers: 0,
      absentWorkers: 145,
      weekOffWorkers: 3,
      leaveWorkers: 2,
      presentWorkers: 0
    },
    {
      siteName: 'Joy Ville',
      totalWorkers: 95,
      liveWorkers: 4,
      absentWorkers: 88,
      weekOffWorkers: 1,
      leaveWorkers: 2,
      presentWorkers: 4
    }
  ];

  get filteredSites(): SiteAttendance[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.sites;
    }

    return this.sites.filter(site =>
      site.siteName.toLowerCase().includes(search)
    );
  }

  getSiteStatus(site: SiteAttendance): string {
    if (site.presentWorkers === 0) {
      return site.liveWorkers !== 0 ? 'success' : 'danger';
    }

    return 'primary';
  }

  chartPoints(values: number[]): string {
  if (!values.length) {
    return '';
  }

  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 300;
      const y = 55 - ((value - min) / range) * 45;
      return `${x},${y}`;
    })
    .join(' ');
}

  downloadReport(): void {
    const headers = [
      'Sites',
      'Total Workers',
      'Live',
      'Absent',
      'Week Off',
      'Leave',
      'Total Present'
    ];

    const rows = this.filteredSites.map(site => [
      site.siteName,
      site.totalWorkers,
      site.liveWorkers,
      site.absentWorkers,
      site.weekOffWorkers,
      site.leaveWorkers,
      site.presentWorkers
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'Worker-Attendance-Report.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}
