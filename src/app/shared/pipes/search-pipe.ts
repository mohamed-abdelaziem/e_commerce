import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/interfaces/types.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfProduct : Product[] , word : string): Product[] {


    const foundProduct = arrayOfProduct.filter(function(item){

      return item.title.toLowerCase().includes(word.toLowerCase());

    });

    return foundProduct;



  }

}
