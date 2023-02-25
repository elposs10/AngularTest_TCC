import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.id.toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }*/

  transform(value: any, args?: any): any {
    if (!value) return null;
    if(!args) return value;

    args = args.toLocaleLowerCase();

    return value.filter((item: any) => {
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    })
  }

}