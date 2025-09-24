import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brands } from '../interfaces/types.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
private http = inject(HttpClient);



getAllBrand():Observable<Brands>{
return this.http.get<Brands>(`${environment.baseUrl}/brands`);
}


}
