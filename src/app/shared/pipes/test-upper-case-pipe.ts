import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testUpperCase'
})
export class TestUpperCasePipe implements PipeTransform {

  transform(value : string): unknown {
    return value.toUpperCase();
  }

}
