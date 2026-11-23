import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin } from '../model/bin.model';

@Injectable({
  providedIn: 'root'
})
export class BinService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://ecosmartbin-nine.vercel.app/api/bins';

  getBins(): Observable<Bin[]> {
    return this.http.get<Bin[]>(this.apiUrl);
  }

  createBin(bin: Bin): Observable<Bin> {
    return this.http.post<Bin>(this.apiUrl, bin);
  }

  updateBin(id: string, bin: Bin): Observable<Bin> {
    return this.http.put<Bin>(`${this.apiUrl}/${id}`, bin);
  }

  deleteBin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}