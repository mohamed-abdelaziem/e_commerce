import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(arr : any): any {
    return arr.slice(-1,2);
  }

}
